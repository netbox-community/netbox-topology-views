from cProfile import label
import imp
from django import forms
from django.conf import settings

from django.utils.translation import gettext as _

from dcim.models import Device, Site, Region, DeviceRole, Location, Rack

from django import forms
from dcim.choices import DeviceStatusChoices
from tenancy.models import TenantGroup, Tenant
from tenancy.forms import TenancyFilterForm
from django.conf import settings
from netbox.forms import NetBoxModelFilterSetForm, NetBoxModelForm
from utilities.forms import (
    TagFilterField,
    DynamicModelMultipleChoiceField,
    MultipleChoiceField,
)
from .models import IndividualOptions, GeneralOptions

generalOptions, created = GeneralOptions.objects.get_or_create(
    unique_row="general_options"
)

allow_coordinates_saving = generalOptions.allow_coordinates_saving
#allow_coordinates_saving = bool(
#    settings.PLUGINS_CONFIG["netbox_topology_views"]["allow_coordinates_saving"]
#)


class DeviceFilterForm(TenancyFilterForm, NetBoxModelFilterSetForm):
    model = Device
    fieldsets = (
        (
            None,
            (
                "q",
                "filter_id",
                "save_coords",
                "show_unconnected",
                "show_cables",
                "show_circuit",
                "show_logical_connections",
                "show_power",
                "show_wireless",
            ),
        ),
        (
            None,
            (
                "tenant_group_id",
                "tenant_id",
            ),
        ),
        (None, ("region_id", "site_id", "location_id", "rack_id")),
        (
            None,
            (
                "device_role_id",
                "id",
                "status",
            ),
        ),
        (None, ("tag",)),
    )

    region_id = DynamicModelMultipleChoiceField(
        queryset=Region.objects.all(), required=False, label=_("Region")
    )
    device_role_id = DynamicModelMultipleChoiceField(
        queryset=DeviceRole.objects.all(), required=False, label=_("Device Role")
    )
    id = DynamicModelMultipleChoiceField(
        queryset=Device.objects.all(),
        required=False,
        label=_("Device"),
        query_params={
            "location_id": "$location_id",
            "region_id": "$region_id",
            "site_id": "$site_id",
            "role_id": "$device_role_id",
        },
    )
    site_id = DynamicModelMultipleChoiceField(
        queryset=Site.objects.all(),
        required=False,
        query_params={
            "region_id": "$region_id",
        },
        label=_("Site"),
    )
    location_id = DynamicModelMultipleChoiceField(
        queryset=Location.objects.all(),
        required=False,
        query_params={
            "region_id": "$region_id",
            "site_id": "$site_id",
        },
        label=_("Location"),
    )
    rack_id = DynamicModelMultipleChoiceField(
        queryset=Rack.objects.all(),
        required=False,
        query_params={
            "region_id": "$region_id",
            "site_id": "$site_id",
            "location_id": "$location_id",
        },
        label=_("Rack"),
    )
    show_unconnected = forms.BooleanField(
        label=_("Show Unconnected"), required=False, initial=False
    )
    show_logical_connections = forms.BooleanField(
        label =_("Show Logical Connections"), required=False, initial=False
    )
    show_cables = forms.BooleanField(
        label =_("Show Cables"), required=False, initial=False
    )
    show_wireless = forms.BooleanField(
        label =_("Show Wireless Links"), required=False, initial=False
    )
    show_circuit = forms.BooleanField(
        label=_("Show Circuit Terminations"), required=False, initial=False
    )
    show_power = forms.BooleanField(
        label=_("Show Power Feeds"), required=False, initial=False
    )
    save_coords = forms.BooleanField(
        label=_("Save Coordinates"),
        required=False,
        disabled=(not allow_coordinates_saving),
    )
    status = MultipleChoiceField(
        choices=DeviceStatusChoices, required=False, label=_("Device Status")
    )
    tag = TagFilterField(model)

class IndividualOptionsForm(NetBoxModelForm):
    fieldsets = (
        (
            None,
            (
                "user_id",
                "show_unconnected",
                "show_cables",
                "show_circuit",
                "show_logical_connections",
                "show_power",
                "show_wireless",
            ),
        ),
    )

    user_id = forms.CharField(widget=forms.HiddenInput())

    show_unconnected = forms.BooleanField(
        label=_("Show Unconnected"), 
        required=False, 
        initial=False,
        help_text=_("Draws devices that have no connections or for which no "
            "connection is displayed. This depends on other parameters "
            "like 'Show Cables' and 'Show Logical Connections'")
    )
    show_cables = forms.BooleanField(
        label =_("Show Cables"), 
        required=False, 
        initial=False,
        help_text=_("Displays connections between interfaces that are connected "
            "with one or more cables. These connections are displayed as solid "
            "lines in the color of the cable")
    )
    show_logical_connections = forms.BooleanField(
        label =_("Show Logical Connections"), 
        required=False, 
        initial=False,
        help_text=_("Displays connections between devices that are not "
            "directly connected (e.g. via patch panels). These connections "
            "are displayed as yellow dotted lines with arrows at the ends")
    )
    show_circuit = forms.BooleanField(
        label=_("Show Circuit Terminations"), 
        required=False, 
        initial=False,
        help_text=_("Displays connections between circuit terminations. "
            "These connections are displayed as blue dashed lines")
    )
    show_power = forms.BooleanField(
        label=_("Show Power Feeds"), 
        required=False, 
        initial=False,
        help_text=_("Displays connections between power outlets and power "
            "ports. These connections are displayed as solid lines in the "
            "color of the cable. This option depends on 'Show Cables'")
    )
    show_wireless = forms.BooleanField(
        label =_("Show Wireless Links"), 
        required=False, 
        initial=False,
        help_text=_("Displays wireless connections. These connections are "
            "displayed as blue dotted lines")
    )

    class Meta:
        model = IndividualOptions
        fields = [
            'user_id', 'show_unconnected', 'show_cables', 'show_logical_connections', 'show_circuit', 'show_power', 'show_wireless'
        ]

class GeneralOptionsForm(NetBoxModelForm):
    fieldsets = (
        (
            None,
            (
                "static_image_directory",
                "allow_coordinates_saving",
                "always_save_coordinates",
            ),
        ),
    )

    static_image_directory = forms.CharField(
        label=_("Static Image Directoy"), 
        help_text=_("")
    )

    allow_coordinates_saving = forms.BooleanField(
        label=_("Allow Coordinates Saving"), 
        required=False, 
        initial=False,
        help_text=_("")
    )
    always_save_coordinates = forms.BooleanField(
        label =_("Always Save Coordinates"), 
        required=False, 
        initial=False,
        help_text=_("")
    )

    class Meta:
        model = GeneralOptions
        fields = [
            'static_image_directory', 'allow_coordinates_saving', 'always_save_coordinates'
        ]
