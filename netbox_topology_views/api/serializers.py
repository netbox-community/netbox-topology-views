from rest_framework.serializers import ModelSerializer

from dcim.models import DeviceRole, Device
from extras.models import Tag


class TopologyDummySerializer(ModelSerializer):

    class Meta:
        model = Device
        fields = ('id', 'name')
        