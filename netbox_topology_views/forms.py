from django import forms
from django.conf import settings
from django.utils.translation import gettext as _

from extras.models import Tag
from dcim.models import Device, Site, Region, DeviceRole, Location


from utilities.forms import (TagFilterField,  DynamicModelMultipleChoiceField, FilterForm)

class DeviceFilterForm(FilterForm):
    model = Device
    field_groups = [
        ['q', 'hide_unconnected'],
        ['region_id', 'site_id', 'location_id'],
        ['device_role_id'],
        ['tag'],
    ]

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
        initial=False)

    tag = TagFilterField(model)
