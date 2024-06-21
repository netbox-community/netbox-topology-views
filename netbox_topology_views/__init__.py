from netbox.plugins import PluginConfig


class TopologyViewsConfig(PluginConfig):
    name = "netbox_topology_views"
    verbose_name = "Topology views"
    description = "An plugin to render topology maps"
    version = "4.0.0-beta.2"
    author = "Mattijs Vanhaverbeke"
    author_email = "author@example.com"
    base_url = "netbox_topology_views"
    required_settings = []
    default_settings = {
        "static_image_directory": "netbox_topology_views/img",
        "allow_coordinates_saving": False,
        "always_save_coordinates": False,
    }

    def ready(self):
        from . import signals

        super().ready()


config = TopologyViewsConfig
