from django.urls import path
from django.views.generic.base import RedirectView

from . import models, views

# Define a list of URL patterns to be imported by NetBox. Each pattern maps a URL to
# a specific view so that it can be accessed by users.
urlpatterns = (
    path("", RedirectView.as_view(url="topology/", permanent=True)),
    path("topology/", views.TopologyHomeView.as_view(), name="home"),
    path("images/", views.TopologyImagesView.as_view(), name="images"),
    path("individualoptions/", views.TopologyIndividualOptionsView.as_view(), name="individualoptions"),

    # Coordinate Group
    path("coordinate-groups/", views.CoordinateGroupListView.as_view(), name="coordinategroups_list"),
    path("coordinate-groups/add/", views.CoordinateGroupAddView.as_view(), name="coordinategroups_add"),
    path("coordinate-groups/<int:pk>/", views.CoordinateGroupView.as_view(), name="coordinategroups"),
    path("coordinate-groups/<int:pk>/edit/", views.CoordinateGroupEditView.as_view(), name="coordinategroups_edit"),
    path("coordinate-groups/<int:pk>/delete/", views.CoordinateGroupDeleteView.as_view(), name="coordinategroups_delete"),
    path("coordinate-groups/<int:pk>/changelog/", views.CoordinateGroupChangeLogView.as_view(), name="coordinategroups_changelog", kwargs={'model': models.CoordinateGroups}),

    # Coordinate
    path("coordinates/", views.CoordinateListView.as_view(), name="coordinates_list"),
    path("coordinates/add/", views.CoordinateAddView.as_view(), name="coordinates_add"),
    path("coordinates/<int:pk>/", views.CoordinateView.as_view(), name="coordinates"),
    path("coordinates/<int:pk>/edit/", views.CoordinateEditView.as_view(), name="coordinates_edit"),
    path("coordinates/<int:pk>/delete/", views.CoordinateDeleteView.as_view(), name="coordinates_delete"),
    path("coordinates/<int:pk>/changelog/", views.CoordinateChangeLogView.as_view(), name="coordinates_changelog", kwargs={'model': models.Coordinates}),
)
