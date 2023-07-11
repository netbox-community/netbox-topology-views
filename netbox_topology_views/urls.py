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

    # Coordinate
    path("coordinate/", views.CoordinateListView.as_view(), name="coordinate_list"),
    path("coordinate/add/", views.CoordinateAddView.as_view(), name="coordinate_add"),
    path('coordinate/import/', views.CoordinateBulkImportView.as_view(), name='coordinate_import'),
    path("coordinate/<int:pk>/", views.CoordinateView.as_view(), name="coordinate"),
    path("coordinate/<int:pk>/edit/", views.CoordinateEditView.as_view(), name="coordinate_edit"),
    path("coordinate/<int:pk>/delete/", views.CoordinateDeleteView.as_view(), name="coordinate_delete"),
    path("coordinate/<int:pk>/changelog/", ObjectChangeLogView.as_view(), name="coordinate_changelog", kwargs={'model': models.Coordinate}),
)
