import django_filters
from dcim.choices import DeviceStatusChoices
from dcim.models import Device, DeviceRole, Location, Rack, Region, Site
from django.db.models import Q
from netbox.filtersets import NetBoxModelFilterSet
from tenancy.filtersets import TenancyFilterSet
from utilities.filters import TreeNodeMultipleChoiceFilter
from netbox_topology_views.models import CoordinateGroup, Coordinate

class DeviceFilterSet(TenancyFilterSet, NetBoxModelFilterSet):
    q = django_filters.CharFilter(
        method="search",
        label="Search",
    )
    device_role_id = django_filters.ModelMultipleChoiceFilter(
        field_name="device_role_id",
        queryset=DeviceRole.objects.all(),
        label="Role (ID)",
    )
    region_id = TreeNodeMultipleChoiceFilter(
        queryset=Region.objects.all(),
        field_name="site__region",
        lookup_expr="in",
        label="Region (ID)",
    )
    site_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Site.objects.all(),
        label="Site (ID)",
    )
    location_id = TreeNodeMultipleChoiceFilter(
        queryset=Location.objects.all(),
        field_name="location",
        lookup_expr="in",
        label="Location (ID)",
    )
    rack_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Rack.objects.all(),
        field_name="rack_id",
        label="Rack (ID)",
    )
    status = django_filters.MultipleChoiceFilter(
        choices=DeviceStatusChoices,
        null_value=None,
    )

    class Meta:
        model = Device
        fields = ["id", "name"]

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        qs_filter = Q(name__icontains=value)
        return queryset.filter(qs_filter)

class CoordinatesFilterSet(NetBoxModelFilterSet):
    group = django_filters.ModelMultipleChoiceFilter(
        queryset = CoordinateGroup.objects.all(),
    )

    device = django_filters.ModelMultipleChoiceFilter(
        queryset = Device.objects.all(),
    )

    class Meta:
        model = Coordinate
        fields = ['id', 'group', 'device', 'x', 'y']

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(group__name__icontains=value) |
            Q(device__name__icontains=value)
        )
