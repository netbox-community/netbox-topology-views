from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('save-coords', views.SaveCoordsViewSet, basename='save_coords')

urlpatterns = router.urls