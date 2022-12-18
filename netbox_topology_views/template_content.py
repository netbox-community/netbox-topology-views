
from extras.plugins import PluginTemplateExtension
from django.conf import settings
from packaging import version

NETBOX_CURRENT_VERSION = version.parse(settings.VERSION)


class SiteButtons(PluginTemplateExtension):
    model = 'dcim.site'
    def buttons(self):
        return self.render('netbox_topology_views/site_button.html')


template_extensions = [SiteButtons]
