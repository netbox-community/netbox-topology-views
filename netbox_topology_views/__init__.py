from extras.plugins import PluginConfig

class TopologyViewsConfig(PluginConfig):
    name = 'netbox_topology_views'
    verbose_name = 'Topology views'
    description = 'An plugin to render topology maps'
    version = '2.0.2'
    author = 'Mattijs Vanhaverbeke'
    author_email = 'author@example.com'
    base_url = 'netbox_topology_views'
    required_settings = []
    default_settings = {
        'preselected_device_roles': ['Firewall', 'Router', 'Distribution Switch', 'Core Switch', 'Internal Switch', 'Access Switch', 'Server', 'Storage', 'Backup', 'Wireless AP'],
        'preselected_intermediate_dev_roles' : [],
        'end2end_connections': False,
        'ignore_cable_type': ['power outlet','power port'],
        'device_img': ['access-switch', 'core-switch', 'firewall', 'router', 'distribution-switch', 'backup', 'storage', 'wan-network', 'wireless-ap', 'server', 'internal-switch', 'isp-cpe-material', 'non-racked-devices', 'power-units'],
        'allow_coordinates_saving': False,
        'preselected_tags' : [],
        'enable_circuit_terminations': False,
        'draw_default_layout': False
    }

config = TopologyViewsConfig
