from netbox.api.routers import NetBoxRouter

from netbox_topology_views.api import views

router = NetBoxRouter()

router.register("save-coords", views.SaveCoordsViewSet)
router.register("images", views.SaveRoleImageViewSet)

urlpatterns = router.urls
