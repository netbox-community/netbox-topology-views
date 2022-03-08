from rest_framework.viewsets import ModelViewSet, ViewSet, ReadOnlyModelViewSet, GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from rest_framework.routers import APIRootView

from .serializers import TopologyDummySerializer
from django.conf import settings

from dcim.models import  DeviceRole, Device, Cable
from circuits.models import Circuit
from extras.models import Tag


class TopologyViewsRootView(APIRootView):
    def get_view_name(self):
        return 'TopologyViews'


class SaveCoordsViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.all()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=['patch'])
    def save_coords(self, request):
        results = {}
        if settings.PLUGINS_CONFIG["netbox_topology_views"]["allow_coordinates_saving"]:
            device_id = None
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

            actual_device= Device.objects.get(id=device_id)

            if "coordinates" in actual_device.custom_field_data:
                actual_device.custom_field_data["coordinates"] = "%s;%s" % (x_coord,y_coord)
                actual_device.save()
                results["status"] = "saved coords"
            else:
                try:
                    actual_device.custom_field_data["coordinates"] = "%s;%s" % (x_coord,y_coord)
                    actual_device.save()
                    results["status"] = "saved coords"
                except :
                    results["status"] = "coords custom field not created"
                    return Response(status=500)

            return Response(results)
        else:
            results["status"] = "not allowed to save coords"
            return Response(results, status=500)

