from rest_framework import routers

from .views import PreSelectDeviceRolesViewSet

router = routers.DefaultRouter()
#router.register('device_roles', AnimalViewSet)
#router.register('sites', AnimalViewSet)
#router.register('search', AnimalViewSet)
#router.register('save_coords', AnimalViewSet)
router.register('preselectdeviceroles', PreSelectDeviceRolesViewSet)

urlpatterns = router.urls