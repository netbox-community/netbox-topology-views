from netbox.plugins import PluginMenu, PluginMenuItem, PluginMenuButton

coordinategroup_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        permissions=['netbox_topology_views.add_coordinategroup']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinategroup_import',
        title='Import',
        icon_class='mdi mdi-upload',
        permissions=['netbox_topology_views.add_coordinategroup']
    )
)

circuitcoordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:circuitcoordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        permissions=['netbox_topology_views.add_coordinate']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:circuitcoordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
        permissions=['netbox_topology_views.add_coordinate']
    )
)

powerpanelcoordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:powerpanelcoordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        permissions=['netbox_topology_views.add_coordinate']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:powerpanelcoordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
        permissions=['netbox_topology_views.add_coordinate']
    )
)

powerfeedcoordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:powerfeedcoordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        permissions=['netbox_topology_views.add_coordinate']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:powerfeedcoordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
        permissions=['netbox_topology_views.add_coordinate']
    )
)

coordinate_buttons = (
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_add',
        title='Add',
        icon_class='mdi mdi-plus-thick',
        permissions=['netbox_topology_views.add_coordinate']
    ),
    PluginMenuButton(
        link='plugins:netbox_topology_views:coordinate_import',
        title='Import',
        icon_class='mdi mdi-upload',
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
            ),
        ),
        ('COORDINATES', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:coordinategroup_list", link_text="Coordinate Groups", buttons=coordinategroup_buttons, permissions=['netbox_topology_views.view_coordinategroup']),
                PluginMenuItem(link="plugins:netbox_topology_views:coordinate_list", link_text="Device Coordinates", buttons=coordinate_buttons, permissions=['netbox_topology_views.view_coordinate']),
                PluginMenuItem(link="plugins:netbox_topology_views:powerfeedcoordinate_list", link_text="Power Feed Coords", buttons=powerfeedcoordinate_buttons, permissions=['netbox_topology_views.view_coordinate']),
                PluginMenuItem(link="plugins:netbox_topology_views:powerpanelcoordinate_list", link_text="Power Panel Coords", buttons=powerpanelcoordinate_buttons, permissions=['netbox_topology_views.view_coordinate']),
                PluginMenuItem(link="plugins:netbox_topology_views:circuitcoordinate_list", link_text="Circuit Coordinates", buttons=circuitcoordinate_buttons, permissions=['netbox_topology_views.view_coordinate']),
            ),
        ),
        ('PREFERENCES', 
            (
                PluginMenuItem(link="plugins:netbox_topology_views:images", link_text="Images", permissions=[ "dcim.view_site","dcim.view_devicerole"]),
                PluginMenuItem(link="plugins:netbox_topology_views:individualoptions", link_text="Individual Options", permissions=['netbox_topology_views.change_individualoptions']),
            ),
        ),
    ),
)
