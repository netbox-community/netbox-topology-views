from extras.plugins import PluginConfig

class TopologyViewsConfig(PluginConfig):
    name = 'netbox_topology_views'
    verbose_name = 'Topology views'
    description = 'An plugin to render topology maps'
    version = '3.0.0-beta.2'
    author = 'Mattijs Vanhaverbeke'
    author_email = 'author@example.com'
    base_url = 'netbox_topology_views'
    required_settings = []
    default_settings = {
        'preselected_device_roles': ['Firewall', 'Router', 'Distribution Switch', 'Core Switch', 'Internal Switch', 'Access Switch', 'Server', 'Storage', 'Backup', 'Wireless AP'],
        'ignore_cable_type': [],
        'device_img': ['access-switch', 'core-switch', 'firewall', 'router', 'distribution-switch', 'backup', 'storage', 'wan-network', 'wireless-ap', 'server', 'internal-switch', 'isp-cpe-material', 'non-racked-devices', 'power-units'],
        'allow_coordinates_saving': False,
        'always_save_coordinates': False,
        'preselected_tags' : [],
        'draw_default_layout': False
    }

config = TopologyViewsConfig
