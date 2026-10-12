from netbox.api.viewsets import BaseViewSet, NetBoxModelViewSet

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db.utils import DataError, IntegrityError
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.api.serializers import (
    RoleImageSerializer,
    TopologyDummySerializer,
    CoordinateGroupSerializer,
    CoordinateSerializer,
    CircuitCoordinateSerializer,
    PowerPanelCoordinateSerializer,
    PowerFeedCoordinateSerializer,
)
from netbox_topology_views.models import RoleImage, CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate
from netbox_topology_views.views import get_topology_data
from netbox_topology_views.utils import get_image_from_url, export_data_to_xml, get_query_settings, is_allowed_image
from netbox_topology_views.filters import DeviceFilterSet

NODE_TYPES = {
    "c": (Circuit, CircuitCoordinate),
    "p": (PowerPanel, PowerPanelCoordinate),
    "f": (PowerFeed, PowerFeedCoordinate),
    "": (Device, Coordinate),
}

class SaveCoordsViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # TokenPermissions derives the required permission (change_coordinate for PATCH) from this model
    queryset = Coordinate.objects.none()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            return Response({"status": "not allowed to save coords"}, status=403)

        node_id = str(request.data.get("node_id", ""))
        prefix, pk = ("", node_id) if node_id.isdigit() else (node_id[:1], node_id[1:])
        if prefix not in NODE_TYPES or not pk.isdigit():
            return Response({"status": "invalid node_id in body"}, status=400)

        model, coordinate_model = NODE_TYPES[prefix]
        node = model.objects.restrict(request.user, "view").filter(pk=pk).first()
        if node is None:
            return Response({"status": "invalid node_id in body"}, status=400)

        group_id = request.data.get("group")
        if group_id in (None, "default"):
            group = CoordinateGroup.get_default()
        else:
            group = CoordinateGroup.objects.filter(pk=group_id).first() if str(group_id).isdigit() else None
            if group is None:
                return Response({"status": "invalid group in body"}, status=400)

        try:
            coordinate_model.objects.update_or_create(
                group=group,
                device=node,
                defaults={"x": request.data.get("x"), "y": request.data.get("y")},
            )
        except (IntegrityError, DataError, ValueError, TypeError):
            # Expected failure modes for bad/malformed coordinate data: an
            # out-of-range or non-numeric x/y, or a missing value.
            return Response(
                {"status": "Coordinates could not be saved."}, status=400
            )

        return Response({"status": "saved coords"})

class ExportTopoToXML(BaseViewSet, ViewSet):
    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    def list(self, request):
        if not request.GET:
            return JsonResponse(
                {"status": "Missing or malformed request parameters"}, status=400
            )

        queryset = DeviceFilterSet(
            request.GET,
            Device.objects.restrict(request.user, 'view').select_related("device_type", "role"),
            request=request,
        ).qs
        topo_data = get_topology_data(queryset, request.user, get_query_settings(request))
        xml_data = export_data_to_xml(topo_data).decode('utf-8').replace('\n', '&#xa;')

        return HttpResponse(xml_data, content_type="application/xml; charset=utf-8")

class SaveRoleImageViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # TokenPermissions requires dcim.add_devicerole for POST; change is checked below
    queryset = DeviceRole.objects.none()
    serializer_class = RoleImageSerializer

    @action(detail=False, methods=["post"])
    def save(self, request):
        if not request.user.has_perm("dcim.change_devicerole"):
            return JsonResponse({"status": "Permission denied"}, status=403)

        if not isinstance(request.data, dict):
            return JsonResponse(
                {"status": "Missing or malformed request body"}, status=400
            )

        images = {k: get_image_from_url(v) for k, v in request.data.items() if isinstance(v, str)}
        if len(images) != len(request.data) or not all(map(is_allowed_image, images.values())):
            return JsonResponse({"status": "Invalid image path"}, status=400)

        device_roles = {k: v for k, v in images.items() if k.isnumeric()}
        content_type_ids = {
            k[2:]: v
            for k, v in images.items()
            if k.startswith("ct") and k[2:].isnumeric()
        }

        roles = DeviceRole.objects.in_bulk(device_roles.keys())
        content_types = ContentType.objects.in_bulk(
            content_type_ids.keys()
        )

        if len(roles) != len(device_roles):
            difference = set(device_roles) - set(roles.keys())
            return JsonResponse(
                {"status": f"Got unknown device role ids: {difference}"},
                status=400,
            )

        if len(content_types) != len(content_type_ids):
            difference = set(content_type_ids) - set(content_types.keys())
            return JsonResponse(
                {"status": f"Got unknown content type ids: {difference}"},
                status=400,
            )

        if device_roles:
            device_role_ct = ContentType.objects.get_for_model(DeviceRole)

            for id, url in device_roles.items():
                RoleImage.objects.update_or_create(
                    {
                        "content_type_id": device_role_ct.pk,
                        "object_id": id,
                        "image": str(get_image_from_url(url)),
                    },
                    object_id=id,
                )

        for content_type_id, url in content_type_ids.items():
            RoleImage.objects.update_or_create(
                {
                    "content_type_id": content_type_id,
                    "image": str(get_image_from_url(url)),
                },
                content_type_id=content_type_id,
            )

        return JsonResponse({"status": "Ok"})

class CoordinateGroupViewSet(NetBoxModelViewSet):
    queryset = CoordinateGroup.objects.all()
    serializer_class = CoordinateGroupSerializer

class CoordinateViewSet(NetBoxModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer

class CircuitCoordinateViewSet(NetBoxModelViewSet):
    queryset = CircuitCoordinate.objects.all()
    serializer_class = CircuitCoordinateSerializer

class PowerPanelCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerPanelCoordinate.objects.all()
    serializer_class = PowerPanelCoordinateSerializer

class PowerFeedCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerFeedCoordinate.objects.all()
    serializer_class = PowerFeedCoordinateSerializer
