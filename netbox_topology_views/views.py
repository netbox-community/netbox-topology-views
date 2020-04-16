from django.shortcuts import get_object_or_404, render
from django.views.generic import View

class TopologyHomeView(View):
    """
    Show the home page
    """
    def get(self, request):        
        return render(request, 'netbox_topology_views/index.html')