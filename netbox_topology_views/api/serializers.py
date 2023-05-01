from dcim.models import Device, DeviceRole
from rest_framework.serializers import ModelSerializer
from netbox.api.serializers import NetBoxModelSerializer

from netbox_topology_views.models import RoleImage, IndividualOptions, CoordinateGroups, Coordinates


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

class CoordinateGroupsSerializer(NetBoxModelSerializer):
    class Meta:
        model = CoordinateGroups
        fields = ("name", "description")

class CoordinatesSerializer(NetBoxModelSerializer):
    class Meta:
        model = Coordinates
        fields = ("x", "y")

class IndividualOptionsSerializer(NetBoxModelSerializer):
    class Meta:
        model = IndividualOptions
        fields = ("ignore_cable_type", "show_unconnected", "show_cables", "show_logical_connections", "show_single_cable_logical_conns", "show_neighbors", "show_circuit", "show_power", "show_wireless", "draw_default_layout")
        