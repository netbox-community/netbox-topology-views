from extras.plugins import PluginMenu, PluginMenuItem

menu = PluginMenu(
    label='Topology Views',
    groups=(
        ('Topology', (PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),),),
        ('CUSTOMIZATION', (PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Topology Images"),),),
    ),
)
