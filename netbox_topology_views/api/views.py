from rest_framework.viewsets import ModelViewSet

from .serializers import PreDeviceRoleSerializer

from dcim.models import  DeviceRole

class PreSelectDeviceRolesViewSet(ModelViewSet):
    queryset = DeviceRole.objects.all()
    serializer_class = PreDeviceRoleSerializer
