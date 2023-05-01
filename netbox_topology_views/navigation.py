from extras.plugins import PluginMenu, PluginMenuItem, PluginMenuButton
from utilities.choices import ButtonColorChoices

coordinategroups_buttons = [
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroups_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
    )
]

coordinates_buttons = [
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinates_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
    )
]

menu = PluginMenu(
    label='Topology Views',
    icon_class="mdi mdi-sitemap",
    groups=(
        ('TOPOLOGY', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinategroups_list", link_text="Coordinate Groups", buttons=coordinategroups_buttons),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinates_list", link_text="Coordinates", buttons=coordinates_buttons),
            ),
        ),
        ('PREFERENCES', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Images"),
                PluginMenuItem(link="plugins:netbox_topology_views:individualoptions", link_text="Individual Options"),
            ),
        ),
    ),
)
