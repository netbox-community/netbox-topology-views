from typing import Dict

from netbox.api.authentication import IsAuthenticatedOrLoginNotRequired
from netbox.api.viewsets import BaseViewSet, NetBoxModelViewSet

from dcim.models import Device, DeviceRole
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from django.db.utils import DataError, IntegrityError
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
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
from netbox_topology_views.models import RoleImage, CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate, NODE_TYPES
from netbox_topology_views.views import ADDITIONAL_ROLES, get_topology_data
from netbox_topology_views.utils import get_image_from_url, export_data_to_xml, get_query_settings, is_allowed_image
from netbox_topology_views.filters import (
    DeviceFilterSet,
    CoordinateGroupFilterSet,
    CoordinatesFilterSet,
    CircuitCoordinatesFilterSet,
    PowerPanelCoordinatesFilterSet,
    PowerFeedCoordinatesFilterSet,
)
from users.models import Token

class SaveCoordsViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # The coordinate model depends on the node type, so add/change permissions are checked in save_coords()
    queryset = Coordinate.objects.none()
    serializer_class = TopologyDummySerializer
    permission_classes = [IsAuthenticatedOrLoginNotRequired]

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            return Response({"status": "not allowed to save coords"}, status=403)

        if isinstance(request.auth, Token) and not request.auth.write_enabled:
            raise PermissionDenied("This token does not permit write operations.")
        if not request.user.is_authenticated:
            raise PermissionDenied()

        node_id = str(request.data.get("node_id", ""))
        x_coord = request.data.get("x", None)
        y_coord = request.data.get("y", None)
        group_id = request.data.get("group", None)

        prefix, pk = ("", node_id) if node_id.isdigit() else (node_id[:1], node_id[1:])
        if prefix not in NODE_TYPES or not pk.isdigit():
            return Response({"status": "invalid node_id in body"}, status=400)

        node_model, model_class = NODE_TYPES[prefix]
        actual_device = node_model.objects.restrict(request.user, "view").filter(pk=pk).first()
        if actual_device is None:
            return Response({"status": "invalid node_id in body"}, status=400)

        if group_id is None or group_id == "default":
            group = CoordinateGroup.get_default()
        elif str(group_id).isdigit():
            group = CoordinateGroup.objects.restrict(request.user, "view").filter(pk=group_id).first()
        else:
            group = None
        if group is None:
            return Response({"status": "invalid group in body"}, status=400)

        try:
            with transaction.atomic():
                coords = model_class.objects.filter(group=group, device=actual_device).first()
                permitted = model_class.objects.restrict(request.user, "change" if coords else "add")
                if coords is None:
                    coords = model_class(group=group, device=actual_device)
                elif not permitted.filter(pk=coords.pk).exists():
                    raise PermissionDenied()
                else:
                    coords.snapshot()
                coords.x = x_coord
                coords.y = y_coord
                coords.save()
                if not permitted.filter(pk=coords.pk).exists():
                    raise PermissionDenied()
        except (IntegrityError, DataError, ValueError, TypeError):
            # Expected failure modes for bad/malformed coordinate data: a
            # unique_together violation, an out-of-range or non-numeric x/y,
            # or a missing/invalid value coercing to the IntegerField. Anything
            # else is an unexpected bug and should propagate rather than be
            # reported back as a generic save failure.
            return Response(
                {"status": "Coordinates could not be saved."}, status=400
            )

        return Response({"status": "saved coords"})

class ExportTopoToXML(BaseViewSet, ViewSet):
    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    def list(self, request):

        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.restrict(request.user, 'view').select_related(
            "device_type", "role"
        )
        self.queryset = self.filterset(request.GET, self.queryset, request=request).qs

        if request.GET:
            topo_data = get_topology_data(self.queryset, request.user, **get_query_settings(request))
            xml_data = export_data_to_xml(topo_data).decode('utf-8').replace('\n', '&#xa;')

            return HttpResponse(xml_data, content_type="application/xml; charset=utf-8")
        else:
            return JsonResponse(
                {"status": "Missing or malformed request parameters"}, status=400
            )

class SaveRoleImageViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # TokenPermissions requires dcim.add_devicerole for POST; change is checked in save()
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

        roles: Dict[int, DeviceRole] = DeviceRole.objects.restrict(request.user, 'change').in_bulk(device_roles.keys())
        allowed_content_type_ids = [ct.pk for ct in ContentType.objects.get_for_models(*ADDITIONAL_ROLES).values()]
        content_types: Dict[int, ContentType] = ContentType.objects.filter(pk__in=allowed_content_type_ids).in_bulk(
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
    filterset_class = CoordinateGroupFilterSet

class CoordinateViewSet(NetBoxModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer
    filterset_class = CoordinatesFilterSet

class CircuitCoordinateViewSet(NetBoxModelViewSet):
    queryset = CircuitCoordinate.objects.all()
    serializer_class = CircuitCoordinateSerializer
    filterset_class = CircuitCoordinatesFilterSet

class PowerPanelCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerPanelCoordinate.objects.all()
    serializer_class = PowerPanelCoordinateSerializer
    filterset_class = PowerPanelCoordinatesFilterSet

class PowerFeedCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerFeedCoordinate.objects.all()
    serializer_class = PowerFeedCoordinateSerializer
    filterset_class = PowerFeedCoordinatesFilterSet
