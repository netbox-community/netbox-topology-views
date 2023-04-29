from typing import Dict

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from django.conf import settings
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.api.serializers import (
    RoleImageSerializer,
    TopologyDummySerializer,
)
from netbox_topology_views.models import RoleImage, IndividualOptions
from netbox_topology_views.views import get_topology_data
from netbox_topology_views.utils import get_image_from_url, export_data_to_xml, get_query_settings
from netbox_topology_views.filters import DeviceFilterSet

class SaveCoordsViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            return Response({"status": "not allowed to save coords"}, status=500)

        device_id: str = request.data.get("node_id", None)
        x_coord = request.data.get("x", None)
        y_coord = request.data.get("y", None)

        actual_device = None
        if device_id.startswith("c"):
            device_id = device_id.lstrip("c")
            actual_device = Circuit.objects.get(id=device_id)
        elif device_id.startswith("p"):
            device_id = device_id.lstrip("p")
            actual_device = PowerPanel.objects.get(id=device_id)
        elif device_id.startswith("f"):
            device_id = device_id.lstrip("f")
            actual_device = PowerFeed.objects.get(id=device_id)
        elif device_id.isnumeric():
            actual_device = Device.objects.get(id=device_id)

        if not actual_device:
            return Response({"status": "invalid node_id in body"}, status=400)

        try:
            actual_device.custom_field_data["coordinates"] = "%s;%s" % (
                x_coord,
                y_coord,
            )
            actual_device.save()
        except:
            return Response(
                {"status": "coords custom field could not be saved"}, status=500
            )

        return Response({"status": "saved coords"})

class ExportTopoToXML(PermissionRequiredMixin, ViewSet):
    queryset = Device.objects.none()
    permission_required = ("dcim.view_site", "dcim.view_device")
    serializer_class = TopologyDummySerializer

    def list(self, request):

        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.all().select_related(
            "device_type", "device_role"
        )
        self.queryset = self.filterset(request.GET, self.queryset).qs

        individualOptions, created = IndividualOptions.objects.get_or_create(
            user_id=request.user.id,
        )

        save_coords, show_unconnected, show_power, show_circuit, show_logical_connections, show_single_cable_logical_conns, show_cables, show_wireless = get_query_settings(request)
        topo_data = get_topology_data(
                    self.queryset,
                    individualOptions,
                    show_unconnected,
                    save_coords,
                    show_cables,
                    show_circuit,
                    show_logical_connections,
                    show_single_cable_logical_conns,
                    show_power,
                    show_wireless,
                )
        xml_data = export_data_to_xml(topo_data).decode('utf-8')

        return HttpResponse(xml_data, content_type="application/xml; charset=utf-8")


class SaveRoleImageViewSet(PermissionRequiredMixin, ViewSet):
    queryset = DeviceRole.objects.none()
    serializer_class = RoleImageSerializer
    permission_required = (
        "dcim.add_device_role",
        "dcim.change_device_role",
    )

    def create(self, request):
        if not isinstance(request.data, dict):
            return JsonResponse(
                {"status": "Missing or malformed request body"}, status=400
            )

        device_roles = {k: v for k, v in request.data.items() if k.isnumeric()}
        content_type_ids = {
            k[2:]: v
            for k, v in request.data.items()
            if k.startswith("ct") and k[2:].isnumeric()
        }

        roles: Dict[int, DeviceRole] = DeviceRole.objects.in_bulk(device_roles.keys())
        content_types: Dict[int, ContentType] = ContentType.objects.in_bulk(
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
