from extras.plugins import PluginConfig

class TopologyViewsConfig(PluginConfig):
    name = 'netbox_topology_views'
    verbose_name = 'Topology views'
    description = 'An plugin to render toplogoy maps'
    version = '0.1'
    author = 'Mattijs Vanhaverbeke'
    author_email = 'author@example.com'
    base_url = 'topology-views'
    required_settings = []
    default_settings = {
        'loud': False
    }

config = TopologyViewsConfig
