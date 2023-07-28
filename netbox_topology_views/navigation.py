from extras.plugins import PluginMenu, PluginMenuItem, PluginMenuButton
from utilities.choices import ButtonColorChoices

coordinategroup_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
        permissions=['netbox_topology_views.add_coordinategroup']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_import',
        title='Import',
        icon_class='mdi mdi-upload',
        color=ButtonColorChoices.CYAN,
        permissions=['netbox_topology_views.add_coordinategroup']
    )
)

coordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        color=ButtonColorChoices.GREEN,
        permissions=['netbox_topology_views.add_coordinate']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
        color=ButtonColorChoices.CYAN,
        permissions=['netbox_topology_views.add_coordinate']
    )
)

menu = PluginMenu(
    label='Topology Views',
    icon_class="mdi mdi-sitemap",
    groups=(
        ('TOPOLOGY', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:home", link_text="Topology", permissions=["dcim.view_site", "dcim.view_device"]),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinategroup_list", link_text="Coordinate Groups", buttons=coordinategroup_buttons, permissions=['netbox_topology_views.view_coordinategroup']),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinate_list", link_text="Coordinates", buttons=coordinate_buttons, permissions=['netbox_topology_views.view_coordinate']),
            ),
        ),
        ('PREFERENCES', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Images", permissions=[ "dcim.view_site","dcim.view_device_role"]),
                PluginMenuItem(link="plugins:netbox_topology_views:individualoptions", link_text="Individual Options", permissions=['netbox_topology_views.change_individualoptions']),
            ),
        ),
    ),
)
