from extras.plugins import PluginConfig


class TopologyViewsConfig(PluginConfig):
    name = "netbox_topology_views"
    verbose_name = "Topology views"
    description = "An plugin to render topology maps"
    version = "3.2.1"
    author = "Mattijs Vanhaverbeke"
    author_email = "author@example.com"
    base_url = "netbox_topology_views"
    required_settings = []
    default_settings = {
        "preselected_device_roles": [
            "Firewall",
            "Router",
            "Distribution Switch",
            "Core Switch",
            "Internal Switch",
            "Access Switch",
            "Server",
            "Storage",
            "Backup",
            "Wireless AP",
        ],
        "ignore_cable_type": [],
        "static_image_directory": "netbox_topology_views/img",
        "preselected_tags": [],
    }


config = TopologyViewsConfig
