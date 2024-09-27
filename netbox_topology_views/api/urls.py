from netbox.api.routers import NetBoxRouter

from netbox_topology_views.api import views

router = NetBoxRouter()

router.register("save-coords", views.SaveCoordsViewSet)
router.register("images", views.SaveRoleImageViewSet)
router.register("xml-export", views.ExportTopoToXML, "xml-export")
router.register("coordinate-groups", views.CoordinateGroupViewSet)
router.register("coordinate", views.CoordinateViewSet)
router.register("circuitcoordinate", views.CircuitCoordinateViewSet)
router.register("powerpanelcoordinate", views.PowerPanelCoordinateViewSet)
router.register("powerfeedcoordinate", views.PowerFeedCoordinateViewSet)

urlpatterns = router.urls
