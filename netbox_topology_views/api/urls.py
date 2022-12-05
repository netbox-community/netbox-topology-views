from rest_framework import routers

from netbox_topology_views.api import views

router = routers.DefaultRouter()

router.register("save-coords", views.SaveCoordsViewSet, basename="save_coords")
router.register("images", views.SaveRoleImageViewSet, basename="images")

urlpatterns = router.urls
