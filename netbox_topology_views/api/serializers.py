from dcim.models import Device, DeviceRole
from rest_framework.serializers import ModelSerializer

from netbox_topology_views.models import RoleImage, IndividualOptions


class TopologyDummySerializer(ModelSerializer):
    class Meta:
        model = Device
        fields = ("id", "name")


class RoleImageSerializer(ModelSerializer):
    class Meta:
        model = RoleImage
        fields = ("role", "image")


class DeviceRoleSerializer(ModelSerializer):
    class Meta:
        model = DeviceRole
        fields = ("name", "slug", "color", "vm_role", "description")

class IndividualOptionsSerializer(ModelSerializer):
    class Meta:
        model = IndividualOptions
        fields = ("show_unconnected", "show_cables", "show_logical_connections", "show_circuit", "show_power", "show_wireless")