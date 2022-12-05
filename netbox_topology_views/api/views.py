import json
from typing import Dict

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.api.serializers import (
    RoleImageSerializer,
    TopologyDummySerializer,
)
from netbox_topology_views.models import RoleImage
from netbox_topology_views.utils import get_image_from_url


class SaveCoordsViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.all()
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


class SaveRoleImageViewSet(ViewSet):
    queryset = DeviceRole.objects.all()
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

        body = {int(k): str(v) for k, v in request.data.items() if k.isnumeric()}
        roles: Dict[int, DeviceRole] = DeviceRole.objects.in_bulk(body.keys())

        if len(roles) != len(body):
            difference = set(body.keys()) - set(roles.keys())
            return JsonResponse(
                {"status": f"Got unknown device role ids: {difference}"},
                status=400,
            )

        for key, value in body.items():
            RoleImage.objects.update_or_create(
                {
                    "role_id": key,
                    "image": str(get_image_from_url(value)),
                },
                role_id=key,
            )

        return JsonResponse({"status": "Ok"})
