
from netbox.plugins import PluginTemplateExtension
from django.conf import settings
from packaging import version

NETBOX_CURRENT_VERSION = version.parse(settings.VERSION)


class SiteButtons(PluginTemplateExtension):
    model = 'dcim.site'
    def buttons(self):
        return self.render('netbox_topology_views/site_button.html')

class LocationButtons(PluginTemplateExtension):
    model = 'dcim.location'
    def buttons(self):
        return self.render('netbox_topology_views/location_button.html')


template_extensions = [SiteButtons, LocationButtons]
