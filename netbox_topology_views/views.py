from django.shortcuts import get_object_or_404, render
from django.views.generic import View
from django.contrib.auth.mixins import PermissionRequiredMixin

class TopologyHomeView(PermissionRequiredMixin, View):
    permission_required = ('dcim.view_site', 'dcim.view_device')

    """
    Show the home page
    """
    def get(self, request):        
        return render(request, 'netbox_topology_views/index.html')

class TopologyFullView(PermissionRequiredMixin, View):
    permission_required = ('dcim.view_site', 'dcim.view_device')

    """
    Show the full view page
    """
    def get(self, request):        
        return render(request, 'netbox_topology_views/full.html')