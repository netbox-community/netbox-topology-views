from django.urls import path
from django.views.generic.base import RedirectView
from netbox.views.generic import ObjectChangeLogView
from . import models, views

# Define a list of URL patterns to be imported by NetBox. Each pattern maps a URL to
# a specific view so that it can be accessed by users.
urlpatterns = (
    path("", RedirectView.as_view(url="topology/", permanent=True)),
    path("topology/", views.TopologyHomeView.as_view(), name="home"),
    path("images/", views.TopologyImagesView.as_view(), name="images"),
    path("individualoptions/", views.TopologyIndividualOptionsView.as_view(), name="individualoptions"),

    # Coordinate Group
    path("coordinate-groups/", views.CoordinateGroupListView.as_view(), name="coordinategroup_list"),
    path("coordinate-groups/add/", views.CoordinateGroupAddView.as_view(), name="coordinategroup_add"),
    path('coordinate-groups/import/', views.CoordinateGroupBulkImportView.as_view(), name='coordinategroup_import'),
    path("coordinate-groups/<int:pk>/", views.CoordinateGroupView.as_view(), name="coordinategroup"),
    path("coordinate-groups/<int:pk>/edit/", views.CoordinateGroupEditView.as_view(), name="coordinategroup_edit"),
    path("coordinate-groups/<int:pk>/delete/", views.CoordinateGroupDeleteView.as_view(), name="coordinategroup_delete"),
    path("coordinate-groups/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="coordinategroup_changelog", kwargs={'model': models.CoordinateGroup}),

    # Circuit Coordinate
    path("circuitcoordinate/", views.CircuitCoordinateListView.as_view(), name="circuitcoordinate_list"),
    path("circuitcoordinate/add/", views.CircuitCoordinateAddView.as_view(), name="circuitcoordinate_add"),
    path('circuitcoordinate/import/', views.CircuitCoordinateBulkImportView.as_view(), name='circuitcoordinate_import'),
    path("circuitcoordinate/<int:pk>/", views.CircuitCoordinateView.as_view(), name="circuitcoordinate"),
    path("circuitcoordinate/<int:pk>/edit/", views.CircuitCoordinateEditView.as_view(), name="circuitcoordinate_edit"),
    path("circuitcoordinate/<int:pk>/delete/", views.CircuitCoordinateDeleteView.as_view(), name="circuitcoordinate_delete"),
    path("circuitcoordinate/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="circuitcoordinate_changelog", kwargs={'model': models.CircuitCoordinate}),

    # Power Panel Coordinate
    path("powerpanelcoordinate/", views.PowerPanelCoordinateListView.as_view(), name="powerpanelcoordinate_list"),
    path("powerpanelcoordinate/add/", views.PowerPanelCoordinateAddView.as_view(), name="powerpanelcoordinate_add"),
    path('powerpanelcoordinate/import/', views.PowerPanelCoordinateBulkImportView.as_view(), name='powerpanelcoordinate_import'),
    path("powerpanelcoordinate/<int:pk>/", views.PowerPanelCoordinateView.as_view(), name="powerpanelcoordinate"),
    path("powerpanelcoordinate/<int:pk>/edit/", views.PowerPanelCoordinateEditView.as_view(), name="powerpanelcoordinate_edit"),
    path("powerpanelcoordinate/<int:pk>/delete/", views.PowerPanelCoordinateDeleteView.as_view(), name="powerpanelcoordinate_delete"),
    path("powerpanelcoordinate/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="powerpanelcoordinate_changelog", kwargs={'model': models.PowerPanelCoordinate}),

    # Power Feed Coordinate
    path("powerfeedcoordinate/", views.PowerFeedCoordinateListView.as_view(), name="powerfeedcoordinate_list"),
    path("powerfeedcoordinate/add/", views.PowerFeedCoordinateAddView.as_view(), name="powerfeedcoordinate_add"),
    path('powerfeedcoordinate/import/', views.PowerFeedCoordinateBulkImportView.as_view(), name='powerfeedcoordinate_import'),
    path("powerfeedcoordinate/<int:pk>/", views.PowerFeedCoordinateView.as_view(), name="powerfeedcoordinate"),
    path("powerfeedcoordinate/<int:pk>/edit/", views.PowerFeedCoordinateEditView.as_view(), name="powerfeedcoordinate_edit"),
    path("powerfeedcoordinate/<int:pk>/delete/", views.PowerFeedCoordinateDeleteView.as_view(), name="powerfeedcoordinate_delete"),
    path("powerfeedcoordinate/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="powerfeedcoordinate_changelog", kwargs={'model': models.PowerFeedCoordinate}),

    # Coordinate
    path("coordinate/", views.CoordinateListView.as_view(), name="coordinate_list"),
    path("coordinate/add/", views.CoordinateAddView.as_view(), name="coordinate_add"),
    path('coordinate/import/', views.CoordinateBulkImportView.as_view(), name='coordinate_import'),
    path("coordinate/<int:pk>/", views.CoordinateView.as_view(), name="coordinate"),
    path("coordinate/<int:pk>/edit/", views.CoordinateEditView.as_view(), name="coordinate_edit"),
    path("coordinate/<int:pk>/delete/", views.CoordinateDeleteView.as_view(), name="coordinate_delete"),
    path("coordinate/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="coordinate_changelog", kwargs={'model': models.Coordinate}),
)
