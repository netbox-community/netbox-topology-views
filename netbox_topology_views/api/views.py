from typing import Dict
import sys

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from extras.models import SavedFilter
from django.conf import settings
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.api.serializers import (
    RoleImageSerializer,
    TopologyDummySerializer,
)
import netbox_topology_views.models
from netbox_topology_views.models import RoleImage, IndividualOptions, CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate
from netbox_topology_views.views import get_topology_data
from netbox_topology_views.utils import get_image_from_url, export_data_to_xml, get_query_settings
from netbox_topology_views.filters import DeviceFilterSet

class SaveCoordsViewSet(PermissionRequiredMixin, ReadOnlyModelViewSet):
    permission_required = 'netbox_topology_views.change_coordinate'

    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            return Response({"status": "not allowed to save coords"}, status=500)

        device_id: str = request.data.get("node_id", None)
        x_coord = request.data.get("x", None)
        y_coord = request.data.get("y", None)
        group_id = request.data.get("group", "None")

        actual_device = None
        if device_id.startswith("c"):
            device_id = device_id.lstrip("c")
            actual_device = Circuit.objects.get(id=device_id)
            model_name = 'CircuitCoordinate'
        elif device_id.startswith("p"):
            device_id = device_id.lstrip("p")
            actual_device = PowerPanel.objects.get(id=device_id)
            model_name = 'PowerPanelCoordinate'
        elif device_id.startswith("f"):
            device_id = device_id.lstrip("f")
            actual_device = PowerFeed.objects.get(id=device_id)
            model_name = 'PowerFeedCoordinate'
        elif device_id.isnumeric():
            actual_device = Device.objects.get(id=device_id)
            model_name = 'Coordinate'

        if not actual_device:
            return Response({"status": "invalid node_id in body"}, status=400)

        model_class = getattr(netbox_topology_views.models, model_name)

        if group_id is None or group_id == "default":
            group_id = model_class.get_or_create_default_group(group_id)
            if not group_id:
                return Response(
                    {"status": "Error while creating default group."}, status=500
                )  

        try:
            if CoordinateGroup.objects.filter(pk=group_id):
                group = CoordinateGroup.objects.get(pk=group_id)
                # Hen-and-egg-problem. Thanks, Django! By default, Django updates records that
                # already exist and inserts otherwise. This does not work with our 
                # unique_together key if no pk is given. But: No record, no pk.
                if not model_class.objects.filter(group=group, device=actual_device):
                    # Unique group/device pair does not exist. Prepare new data set
                    coords = model_class(group=group, device=actual_device, x=x_coord, y=y_coord)
                else:
                    # Unique group/device pair already exists. Update data
                    coords = model_class(pk=model_class.objects.get(group=group, device=actual_device).pk, group=group, device=actual_device, x=x_coord, y=y_coord)  
                coords.save()
        except:
            return Response(
                {"status": "Coordinates could not be saved."}, status=500
            )

        return Response({"status": "saved coords"})

class ExportTopoToXML(PermissionRequiredMixin, ViewSet):
    permission_required = ("dcim.view_site", "dcim.view_device")

    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    def list(self, request):

        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.all().select_related(
            "device_type", "role"
        )
        self.queryset = self.filterset(request.GET, self.queryset).qs

        individualOptions, created = IndividualOptions.objects.get_or_create(
            user_id=request.user.id,
        )

        if request.GET:

            filter_id, save_coords, show_unconnected, show_power, show_circuit, show_logical_connections, show_single_cable_logical_conns, show_cables, show_wireless, group_sites, group_locations, group_racks,show_neighbors = get_query_settings(request)

            # Read options from saved filters as NetBox does not handle custom plugin filters
            if "filter_id" in request.GET and request.GET["filter_id"] != '':
                try:
                    saved_filter = SavedFilter.objects.get(pk=filter_id)
                    saved_filter_params = getattr(saved_filter, 'parameters')

                    if save_coords == False and 'save_coords' in saved_filter_params: save_coords = saved_filter_params['save_coords']
                    if show_power == False and 'show_power' in saved_filter_params: show_power = saved_filter_params['show_power']
                    if show_circuit == False and 'show_circuit' in saved_filter_params: show_circuit = saved_filter_params['show_circuit']
                    if show_logical_connections == False and 'show_logical_connections' in saved_filter_params: show_logical_connections = saved_filter_params['show_logical_connections']
                    if show_single_cable_logical_conns == False and 'show_single_cable_logical_conns' in saved_filter_params: show_single_cable_logical_conns = saved_filter_params['show_single_cable_logical_conns']
                    if show_cables == False and 'show_cables' in saved_filter_params: show_cables = saved_filter_params['show_cables']
                    if show_wireless == False and 'show_wireless' in saved_filter_params: show_wireless = saved_filter_params['show_wireless']
                    if group_sites == False and 'group_sites' in saved_filter_params: group_sites = saved_filter_params['group_sites']
                    if group_locations == False and 'group_locations' in saved_filter_params: group_locations = saved_filter_params['group_locations']
                    if group_racks == False and 'group_racks' in saved_filter_params: group_racks = saved_filter_params['group_racks']
                    if show_neighbors == False and 'show_neighbors' in saved_filter_params: show_neighbors = saved_filter_params['show_neighbors']
                except SavedFilter.DoesNotExist: # filter_id not found
                    pass
                except Exception as inst:
                    print(type(inst))

            if 'group' not in request.query_params:
                group_id = "default"
            else:
                group_id = request.query_params["group"]
            topo_data = get_topology_data(
                queryset=self.queryset,
                individualOptions=individualOptions,
                save_coords=save_coords,
                show_unconnected=show_unconnected,
                show_cables=show_cables,
                show_logical_connections=show_logical_connections,
                show_single_cable_logical_conns=show_single_cable_logical_conns,
                show_neighbors=show_neighbors,
                show_circuit=show_circuit,
                show_power=show_power,
                show_wireless=show_wireless,
                group_sites=group_sites,
                group_locations=group_locations,
                group_racks=group_racks,
                group_id=group_id,
            )
            xml_data = export_data_to_xml(topo_data).decode('utf-8')

            return HttpResponse(xml_data, content_type="application/xml; charset=utf-8")
        else:
            return JsonResponse(
                {"status": "Missing or malformed request parameters"}, status=400
            )

class SaveRoleImageViewSet(PermissionRequiredMixin, ReadOnlyModelViewSet):
    queryset = DeviceRole.objects.none()
    serializer_class = RoleImageSerializer
    permission_required = (
        "dcim.add_devicerole",
        "dcim.change_devicerole",
    )

    @action(detail=False, methods=["post"])
    def save(self, request):
        if not isinstance(request.data, dict):
            return JsonResponse(
                {"status": "Missing or malformed request body"}, status=400
            )

        if sys.version_info >= (3,9,0):
            device_roles = {
                k: v.removeprefix(settings.STATIC_URL)
                for k, v in request.data.items()
                if k.isnumeric()}
            content_type_ids = {
                k[2:]: v.removeprefix(settings.STATIC_URL)
                for k, v in request.data.items()
                if k.startswith("ct") and k[2:].isnumeric()
            }
        else:
            device_roles = {}
            for k, v in request.data.items():
                if k.isdigit() and v.startswith(settings.STATIC_URL):
                    device_roles[k] = v[len(settings.STATIC_URL):]

            content_type_ids = {}
            for k, v in request.data.items():
                if k.startswith("ct") and k[2:].isdigit() and v.startswith(settings.STATIC_URL):
                    content_type_ids[k[2:]] = v[len(settings.STATIC_URL):]

        roles: Dict[int, DeviceRole] = DeviceRole.objects.in_bulk(device_roles.keys())
        content_types: Dict[int, ContentType] = ContentType.objects.in_bulk(
            content_type_ids.keys()
        )

        if len(roles) != len(device_roles):
            difference = set(device_roles) - set(roles.keys())
            return JsonResponse(
                {"status": f"Got unknown device role ids: {difference}"},
                status=400,
            )

        if len(content_types) != len(content_type_ids):
            difference = set(content_type_ids) - set(content_types.keys())
            return JsonResponse(
                {"status": f"Got unknown content type ids: {difference}"},
                status=400,
            )

        if device_roles:
            device_role_ct = ContentType.objects.get_for_model(DeviceRole)

            for id, url in device_roles.items():
                RoleImage.objects.update_or_create(
                    {
                        "content_type_id": device_role_ct.pk,
                        "object_id": id,
                        "image": str(get_image_from_url(url)),
                    },
                    object_id=id,
                )

        for content_type_id, url in content_type_ids.items():
            RoleImage.objects.update_or_create(
                {
                    "content_type_id": content_type_id,
                    "image": str(get_image_from_url(url)),
                },
                content_type_id=content_type_id,
            )

        return JsonResponse({"status": "Ok"})
