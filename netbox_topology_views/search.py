from netbox.search import SearchIndex, register_search
from .models import CoordinateGroups, Coordinates

@register_search
class CoordinateGroupsIndex(SearchIndex):
    model = CoordinateGroups
    fields = (
        ('name', 100),
        ('description', 2000),
    )

@register_search
class CoordinatesIndex(SearchIndex):
    model = Coordinates
    fields = (
        ('group', 100),
        ('device', 200),
    )