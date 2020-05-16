from rest_framework.serializers import ModelSerializer

from dcim.models import DeviceRole, Device
from extras.models import Tag

class PreDeviceRoleSerializer(ModelSerializer):

    class Meta:
        model = DeviceRole
        fields = ('id', 'name')

class PreTagSerializer(ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name')
        

class TopologyDummySerializer(ModelSerializer):

    class Meta:
        model = Device
        fields = ('id', 'name')
        