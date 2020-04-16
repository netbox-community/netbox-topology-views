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
        'preselected_device_roles': 'Firewall,Router,Distribution Switch,Core Switch,Internal Switch,Access Switch,Server,Storage,Backup,Wireless AP',
        'IGNORE_CABLE_TYPE': 'dcim.poweroutlet,dcim.powerport',
        'device_img': 'access-switch,core-switch,firewall,router,distribution-switch,backup,storage,wan-network,wireless-ap,server,internal-switch,isp-cpe-material,non-racked-devices,power-units'
    }

config = TopologyViewsConfig
