from cProfile import label
import imp
from django import forms
from django.conf import settings

from django.utils.translation import gettext as _

from dcim.models import Device, Site, Region, DeviceRole, Location

from django import forms
from dcim.choices import DeviceStatusChoices
from tenancy.models import TenantGroup, Tenant
from tenancy.forms import TenancyFilterForm
from django.conf import settings
from netbox.forms import NetBoxModelFilterSetForm
from utilities.forms import (TagFilterField, DynamicModelMultipleChoiceField, MultipleChoiceField)

allow_coordinates_saving = settings.PLUGINS_CONFIG["netbox_topology_views"]["allow_coordinates_saving"]
end2end = settings.PLUGINS_CONFIG["netbox_topology_views"]["end2end_connections"]


class DeviceFilterForm(TenancyFilterForm, NetBoxModelFilterSetForm):
    model = Device
    fieldsets = (
        (None, ('q', 'hide_unconnected', 'save_coords', 'end2end_connections')),
        (None, ('tenant_group_id', 'tenant_id')),
        (None, ('region_id', 'site_id', 'location_id')),
        (None, ('device_role_id', 'intermediate_dev_role_id')),
        (None, ('tag', 'status')),
    )

    region_id = DynamicModelMultipleChoiceField(
        queryset=Region.objects.all(),
        required=False,
        label=_('Region')
    )
    device_role_id = DynamicModelMultipleChoiceField(
        queryset=DeviceRole.objects.all(),
        required=False,
        label=_('Device Role')
    )
    end2end_connections = forms.BooleanField(
        label=_("Display end-to-end connections"),
        required=False,
        initial=end2end
    )
    intermediate_dev_role_id = DynamicModelMultipleChoiceField(
        queryset=DeviceRole.objects.all(),
        required=False,
        label=_('Intermediate Devices Role'),
        help_text='Intermediate devices to display when using end-to-end connections mode, even if they do not match the query'
    )
    site_id = DynamicModelMultipleChoiceField(
        queryset=Site.objects.all(),
        required=False,
        query_params={
            'region_id': '$region_id',
        },
        label=_('Site')
    )
    location_id = DynamicModelMultipleChoiceField(
        queryset=Location.objects.all(),
        required=False,
        query_params={
            'region_id': '$region_id',
            'site_id': '$site_id',
        },
        label=_('Location')
    )
    hide_unconnected = forms.BooleanField(
        label=_("Hide Unconnected"),
        required=False,
        initial=False
    )
    save_coords = forms.BooleanField(
        label=_("Save Coordinates"),
        required=False,
        disabled=(not allow_coordinates_saving),
        initial=False
    )
    status = MultipleChoiceField(
        choices=DeviceStatusChoices,
        required=False,
        label=_("Device Status")
    )
    tag = TagFilterField(model)
