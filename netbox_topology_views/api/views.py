import json
from typing import Dict

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.routers import APIRootView
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.models import RoleImage
from netbox_topology_views.utils import get_image_from_url

from .serializers import TopologyDummySerializer


class TopologyViewsRootView(APIRootView):
    def get_view_name(self):
        return "TopologyViews"


class SaveCoordsViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.all()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        results = {}
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            results["status"] = "not allowed to save coords"
            return Response(results, status=500)

        device_id: str = None  # type: ignore
        x_coord = None
        y_coord = None
        if "node_id" in request.data:
            if request.data["node_id"]:
                device_id = request.data["node_id"]
        if "x" in request.data:
            if request.data["x"]:
                x_coord = request.data["x"]
        if "y" in request.data:
            if request.data["y"]:
                y_coord = request.data["y"]

        if device_id.startswith("c"):
            device_id = device_id.lstrip("c")
            actual_device = Circuit.objects.get(id=device_id)
        elif device_id.startswith("p"):
            device_id = device_id.lstrip("p")
            actual_device = PowerPanel.objects.get(id=device_id)
        elif device_id.startswith("f"):
            device_id = device_id.lstrip("f")
            actual_device = PowerFeed.objects.get(id=device_id)
        else:
            actual_device = Device.objects.get(id=device_id)

        if "coordinates" in actual_device.custom_field_data:
            actual_device.custom_field_data["coordinates"] = "%s;%s" % (
                x_coord,
                y_coord,
            )
            actual_device.save()
            results["status"] = "saved coords"
        else:
            try:
                actual_device.custom_field_data["coordinates"] = "%s;%s" % (
                    x_coord,
                    y_coord,
                )
                actual_device.save()
                results["status"] = "saved coords"
            except:
                results["status"] = "coords custom field not created"
                return Response(status=500)

        return Response(results)


class SaveRoleImageViewSet(ViewSet):
    permission_required = (
        "dcim.add_device_role",
        "dcim.change_device_role",
    )

    def post(self, request):
        try:
            request_body = json.loads(request.body)
        except json.JSONDecodeError:
            request_body = None

        if not isinstance(request_body, dict):
            return JsonResponse(
                {"message": "Missing or malformed request body"}, status=400
            )

        body = {int(k): str(v) for k, v in request_body.items() if k.isnumeric()}
        roles: Dict[int, DeviceRole] = DeviceRole.objects.in_bulk(body.keys())

        if len(roles) != len(body):
            return JsonResponse(
                {
                    "message": f"Got unknown device role ids: {set(body.keys()) - set(roles.keys())}"
                },
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

        return JsonResponse({"message": "Ok"})
