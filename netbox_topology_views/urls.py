from django.urls import path

from . import views


# Define a list of URL patterns to be imported by NetBox. Each pattern maps a URL to
# a specific view so that it can be accessed by users.
urlpatterns = (
    path('l2/', views.L2TopologyHomeView.as_view(), name='l2'),
    path('l3/', views.L3TopologyHomeView.as_view(), name='l3'),
)
