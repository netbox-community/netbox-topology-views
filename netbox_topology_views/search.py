from netbox.search import SearchIndex, register_search
from .models import CoordinateGroup, Coordinate

@register_search
class CoordinateGroupsIndex(SearchIndex):
    model = CoordinateGroup
    fields = (
        ('name', 100),
        ('description', 2000),
    )

@register_search
class CoordinatesIndex(SearchIndex):
    model = Coordinate
    fields = (
        ('group', 100),
        ('device', 200),
    )
