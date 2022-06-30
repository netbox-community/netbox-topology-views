from cProfile import label
import django_filters
from django.db.models import Q

from dcim.models import Device, DeviceRole, Region, Site, Location
from dcim.choices import DeviceStatusChoices

from netbox.filtersets import NetBoxModelFilterSet

from tenancy.models import TenantGroup, Tenant
from tenancy.filtersets import TenancyFilterSet

from utilities.filters import TreeNodeMultipleChoiceFilter


class DeviceFilterSet(TenancyFilterSet, NetBoxModelFilterSet):
    q = django_filters.CharFilter(
        method='search',
        label='Search',
    )
    device_role_id = django_filters.ModelMultipleChoiceFilter(
        field_name='device_role_id',
        queryset=DeviceRole.objects.all(),
        label='Role (ID)',
    )
    region_id = TreeNodeMultipleChoiceFilter(
        queryset=Region.objects.all(),
        field_name='site__region',
        lookup_expr='in',
        label='Region (ID)',
    )
    site_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Site.objects.all(),
        label='Site (ID)',
    )
    location_id = TreeNodeMultipleChoiceFilter(
        queryset=Location.objects.all(),
        field_name='location',
        lookup_expr='in',
        label='Location (ID)',
    )
    status = django_filters.MultipleChoiceFilter(
        choices=DeviceStatusChoices,
        null_value=None
    )


    class Meta:
        model = Device
        fields = ['id', 'name']

    def search(self, queryset, name, value):
        """Perform the filtered search."""
        if not value.strip():
            return queryset
        qs_filter = (
             Q(name__icontains=value) 
        )
        return queryset.filter(qs_filter)
