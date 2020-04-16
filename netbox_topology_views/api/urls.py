from rest_framework import routers

from .views import PreSelectDeviceRolesViewSet, SearchViewSet

router = routers.DefaultRouter()
router.register('preselectdeviceroles', PreSelectDeviceRolesViewSet)
router.register('search', SearchViewSet, basename='search')

urlpatterns = router.urls