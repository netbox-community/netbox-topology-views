from extras.plugins import PluginMenuItem

menu = PluginMenu(
    label='Topology Views',
    groups=(
        ('Topology', ( PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"), PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Topology Images"), )),
    ),
)

#menu_items = (
#    PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),
#    PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Topology Images"),
#    ),
#)
