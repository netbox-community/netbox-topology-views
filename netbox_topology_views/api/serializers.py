from dcim.models import Device, DeviceRole
from rest_framework.serializers import ModelSerializer
from netbox.api.serializers import NetBoxModelSerializer

from netbox_topology_views.models import RoleImage, IndividualOptions, GeneralOptions


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

class IndividualOptionsSerializer(NetBoxModelSerializer):
    class Meta:
        model = IndividualOptions
        fields = ("ignore_cable_type", "show_unconnected", "show_cables", "show_logical_connections", "show_single_cable_logical_conns", "show_circuit", "show_power", "show_wireless", "draw_default_layout")

class GeneralOptionsSerializer(NetBoxModelSerializer):
    class Meta:
        model = GeneralOptions
        fields = ("static_image_directory", "allow_coordinates_saving", "always_save_coordinates")