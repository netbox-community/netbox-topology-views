from dcim.models import Device, DeviceRole
from rest_framework.serializers import ModelSerializer
from netbox.api.serializers import NetBoxModelSerializer

from netbox_topology_views.models import RoleImage, IndividualOptions, CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate


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

class CoordinateGroupSerializer(NetBoxModelSerializer):
    class Meta:
        model = CoordinateGroup
        fields = ("name", "description")

class CoordinateSerializer(NetBoxModelSerializer):
    class Meta:
        model = Coordinate
        fields = ("x", "y")

class CircuitCoordinateSerializer(NetBoxModelSerializer):
    class Meta:
        model = CircuitCoordinate
        fields = ("x", "y")

class PowerPanelCoordinateSerializer(NetBoxModelSerializer):
    class Meta:
        model = PowerPanelCoordinate
        fields = ("x", "y")

class PowerFeedCoordinateSerializer(NetBoxModelSerializer):
    class Meta:
        model = PowerFeedCoordinate
        fields = ("x", "y")

class IndividualOptionsSerializer(NetBoxModelSerializer):
    class Meta:
        model = IndividualOptions
        fields = ("ignore_cable_type", "save_coords", "show_unconnected", "show_cables", "show_logical_connections", "show_single_cable_logical_conns", "show_neighbors", "show_circuit", "show_power", "show_wireless", "group_sites", "group_locations", "group_racks", "draw_default_layout")
