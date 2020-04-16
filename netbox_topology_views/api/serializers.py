from rest_framework.serializers import ModelSerializer

from dcim.models import DeviceRole

class PreDeviceRoleSerializer(ModelSerializer):

    class Meta:
        model = DeviceRole
        fields = ('id', 'name')
        