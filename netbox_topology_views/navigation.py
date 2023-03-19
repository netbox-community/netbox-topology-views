from extras.plugins import PluginMenu, PluginMenuItem

menu = PluginMenu(
    label='Topology Views',
    icon_class="mdi mdi-sitemap",
    groups=(
        ('TOPOLOGY', (PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),),),
        ('PREFERENCES', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Images"),
                PluginMenuItem(link="plugins:netbox_topology_views:individualoptions", link_text="Individual Options"),
                PluginMenuItem(link="plugins:netbox_topology_views:generaloptions", link_text="General Options"),
            ),
        ),
    ),
)
