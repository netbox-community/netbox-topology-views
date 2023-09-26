import django_filters
from circuits.models import Circuit
from dcim.choices import DeviceStatusChoices
from dcim.models import Device, DeviceRole, Location, Rack, Region, Site, SiteGroup, Manufacturer, DeviceType, Platform, PowerPanel, PowerFeed
from django.db.models import Q
from extras.filtersets import LocalConfigContextFilterSet
from extras.models import ConfigTemplate
from netbox.filtersets import NetBoxModelFilterSet
from tenancy.filtersets import TenancyFilterSet, ContactModelFilterSet
from utilities.filters import TreeNodeMultipleChoiceFilter, MultiValueCharFilter, MultiValueMACAddressFilter
from netbox_topology_views.models import CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate

class DeviceFilterSet(NetBoxModelFilterSet, TenancyFilterSet, ContactModelFilterSet, LocalConfigContextFilterSet):
    q = django_filters.CharFilter(
        method="search",
        label="Search",
    )
    manufacturer_id = django_filters.ModelMultipleChoiceFilter(
        field_name='device_type__manufacturer',
        queryset=Manufacturer.objects.all(),
        label="Manufacturer (ID)",
    )
    manufacturer = django_filters.ModelMultipleChoiceFilter(
        field_name='device_type__manufacturer__slug',
        queryset=Manufacturer.objects.all(),
        to_field_name='slug',
        label="Manufacturer (slug)",
    )
    device_type_id = django_filters.ModelMultipleChoiceFilter(
        queryset=DeviceType.objects.all(),
        label="Device type (ID)",
    )
    role_id = django_filters.ModelMultipleChoiceFilter(
        field_name="role_id",
        queryset=DeviceRole.objects.all(),
        label="Role (ID)",
    )
    platform_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Platform.objects.all(),
        label="Platform (ID)",
    )
    region_id = TreeNodeMultipleChoiceFilter(
        queryset=Region.objects.all(),
        field_name="site__region",
        lookup_expr="in",
        label="Region (ID)",
    )
    site_group_id = TreeNodeMultipleChoiceFilter(
        queryset=SiteGroup.objects.all(),
        field_name="site__group",
        lookup_expr="in",
        label="Site Group (ID)",
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
    mac_address = MultiValueMACAddressFilter(
        field_name='interfaces__mac_address',
        label="MAC address",
    )
    serial = MultiValueCharFilter(
        lookup_expr='iexact'
    )
    console_ports = django_filters.BooleanFilter(
        method='_console_ports',
        label="Has console ports",
    )
    console_server_ports = django_filters.BooleanFilter(
        method='_console_server_ports',
        label="Has console server ports",
    )
    power_ports = django_filters.BooleanFilter(
        method='_power_ports',
        label="Has power ports",
    )
    power_outlets = django_filters.BooleanFilter(
        method='_power_outlets',
        label="Has power outlets",
    )
    interfaces = django_filters.BooleanFilter(
        method='_interfaces',
        label="Has interfaces",
    )
    pass_through_ports = django_filters.BooleanFilter(
        method='_pass_through_ports',
        label="Has pass-through ports",
    )
    config_template_id = django_filters.ModelMultipleChoiceFilter(
        queryset=ConfigTemplate.objects.all(),
        label="Config template (ID)",
    )
    has_primary_ip = django_filters.BooleanFilter(
        method='_has_primary_ip',
        label="Has a primary IP",
    )
    has_oob_ip = django_filters.BooleanFilter(
        method='_has_oob_ip',
        label="Has an out-of-band IP",
    )
    virtual_chassis_member = django_filters.BooleanFilter(
        method='_virtual_chassis_member',
        label="Is a virtual chassis member",
    )

    class Meta:
        model = Device
        fields = ["id", "name", "asset_tag", "airflow"]

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        qs_filter = Q(name__icontains=value)
        return queryset.filter(qs_filter)

    def _console_ports(self, queryset, name, value):
        return queryset.exclude(consoleports__isnull=value)

    def _console_server_ports(self, queryset, name, value):
        return queryset.exclude(consoleserverports__isnull=value)

    def _power_ports(self, queryset, name, value):
        return queryset.exclude(powerports__isnull=value)

    def _power_outlets(self, queryset, name, value):
        return queryset.exclude(poweroutlets__isnull=value)

    def _interfaces(self, queryset, name, value):
        return queryset.exclude(interfaces__isnull=value)

    def _pass_through_ports(self, queryset, name, value):
        return queryset.exclude(
            frontports__isnull=value,
            rearports__isnull=value
        )

    def _has_primary_ip(self, queryset, name, value):
        params = Q(primary_ip4__isnull=False) | Q(primary_ip6__isnull=False)
        if value:
            return queryset.filter(params)
        return queryset.exclude(params)

    def _has_oob_ip(self, queryset, name, value):
        params = Q(oob_ip__isnull=False)
        if value:
            return queryset.filter(params)
        return queryset.exclude(params)

    def _virtual_chassis_member(self, queryset, name, value):
        return queryset.exclude(virtual_chassis__isnull=value)

class CircuitCoordinatesFilterSet(NetBoxModelFilterSet):
    group = django_filters.ModelMultipleChoiceFilter(
        queryset = CoordinateGroup.objects.all(),
    )

    device = django_filters.ModelMultipleChoiceFilter(
        queryset = Circuit.objects.all(),
    )

    class Meta:
        model = CircuitCoordinate
        fields = ['id', 'group', 'device', 'x', 'y']

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(group__name__icontains=value) |
            Q(device__name__icontains=value)
        )

class PowerPanelCoordinatesFilterSet(NetBoxModelFilterSet):
    group = django_filters.ModelMultipleChoiceFilter(
        queryset = CoordinateGroup.objects.all(),
    )

    device = django_filters.ModelMultipleChoiceFilter(
        queryset = PowerPanel.objects.all(),
    )

    class Meta:
        model = PowerPanelCoordinate
        fields = ['id', 'group', 'device', 'x', 'y']

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(group__name__icontains=value) |
            Q(device__name__icontains=value)
        )

class PowerFeedCoordinatesFilterSet(NetBoxModelFilterSet):
    group = django_filters.ModelMultipleChoiceFilter(
        queryset = CoordinateGroup.objects.all(),
    )

    device = django_filters.ModelMultipleChoiceFilter(
        queryset = PowerFeed.objects.all(),
    )

    class Meta:
        model = PowerFeedCoordinate
        fields = ['id', 'group', 'device', 'x', 'y']

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        return queryset.filter(
            Q(group__name__icontains=value) |
            Q(device__name__icontains=value)
        )

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
