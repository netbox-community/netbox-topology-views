import django_tables2 as tables

from netbox.tables import NetBoxTable, ChoiceFieldColumn
from netbox_topology_views.models import CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate

class CoordinateGroupListTable(NetBoxTable):
    name = tables.Column(
        linkify=True
    )
    devices = tables.Column()

    class Meta(NetBoxTable.Meta):
        model = CoordinateGroup
        fields = ('pk', 'id', 'name', 'description', 'devices')
        default_columns = ('name', 'description', 'devices')

class CoordinateListTableBase(NetBoxTable):
    group = tables.Column(
        linkify=True
    )

    device = tables.Column(
        linkify=True
    )

    class Meta(NetBoxTable.Meta):
        fields = ('pk', 'id', 'group', 'device', 'x', 'y')
        default_columns = ('id', 'group', 'device', 'x', 'y')

class CircuitCoordinateListTable(CoordinateListTableBase):
    class Meta(CoordinateListTableBase.Meta):
        model = CircuitCoordinate

class PowerPanelCoordinateListTable(CoordinateListTableBase):
    class Meta(CoordinateListTableBase.Meta):
        model = PowerPanelCoordinate

class PowerFeedCoordinateListTable(CoordinateListTableBase):
    class Meta(CoordinateListTableBase.Meta):
        model = PowerFeedCoordinate

class CoordinateListTable(CoordinateListTableBase):
    class Meta(CoordinateListTableBase.Meta):
        model = Coordinate
