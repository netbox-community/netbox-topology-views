from django.shortcuts import  render
from django.views.generic import View
from django.contrib.auth.mixins import PermissionRequiredMixin
from . import filtersets, forms
from dcim.models import   Device

class TopologyHomeView(PermissionRequiredMixin, View):
    permission_required = ('dcim.view_site', 'dcim.view_device')

    filterset = filtersets.TopologyHomeFilterSet
    filterset_form = forms.TopologyHomeFilterForm

    """
    Show the home page
    """
    def get(self, request):

        self.queryset = Device.objects.none()  
        if self.filterset:
            self.queryset = self.filterset(request.GET, self.queryset).qs

        context = {
         'filter_form': self.filterset_form(request.GET,label_suffix='') if self.filterset_form else None,
        }

        return render(request, 'netbox_topology_views/index.html', context)

class TopologyFullView(PermissionRequiredMixin, View):
    permission_required = ('dcim.view_site', 'dcim.view_device')

    """
    Show the full view page
    """
    def get(self, request):        
        return render(request, 'netbox_topology_views/full.html')