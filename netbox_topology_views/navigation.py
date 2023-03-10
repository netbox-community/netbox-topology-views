from extras.plugins import PluginMenu, PluginMenuItem

menu = PluginMenu(
    label='Topology Views',
    icon_class="mdi mdi-sitemap",
    groups=(
        ('Topology', (PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),),),
        ('CUSTOMIZATION', (PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Topology Images"),),),
    ),
)
