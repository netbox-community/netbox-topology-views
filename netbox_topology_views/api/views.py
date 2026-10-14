from typing import Dict

from netbox.api.viewsets import BaseViewSet, NetBoxModelViewSet

from circuits.models import Circuit
from dcim.models import Device, DeviceRole, PowerFeed, PowerPanel
from extras.models import SavedFilter
from django.conf import settings
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.db.utils import DataError, IntegrityError
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from netbox_topology_views.api.serializers import (
    RoleImageSerializer,
    TopologyDummySerializer,
    CoordinateGroupSerializer,
    CoordinateSerializer,
    CircuitCoordinateSerializer,
    PowerPanelCoordinateSerializer,
    PowerFeedCoordinateSerializer,
)
from netbox_topology_views.models import RoleImage, IndividualOptions, CoordinateGroup, Coordinate, CircuitCoordinate, PowerPanelCoordinate, PowerFeedCoordinate
from netbox_topology_views.views import get_topology_data
from netbox_topology_views.utils import get_image_from_url, export_data_to_xml, get_query_settings, is_allowed_image
from netbox_topology_views.filters import DeviceFilterSet

NODE_TYPES = {
    "c": (Circuit, CircuitCoordinate),
    "p": (PowerPanel, PowerPanelCoordinate),
    "f": (PowerFeed, PowerFeedCoordinate),
    "": (Device, Coordinate),
}

class SaveCoordsViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # TokenPermissions derives the required permission (change_coordinate for PATCH) from this model
    queryset = Coordinate.objects.none()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=["patch"])
    def save_coords(self, request):
        if not settings.PLUGINS_CONFIG["netbox_topology_views"][
            "allow_coordinates_saving"
        ]:
            return Response({"status": "not allowed to save coords"}, status=403)

        node_id = str(request.data.get("node_id", ""))
        x_coord = request.data.get("x", None)
        y_coord = request.data.get("y", None)
        group_id = request.data.get("group", None)

        prefix, pk = ("", node_id) if node_id.isdigit() else (node_id[:1], node_id[1:])
        if prefix not in NODE_TYPES or not pk.isdigit():
            return Response({"status": "invalid node_id in body"}, status=400)

        node_model, model_class = NODE_TYPES[prefix]
        actual_device = node_model.objects.restrict(request.user, "view").filter(pk=pk).first()
        if actual_device is None:
            return Response({"status": "invalid node_id in body"}, status=400)

        if group_id is None or group_id == "default":
            group_id = model_class.get_or_create_default_group(group_id)
            if not group_id:
                return Response(
                    {"status": "Error while creating default group."}, status=500
                )
        elif not str(group_id).isdigit():
            return Response({"status": "invalid group in body"}, status=400)

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
        except (IntegrityError, DataError, ValueError, TypeError):
            # Expected failure modes for bad/malformed coordinate data: a
            # unique_together violation, an out-of-range or non-numeric x/y,
            # or a missing/invalid value coercing to the IntegerField. Anything
            # else is an unexpected bug and should propagate rather than be
            # reported back as a generic save failure.
            return Response(
                {"status": "Coordinates could not be saved."}, status=400
            )

        return Response({"status": "saved coords"})

class ExportTopoToXML(BaseViewSet, ViewSet):
    queryset = Device.objects.none()
    serializer_class = TopologyDummySerializer

    def list(self, request):

        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.restrict(request.user, 'view').select_related(
            "device_type", "role"
        )
        self.queryset = self.filterset(request.GET, self.queryset).qs

        individualOptions, created = IndividualOptions.objects.get_or_create(
            user_id=request.user.id,
        )

        if request.GET:

            filter_id, ignore_cable_type, save_coords, show_unconnected, show_power, show_circuit, show_logical_connections, show_single_cable_logical_conns, show_cables, show_wireless, group_sites, group_locations, group_racks, group_virtualchassis, group, show_neighbors, straight_cables, draw_termination_labels, draw_cable_labels, grid_size, node_label_items = get_query_settings(request)

            # Read options from saved filters as NetBox does not handle custom plugin filters
            if "filter_id" in request.GET and request.GET["filter_id"] != '':
                try:
                    saved_filter = SavedFilter.objects.restrict(request.user, 'view').restrict_to_shared(request.user).get(pk=filter_id)
                    saved_filter_params = getattr(saved_filter, 'parameters')

                    if ignore_cable_type == () and 'ignore_cable_type' in saved_filter_params: ignore_cable_type = saved_filter_params['ignore_cable_type']
                    if save_coords == False and 'save_coords' in saved_filter_params: save_coords = saved_filter_params['save_coords']
                    if show_unconnected == False and 'show_unconnected' in saved_filter_params: show_unconnected = saved_filter_params['show_unconnected']
                    if show_power == False and 'show_power' in saved_filter_params: show_power = saved_filter_params['show_power']
                    if show_circuit == False and 'show_circuit' in saved_filter_params: show_circuit = saved_filter_params['show_circuit']
                    if show_logical_connections == False and 'show_logical_connections' in saved_filter_params: show_logical_connections = saved_filter_params['show_logical_connections']
                    if show_single_cable_logical_conns == False and 'show_single_cable_logical_conns' in saved_filter_params: show_single_cable_logical_conns = saved_filter_params['show_single_cable_logical_conns']
                    if show_cables == False and 'show_cables' in saved_filter_params: show_cables = saved_filter_params['show_cables']
                    if show_wireless == False and 'show_wireless' in saved_filter_params: show_wireless = saved_filter_params['show_wireless']
                    if group_sites == False and 'group_sites' in saved_filter_params: group_sites = saved_filter_params['group_sites']
                    if group_locations == False and 'group_locations' in saved_filter_params: group_locations = saved_filter_params['group_locations']
                    if group_racks == False and 'group_racks' in saved_filter_params: group_racks = saved_filter_params['group_racks']
                    if group_virtualchassis == False and 'group_virtualchassis' in saved_filter_params: group_virtualchassis = saved_filter_params['group_virtualchassis']
                    if show_neighbors == False and 'show_neighbors' in saved_filter_params: show_neighbors = saved_filter_params['show_neighbors']
                    if straight_cables == False and 'straight_cables' in saved_filter_params: straight_cables = saved_filter_params['straight_cables']
                    if draw_termination_labels == False and 'draw_termination_labels' in saved_filter_params: draw_termination_labels = saved_filter_params['draw_termination_labels']
                    if draw_cable_labels == False and 'draw_cable_labels' in saved_filter_params: draw_cable_labels = saved_filter_params['draw_cable_labels']
                    if grid_size == 0 and 'grid_size' in saved_filter_params: grid_size = saved_filter_params['grid_size']
                    if node_label_items == () and 'node_label_items' in saved_filter_params: node_label_items = saved_filter_params['node_label_items']
                except SavedFilter.DoesNotExist: # filter_id not found
                    pass
                except Exception as inst:
                    print(type(inst))

            if 'group' not in request.query_params:
                if 'saved_filter_params' in locals() and "group" in saved_filter_params:
                    group_id = saved_filter_params['group'][0]
                else:
                    group_id = "default"
            else:
                group_id = request.query_params["group"]
            topo_data = get_topology_data(
                queryset=self.queryset,
                user=request.user,
                individualOptions=individualOptions,
                ignore_cable_type=ignore_cable_type,
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
                group_virtualchassis=group_virtualchassis,
                group_id=group_id,
                straight_cables=straight_cables,
                draw_termination_labels=draw_termination_labels,
                draw_cable_labels=draw_cable_labels,
                grid_size=grid_size,
                node_label_items=node_label_items,
            )
            xml_data = export_data_to_xml(topo_data).decode('utf-8').replace('\n', '&#xa;')

            return HttpResponse(xml_data, content_type="application/xml; charset=utf-8")
        else:
            return JsonResponse(
                {"status": "Missing or malformed request parameters"}, status=400
            )

class SaveRoleImageViewSet(BaseViewSet, ReadOnlyModelViewSet):
    # TokenPermissions requires dcim.add_devicerole for POST; change is checked in save()
    queryset = DeviceRole.objects.none()
    serializer_class = RoleImageSerializer

    @action(detail=False, methods=["post"])
    def save(self, request):
        if not request.user.has_perm("dcim.change_devicerole"):
            return JsonResponse({"status": "Permission denied"}, status=403)

        if not isinstance(request.data, dict):
            return JsonResponse(
                {"status": "Missing or malformed request body"}, status=400
            )

        images = {k: get_image_from_url(v) for k, v in request.data.items() if isinstance(v, str)}
        if len(images) != len(request.data) or not all(map(is_allowed_image, images.values())):
            return JsonResponse({"status": "Invalid image path"}, status=400)

        device_roles = {k: v for k, v in images.items() if k.isnumeric()}
        content_type_ids = {
            k[2:]: v
            for k, v in images.items()
            if k.startswith("ct") and k[2:].isnumeric()
        }

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

class CoordinateGroupViewSet(NetBoxModelViewSet):
    queryset = CoordinateGroup.objects.all()
    serializer_class = CoordinateGroupSerializer

class CoordinateViewSet(NetBoxModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer

class CircuitCoordinateViewSet(NetBoxModelViewSet):
    queryset = CircuitCoordinate.objects.all()
    serializer_class = CircuitCoordinateSerializer

class PowerPanelCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerPanelCoordinate.objects.all()
    serializer_class = PowerPanelCoordinateSerializer

class PowerFeedCoordinateViewSet(NetBoxModelViewSet):
    queryset = PowerFeedCoordinate.objects.all()
    serializer_class = PowerFeedCoordinateSerializer
