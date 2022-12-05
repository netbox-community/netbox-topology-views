from dcim.models import Device
from rest_framework.serializers import ModelSerializer


class TopologyDummySerializer(ModelSerializer):
    class Meta:
        model = Device
        fields = ("id", "name")
