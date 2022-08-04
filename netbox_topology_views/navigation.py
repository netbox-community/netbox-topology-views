from extras.plugins import PluginMenuButton, PluginMenuItem
from utilities.choices import ButtonColorChoices

menu_items = (
    PluginMenuItem(
        link='plugins:netbox_topology_views:l2',
        link_text='L2 Topology'
    ),
    PluginMenuItem(
        link='plugins:netbox_topology_views:l3',
        link_text='L3 Topology'
    ),
)
