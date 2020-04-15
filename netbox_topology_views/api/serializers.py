from rest_framework.serializers import ModelSerializer, ValidatedModelSerializer

from dcim.models import DeviceRole

class PreDeviceRoleSerializer(ValidatedModelSerializer):

    class Meta:
        model = DeviceRole
        fields = ('id', 'name', 'slug', 'color', 'vm_role', 'description')
        