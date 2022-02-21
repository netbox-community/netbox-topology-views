from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('preselectdeviceroles', views.PreSelectDeviceRolesViewSet)
router.register('preselecttags', views.PreSelectTagsViewSet)
router.register('search', views.SearchViewSet, basename='search')
router.register('save-coords', views.SaveCoordsViewSet, basename='save_coords')

urlpatterns = router.urls