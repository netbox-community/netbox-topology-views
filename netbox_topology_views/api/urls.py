from rest_framework import routers

from .views import PreSelectDeviceRolesViewSet, SearchViewSet, SaveCoordsViewSet

router = routers.DefaultRouter()
router.register('preselectdeviceroles', PreSelectDeviceRolesViewSet)
router.register('search', SearchViewSet, basename='search')
router.register('save-coords', SaveCoordsViewSet, basename='save_coords')

urlpatterns = router.urls