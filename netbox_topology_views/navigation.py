from extras.plugins import PluginMenu, PluginMenuItem, PluginMenuButton
from utilities.choices import ButtonColorChoices

coordinategroup_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_import',
        title='Import',
        icon_class='mdi mdi-upload',
        color=ButtonColorChoices.CYAN,
    )
)

coordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
        color=ButtonColorChoices.CYAN,
    )
)

menu = PluginMenu(
    label='Topology Views',
    icon_class="mdi mdi-sitemap",
    groups=(
        ('TOPOLOGY', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology"),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinategroup_list", link_text="Coordinate Groups", buttons=coordinategroup_buttons),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinate_list", link_text="Coordinates", buttons=coordinate_buttons),
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
