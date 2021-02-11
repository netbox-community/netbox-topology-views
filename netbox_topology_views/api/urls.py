from netbox.api import OrderedDefaultRouter
from . import views

router = OrderedDefaultRouter()
router.APIRootView = views.TopologyViewsRootView


router.register('preselectdeviceroles', views.PreSelectDeviceRolesViewSet)
router.register('preselecttags', views.PreSelectTagsViewSet)
router.register('search', views.SearchViewSet, basename='search')
router.register('save-coords', views.SaveCoordsViewSet, basename='save_coords')

urlpatterns = router.urls