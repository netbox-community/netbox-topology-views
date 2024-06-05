import json
from functools import reduce
from typing import DefaultDict, Dict, Optional, Union
import time
from itertools import chain

from circuits.models import Circuit, CircuitTermination, ProviderNetwork
from dcim.models import (
    Cable,
    CableTermination,
    Device,
    device_components,
    DeviceRole,
    FrontPort,
    Interface,
    PowerFeed,
    PowerPanel,
    RearPort,
)
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q, QuerySet, Count
from django.db.models.functions import Lower
from django.http import HttpRequest, HttpResponseRedirect, QueryDict
from django.shortcuts import render, get_object_or_404
from django.views.generic import View
from extras.models import Tag, SavedFilter
from wireless.models import WirelessLink
from utilities.htmx import htmx_partial
from netbox.views.generic import (
    ObjectView, 
    ObjectListView, 
    ObjectEditView, 
    ObjectDeleteView, 
    ObjectChangeLogView, 
    BulkImportView
)
from netbox_topology_views.filters import DeviceFilterSet, CoordinatesFilterSet, CircuitCoordinatesFilterSet, PowerPanelCoordinatesFilterSet, PowerFeedCoordinatesFilterSet
from netbox_topology_views.forms import (
    DeviceFilterForm, 
    IndividualOptionsForm, 
    CoordinateGroupsForm, 
    CircuitCoordinatesForm, 
    CircuitCoordinatesFilterForm, 
    CircuitCoordinatesImportForm,
    PowerPanelCoordinatesForm, 
    PowerPanelCoordinatesFilterForm, 
    PowerPanelCoordinatesImportForm,
    PowerFeedCoordinatesForm, 
    PowerFeedCoordinatesFilterForm, 
    PowerFeedCoordinatesImportForm,
    CoordinatesForm, 
    CoordinatesFilterForm, 
    CoordinateGroupsImportForm,
    CoordinatesImportForm
)
import netbox_topology_views.models
from netbox_topology_views.models import (
    RoleImage, 
    IndividualOptions, 
    CoordinateGroup, 
    Coordinate, 
    CircuitCoordinate, 
    PowerPanelCoordinate, 
    PowerFeedCoordinate,
)
from netbox_topology_views.tables import CoordinateGroupListTable, CoordinateListTable, CircuitCoordinateListTable, PowerPanelCoordinateListTable, PowerFeedCoordinateListTable
from netbox_topology_views.utils import (
    CONF_IMAGE_DIR,
    find_image_url,
    get_model_role,
    get_model_slug,
    image_static_url,
    LinePattern,
    get_query_settings,
    IMAGE_FILETYPES
)



def get_image_for_entity(entity: Union[Device, Circuit, PowerPanel, PowerFeed]):
    is_device = isinstance(entity, Device)
    query = (
        {"object_id": entity.role_id}
        if is_device
        else {"content_type_id": ContentType.objects.get_for_model(entity).pk}
    )

    try:
        return RoleImage.objects.get(**query).get_image_url()
    except RoleImage.DoesNotExist:
        return find_image_url(
            entity.role.slug if is_device else get_model_slug(entity.__class__)
        )


def create_node(
    device: Union[Device, Circuit, PowerPanel, PowerFeed], save_coords: bool, group_id="default"
):
    node = {}
    node_content = ""
    if isinstance(device, Circuit):
        dev_name = device.cid
        node["id"] = f"c{device.pk}"
        model_name = 'CircuitCoordinate'

        if device.provider is not None:
            node_content += (
                f"<tr><th>Provider: </th><td>{device.provider.name}</td></tr>"
            )
        if device.type is not None:
            node_content += f"<tr><th>Type: </th><td>{device.type.name}</td></tr>"
    elif isinstance(device, PowerPanel):
        dev_name = device.name
        node["id"] = f"p{device.pk}"
        model_name = 'PowerPanelCoordinate'

        if device.site is not None:
            node_content += f"<tr><th>Site: </th><td>{device.site.name}</td></tr>"
        if device.location is not None:
            node_content += (
                f"<tr><th>Location: </th><td>{device.location.name}</td></tr>"
            )
    elif isinstance(device, PowerFeed):
        dev_name = device.name
        node["id"] = f"f{device.pk}"
        model_name = 'PowerFeedCoordinate'

        if device.power_panel is not None:
            node_content += (
                f"<tr><th>Power Panel: </th><td>{device.power_panel.name}</td></tr>"
            )
        if device.type is not None:
            node_content += f"<tr><th>Type: </th><td>{device.type}</td></tr>"
        if device.supply is not None:
            node_content += f"<tr><th>Supply: </th><td>{device.supply}</td></tr>"
        if device.phase is not None:
            node_content += f"<tr><th>Phase: </th><td>{device.phase}</td></tr>"
        if device.amperage is not None:
            node_content += f"<tr><th>Amperage: </th><td>{device.amperage}</td></tr>"
        if device.voltage is not None:
            node_content += f"<tr><th>Voltage: </th><td>{device.voltage}</td></tr>"
    else:
        model_name = 'Coordinate'
        dev_name = device.name
        if dev_name is None:
            dev_name = device.device_type.get_full_name

        if device.device_type is not None:
            node_content += (
                f"<tr><th>Type: </th><td>{device.device_type.model}</td></tr>"
            )
        if device.role.name is not None:
            node_content += (
                f"<tr><th>Role: </th><td>{device.role.name}</td></tr>"
            )
        if device.serial != "":
            node_content += f"<tr><th>Serial: </th><td>{device.serial}</td></tr>"
        if device.primary_ip is not None:
            node_content += (
                f"<tr><th>IP Address: </th><td>{device.primary_ip.address}</td></tr>"
            )
        if device.site is not None:
            node_content += f"<tr><th>Site: </th><td>{device.site.name}</td></tr>"
        if device.location is not None:
            node_content += (
                f"<tr><th>Location: </th><td>{device.location.name}</td></tr>"
            )
        if device.rack is not None:
            node_content += f"<tr><th>Rack: </th><td>{device.rack.name}</td></tr>"
        if device.position is not None:
            if device.face is not None:
                node_content += f"<tr><th>Position: </th><td>{device.position} ({device.face})</td></tr>"
            else:
                node_content += (
                    f"<tr><th>Position: </th><td>{device.position}</td></tr>"
                )

        node["id"] = device.pk

        if device.site is not None:
            node["site"] = device.site.name
            node["site_id"] = device.site_id
        if device.location is not None:
            node["location"] = device.location.name
            node["location_id"] = device.location_id
        if device.rack is not None:
            node["rack"] = device.rack.name
            node["rack_id"] = device.rack_id

        if device.role.color != "":
            node["color.border"] = "#" + device.role.color

    model_class = getattr(netbox_topology_views.models, model_name)

    if group_id is None or group_id == "default":
        group_id = model_class.get_or_create_default_group(group_id)
        if not group_id:
            print('Exception occured while handling default group.')
            return node
   
    group = get_object_or_404(CoordinateGroup, pk=group_id)

    node["physics"] = True
    # Coords must be set even if no coords have been stored. Otherwise nodes with coords 
    # will not be placed correctly by vis-network.
    node["x"] = 0
    node["y"] = 0
    if model_class.objects.filter(group=group, device=device.pk).values('x') and model_class.objects.filter(group=group, device=device.pk).values('y'):
        # Coordinates data for the device exists in Coordinates Group. Let's assign them
        node["x"] = model_class.objects.get(group=group, device=device.pk).x
        node["y"] = model_class.objects.get(group=group, device=device.pk).y
        node["physics"] = False
    elif "coordinates" in device.custom_field_data:
        # We prefer the new Coordinate model but leave the deprecated method 
        # for now as fallback for compatibility reasons
        if device.custom_field_data["coordinates"] is not None:
            if ";" in device.custom_field_data["coordinates"]:
                cords = device.custom_field_data["coordinates"].split(";")
                node["x"] = int(cords[0])
                node["y"] = int(cords[1])
                node["physics"] = False

    dev_title = "<table><tbody> %s</tbody></table>" % (node_content)
    node["title"] = dev_title
    node["name"] = dev_name
    node["label"] = dev_name
    node["shape"] = "image"
    node["href"] = device.get_absolute_url()
    node["image"] = get_image_for_entity(device)

    return node


def create_edge(
    edge_id: int,
    termination_a: Dict,
    termination_b: Dict,
    circuit: Optional[Dict] = None,
    cable: Optional[Cable] = None,
    wireless: Optional[Dict] = None,
    power: Optional[bool] = None,
    interface: Optional[Interface] = None,
):
    cable_a_name = (
        "device A name unknown"
        if termination_a["termination_name"] is None
        else termination_a["termination_name"]
    )
    cable_a_dev_name = (
        "device A name unknown"
        if termination_a["termination_device_name"] is None
        else termination_a["termination_device_name"]
    )
    cable_b_name = (
        "device A name unknown"
        if termination_b["termination_name"] is None
        else termination_b["termination_name"]
    )
    cable_b_dev_name = (
        "cable B name unknown"
        if termination_b["termination_device_name"] is None
        else termination_b["termination_device_name"]
    )

    edge = {}
    edge["id"] = edge_id
    edge["from"] = termination_a["device_id"]
    edge["to"] = termination_b["device_id"]
    edge["color"] = '#2b7ce9'
    title = "Cable"

    if circuit is not None:
        edge["dashes"] = True
        title = f"Circuit provider: {circuit['provider_name']}<br>Termination"

    elif wireless is not None:
        edge["dashes"] = LinePattern().wireless
        title = "Wireless Connection"

    elif power is not None:
        edge["dashes"] = LinePattern().power
        title = "Power Connection"

    elif interface is not None:
        title = "Interface Connection"
        edge["width"] = 3
        edge["dashes"] = LinePattern().logical
        edge["color"] = '#f1c232'
        edge["href"] = interface.get_absolute_url() + "trace"
        
    edge[
        "title"
    ] = f"{title} between<br>{cable_a_dev_name} [{cable_a_name}]<br>{cable_b_dev_name} [{cable_b_name}]"

    if cable is not None:
        edge["href"] = cable.get_absolute_url()
        if hasattr(cable, 'color') and cable.color != "":
            edge["color"] = "#" + cable.color

    return edge


def create_circuit_termination(termination):
    if isinstance(termination, CircuitTermination):
        return {
            "termination_name": termination.circuit.provider.name,
            "termination_device_name": termination.circuit.cid,
            "device_id": "c{}".format(termination.circuit.pk),
        }
    if (
        isinstance(termination, Interface)
        or isinstance(termination, FrontPort)
        or isinstance(termination, RearPort)
    ):
        return {
            "termination_name": termination.name,
            "termination_device_name": termination.device.name,
            "device_id": termination.device.pk,
        }
    return None


def get_topology_data(
    queryset: QuerySet,
    individualOptions: IndividualOptions,
    show_unconnected: bool,
    save_coords: bool,
    show_cables: bool,
    show_circuit: bool,
    show_logical_connections: bool,
    show_single_cable_logical_conns: bool,
    show_neighbors: bool,
    show_power: bool,
    show_wireless: bool,
    group_sites: bool,
    group_locations: bool,
    group_racks: bool,
    group_id,
):
    
    supported_termination_types = []
    for t in IndividualOptions.CHOICES:
        supported_termination_types.append(t[1])

    if not queryset:
        return None

    nodes_devices = {}
    edges = []
    nodes = []
    options = {}
    edge_ids = 0
    nodes_circuits: Dict[int, Circuit] = {}
    nodes_powerpanel: Dict[int, PowerPanel] = {}
    nodes_powerfeed: Dict[int, PowerFeed] = {}
    nodes_provider_networks = {}
    cable_ids = DefaultDict(dict)
    interface_ids = DefaultDict(dict)

    ignore_cable_type = individualOptions.ignore_cable_type

    device_ids = [d.pk for d in queryset]
    site_ids = [d.site_id for d in queryset]

    if show_neighbors:
        interfaces = Interface.objects.filter(
            Q(device_id__in=device_ids)
        )
        frontports = FrontPort.objects.filter(
            Q(device_id__in=device_ids)
        )
        rearports = RearPort.objects.filter(
            Q(device_id__in=device_ids)
        )

        ports = chain(interfaces, frontports, rearports)
        for port in ports:
            for link_peer in port.link_peers:
                if hasattr(link_peer, 'device') and link_peer.device.id not in device_ids:
                    device_ids.append(link_peer.device.id)

        if show_logical_connections:
            path_complete_interfaces = Interface.objects.filter(
                Q(_path__is_complete=True) & Q(device_id__in=device_ids)
            )
            for path_complete_interface in path_complete_interfaces:
                for connected_endpoint in path_complete_interface.connected_endpoints:
                    if type(connected_endpoint) != ProviderNetwork:
                        device_ids.append(connected_endpoint.device.id)

    if show_circuit:
        circuit_terminations = CircuitTermination.objects.filter(
            Q(site_id__in=site_ids) | Q(provider_network__isnull=False)
        ).prefetch_related("provider_network", "circuit")
        for circuit_termination in circuit_terminations:
            circuit_termination: CircuitTermination
            if (
                show_unconnected
                and circuit_termination.circuit_id not in nodes_circuits
            ):
                nodes_circuits[
                    circuit_termination.circuit.pk
                ] = circuit_termination.circuit

            termination_a = {}
            termination_b = {}
            circuit_model = {}
            if circuit_termination.cable is not None:
                termination_a = create_circuit_termination(
                    circuit_termination.cable.a_terminations[0]
                )
                termination_b = create_circuit_termination(
                    circuit_termination.cable.b_terminations[0]
                )
            elif circuit_termination.provider_network is not None:
                if (
                    circuit_termination.provider_network_id
                    not in nodes_provider_networks
                ):
                    nodes_provider_networks[
                        circuit_termination.provider_network.pk
                    ] = circuit_termination.provider_network

            if bool(termination_a) and bool(termination_b):
                circuit_model = {
                    "provider_name": circuit_termination.circuit.provider.name
                }
                edge_ids += 1
                edges.append(
                    create_edge(
                        edge_id=edge_ids,
                        cable=circuit_termination.cable,
                        circuit=circuit_model,
                        termination_a=termination_a,
                        termination_b=termination_b,
                    )
                )

                circuit_has_connections = False
                for termination in [
                    circuit_termination.cable.a_terminations[0],
                    circuit_termination.cable.b_terminations[0],
                ]:
                    if not isinstance(termination, CircuitTermination):
                        if (
                            termination.device_id not in nodes_devices
                            and termination.device_id in device_ids
                        ):
                            nodes_devices[termination.device_id] = termination.device
                            circuit_has_connections = True
                        else:
                            if termination.device_id in device_ids:
                                circuit_has_connections = True

                if circuit_has_connections and not show_unconnected:
                    if circuit_termination.circuit_id not in nodes_circuits:
                        nodes_circuits[
                            circuit_termination.circuit.pk
                        ] = circuit_termination.circuit

        for d in nodes_circuits.values():
            nodes.append(create_node(d, save_coords, group_id))

    if show_power:
        power_panels_ids = PowerPanel.objects.filter(
            Q(site_id__in=site_ids)
        ).values_list("pk", flat=True)
        power_feeds: QuerySet[PowerFeed] = PowerFeed.objects.filter(
            Q(power_panel_id__in=power_panels_ids)
        )

        for power_feed in power_feeds:
            if show_unconnected or (
                not show_unconnected and power_feed.cable_id is not None
            ):
                if power_feed.power_panel_id not in nodes_powerpanel:
                    nodes_powerpanel[power_feed.power_panel.pk] = power_feed.power_panel

                power_link_name = ""
                if power_feed.pk not in nodes_powerfeed:
                    if not show_unconnected:
                        if power_feed.link_peers[0].device_id in device_ids:
                            nodes_powerfeed[power_feed.pk] = power_feed
                            power_link_name = power_feed.link_peers[0].name
                    else:
                        nodes_powerfeed[power_feed.pk] = power_feed

                edge_ids += 1
                termination_a = {
                    "termination_name": power_feed.power_panel.name,
                    "termination_device_name": "",
                    "device_id": f"p{power_feed.power_panel_id}",
                }
                termination_b = {
                    "termination_name": power_feed.name,
                    "termination_device_name": power_link_name,
                    "device_id": f"f{power_feed.pk}",
                }
                edges.append(
                    create_edge(
                        edge_id=edge_ids,
                        termination_a=termination_a,
                        termination_b=termination_b,
                        power=True,
                    )
                )

                if power_feed.cable_id is not None:
                    cable_ids[power_feed.cable_id][power_feed.cable_end] = termination_b

        for d in nodes_powerfeed.values():
            nodes.append(create_node(d, save_coords, group_id))

        for d in nodes_powerpanel.values():
            nodes.append(create_node(d, save_coords, group_id))

    if show_logical_connections:
        interfaces = Interface.objects.filter(
            Q(_path__is_complete=True) & Q(device_id__in=device_ids)
        )

        for interface in interfaces:
            # print('{} {} {} {}'.format(interface.device.name, interface.name, interface._path.destinations[0].device.name, interface._path.destinations[0].name))
            for destination in interface._path.destinations:
                if isinstance(destination, device_components.Interface):
                    if destination.device.id not in device_ids:
                        # print('Destination interface not in device queryset, ignoring')
                        continue

                    if destination.id in interface_ids:
                        # we've already captured the destination interface, ignore this connection
                        # print('Destination interface already exists, ignoring')
                        continue

                    if not show_single_cable_logical_conns and interface.cable_id==destination.cable_id and show_cables:
                        # interface connection is the same as the cable connection, ignore this connection
                        continue
            
                    interface_ids[interface.id]=interface
                    edge_ids += 1
                    termination_a = { "termination_name": interface.name, "termination_device_name": interface.device.name, "device_id": interface.device.id }
                    termination_b = { "termination_name": destination.name, "termination_device_name": destination.device.name, "device_id": destination.device.id }
                    edges.append(create_edge(edge_id=edge_ids, termination_a=termination_a, termination_b=termination_b, interface=interface))
                    nodes_devices[interface.device.id] = interface.device
                    nodes_devices[destination.device.id] = destination.device

    if show_cables:
        links: QuerySet[CableTermination] = CableTermination.objects.filter(
            Q(_device_id__in=device_ids)
        ).select_related("termination_type")

        for link in links:
            if link.termination_type.name in ignore_cable_type:
                continue

            # Normal device cables
            if link.termination_type.name in supported_termination_types:
                complete_link = False
                if link.cable_end == "A":
                    if link.cable_id not in cable_ids:
                        cable_ids[link.cable_id] = {}
                    else:
                        if "B" in cable_ids[link.cable_id]:
                            if cable_ids[link.cable_id]["B"] is not None:
                                complete_link = True
                elif link.cable_end == "B":
                    if link.cable_id not in cable_ids:
                        cable_ids[link.cable_id] = {}
                    else:
                        if "A" in cable_ids[link.cable_id]:
                            if cable_ids[link.cable_id]["A"] is not None:
                                complete_link = True
                else:
                    print("Unkown cable end")
                cable_ids[link.cable_id][link.cable_end] = link

                if complete_link:
                    edge_ids += 1
                    if isinstance(cable_ids[link.cable_id]["B"], CableTermination):
                        if cable_ids[link.cable_id]["B"]._device_id not in nodes_devices:
                            nodes_devices[
                                cable_ids[link.cable_id]["B"]._device_id
                            ] = cable_ids[link.cable_id]["B"].termination.device
                        termination_b = {
                            "termination_name": cable_ids[link.cable_id][
                                "B"
                            ].termination.name,
                            "termination_device_name": cable_ids[link.cable_id][
                                "B"
                            ].termination.device.name,
                            "device_id": cable_ids[link.cable_id][
                                "B"
                            ].termination.device_id,
                        }
                    else:
                        termination_b = cable_ids[link.cable_id]["B"]

                    if isinstance(cable_ids[link.cable_id]["A"], CableTermination):
                        if cable_ids[link.cable_id]["A"]._device_id not in nodes_devices:
                            nodes_devices[
                                cable_ids[link.cable_id]["A"]._device_id
                            ] = cable_ids[link.cable_id]["A"].termination.device
                        termination_a = {
                            "termination_name": cable_ids[link.cable_id][
                                "A"
                            ].termination.name,
                            "termination_device_name": cable_ids[link.cable_id][
                                "A"
                            ].termination.device.name,
                            "device_id": cable_ids[link.cable_id][
                                "A"
                            ].termination.device_id,
                        }
                    else:
                        termination_a = cable_ids[link.cable_id]["A"]

                    edges.append(
                        create_edge(
                            edge_id=edge_ids,
                            cable=link.cable,
                            termination_a=termination_a,
                            termination_b=termination_b,
                        )
                    )

    if show_wireless:
        wlan_links: QuerySet[WirelessLink] = WirelessLink.objects.filter(
            Q(_interface_a_device_id__in=device_ids)
            & Q(_interface_b_device_id__in=device_ids)
        )

        for wlan_link in wlan_links:
            if wlan_link.interface_a.device_id not in nodes_devices:
                nodes_devices[
                    wlan_link.interface_a.device.pk
                ] = wlan_link.interface_a.device
            if wlan_link.interface_b.device_id not in nodes_devices:
                nodes_devices[
                    wlan_link.interface_b.device.pk
                ] = wlan_link.interface_b.device

            termination_a = {
                "termination_name": wlan_link.interface_a.name,
                "termination_device_name": wlan_link.interface_a.device.name,
                "device_id": wlan_link.interface_a.device_id,
            }
            termination_b = {
                "termination_name": wlan_link.interface_b.name,
                "termination_device_name": wlan_link.interface_b.device.name,
                "device_id": wlan_link.interface_b.device_id,
            }
            wireless = {"ssid": wlan_link.ssid}

            edge_ids += 1
            edges.append(
                create_edge(
                    edge_id=edge_ids,
                    cable=wlan_link,
                    termination_a=termination_a,
                    termination_b=termination_b,
                    wireless=wireless,
                )
            )

    if group_locations:
        options['group_locations'] = 'on'
    if group_racks:
        options['group_racks'] = 'on'
    if group_sites:
        options['group_sites'] = 'on'

    for qs_device in queryset:
        if qs_device.pk not in nodes_devices and show_unconnected:
            nodes_devices[qs_device.pk] = qs_device

    results = {}

    for d in nodes_devices.values():
        nodes.append(create_node(d, save_coords, group_id))

    results["nodes"] = nodes
    results["edges"] = edges
    results["group"] = group_id
    results["options"] = options
    return results


class TopologyHomeView(PermissionRequiredMixin, View):
    permission_required = ("dcim.view_site", "dcim.view_device")

    """
    Show the home page
    """

    def get(self, request):
        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.all().select_related(
            "device_type", "role"
        )
        self.queryset = self.filterset(request.GET, self.queryset).qs
        self.model = self.queryset.model
        topo_data = None

        individualOptions, created = IndividualOptions.objects.get_or_create(
            user_id=request.user.id,
        )

        if request.GET:

            filter_id, save_coords, show_unconnected, show_power, show_circuit, show_logical_connections, show_single_cable_logical_conns, show_cables, show_wireless, group_sites, group_locations, group_racks, show_neighbors = get_query_settings(request)
            
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

            if "group" not in request.GET:
                group_id = "default"
            else:
                group_id = request.GET["group"]

            if not "draw_init" in request.GET or "draw_init" in request.GET and request.GET["draw_init"].lower() == "true":
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
            
        else:
            # No GET-Request in URL. We most likely came here from the navigation menu.
            preselected_device_roles = IndividualOptions.objects.get(id=individualOptions.id).preselected_device_roles.all().values_list('id', flat=True)
            preselected_tags = IndividualOptions.objects.get(id=individualOptions.id).preselected_tags.all().values_list(Lower('name'), flat=True)

            q = QueryDict(mutable=True)
            q.setlist("role_id", list(preselected_device_roles))
            q.setlist("tag", list(preselected_tags))

            if individualOptions.save_coords: q['save_coords'] = "True"
            if individualOptions.show_unconnected: q['show_unconnected'] = "True"
            if individualOptions.show_cables: q['show_cables'] = "True"
            if individualOptions.show_logical_connections: q['show_logical_connections'] = "True"
            if individualOptions.show_single_cable_logical_conns: q['show_single_cable_logical_conns'] = "True"
            if individualOptions.show_neighbors: q['show_neighbors'] = "True"
            if individualOptions.show_circuit: q['show_circuit'] = "True"
            if individualOptions.show_power: q['show_power'] = "True"
            if individualOptions.show_wireless: q['show_wireless'] = "True"
            if individualOptions.group_sites: q['group_sites'] = "True"
            if individualOptions.group_locations: q['group_locations'] = "True"
            if individualOptions.group_racks: q['group_racks'] = "True"
            if individualOptions.draw_default_layout: 
                q['draw_init'] = "True"
            else:
                q['draw_init'] = "False"

            query_string = q.urlencode()
            return HttpResponseRedirect(f"{request.path}?{query_string}")


        if htmx_partial(request):
            return render(
                request,
                "netbox_topology_views/htmx_topology.html",
                {
                    "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
                    "topology_data": json.dumps(topo_data),
                    "broken_image": find_image_url("role-unknown"),
                    "epoch": int(time.time()),
                    "basepath": settings.BASE_PATH,
                },
            )

        return render(
            request,
            "netbox_topology_views/index.html",
            {
                "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
                "topology_data": json.dumps(topo_data),
                "broken_image": find_image_url("role-unknown"),
                "model": self.model,
                "basepath": settings.BASE_PATH,
            },
        )


CONFIG = settings.PLUGINS_CONFIG["netbox_topology_views"]
ADDITIONAL_ROLES = (PowerPanel, PowerFeed, Circuit)


class TopologyImagesView(PermissionRequiredMixin, View):
    permission_required = (
        "dcim.view_site",
        "dcim.view_devicerole",
        "dcim.add_devicerole",
        "dcim.change_devicerole",
    )

    def get(self, request: HttpRequest):
        images = [
            {"url": image_static_url(image), "title": image.stem}
            for image in CONF_IMAGE_DIR.iterdir() if image.name.lower().endswith(IMAGE_FILETYPES)
        ]

        roles = reduce(
            lambda acc, cur: {
                **acc,
                cur.name: {
                    "id": cur.pk,
                    "name": cur.name,
                    "slug": cur.slug,
                    "image": find_image_url(cur.slug),
                },
            },
            DeviceRole.objects.all(),
            dict(),
        )

        for additional_role in ADDITIONAL_ROLES:
            cur = get_model_role(additional_role)
            ct = ContentType.objects.get_for_model(additional_role).pk

            roles[cur.name] = {
                "id": f"ct{ct}",
                "name": cur.name,
                "slug": cur.slug,
                "image": find_image_url(cur.slug),
            }

        role_images = RoleImage.objects.all()

        for role_image in role_images:
            roles[role_image.role.name]["image"] = role_image.get_image_url()

        return render(
            request,
            "netbox_topology_views/images.html",
            {
                "roles": sorted(list(roles.values()), key=lambda r: r["name"]),
                "images": images,
                "basepath": settings.BASE_PATH,
            },
        )

class CircuitCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = CircuitCoordinate.objects.all()

class CircuitCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_coordinate'

    queryset = CircuitCoordinate.objects.all()
    form = CircuitCoordinatesForm
    template_name = 'netbox_topology_views/circuitcoordinate_add.html'

class CircuitCoordinateBulkImportView(BulkImportView):
    queryset = CircuitCoordinate.objects.all()
    model_form = CircuitCoordinatesImportForm

class CircuitCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = CircuitCoordinate.objects.all()
    table = CircuitCoordinateListTable
    template_name = 'netbox_topology_views/circuitcoordinate_list.html'
    filterset = CircuitCoordinatesFilterSet
    filterset_form = CircuitCoordinatesFilterForm

class CircuitCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinate'

    queryset = CircuitCoordinate.objects.all()
    form = CircuitCoordinatesForm
    template_name = 'netbox_topology_views/circuitcoordinate_edit.html'

class CircuitCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinate'

    queryset = CircuitCoordinate.objects.all()

class CircuitCoordinateChangeLogView(PermissionRequiredMixin, ObjectChangeLogView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = CircuitCoordinate.objects.all()

class PowerPanelCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerPanelCoordinate.objects.all()

class PowerPanelCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_coordinate'

    queryset = PowerPanelCoordinate.objects.all()
    form = PowerPanelCoordinatesForm
    template_name = 'netbox_topology_views/powerpanelcoordinate_add.html'

class PowerPanelCoordinateBulkImportView(BulkImportView):
    queryset = PowerPanelCoordinate.objects.all()
    model_form = PowerPanelCoordinatesImportForm

class PowerPanelCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerPanelCoordinate.objects.all()
    table = PowerPanelCoordinateListTable
    template_name = 'netbox_topology_views/powerpanelcoordinate_list.html'
    filterset = PowerPanelCoordinatesFilterSet
    filterset_form = PowerPanelCoordinatesFilterForm

class PowerPanelCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinate'

    queryset = PowerPanelCoordinate.objects.all()
    form = PowerPanelCoordinatesForm
    template_name = 'netbox_topology_views/powerpanelcoordinate_edit.html'

class PowerPanelCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinate'

    queryset = PowerPanelCoordinate.objects.all()

class PowerPanelCoordinateChangeLogView(PermissionRequiredMixin, ObjectChangeLogView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerPanelCoordinate.objects.all()

class PowerFeedCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerFeedCoordinate.objects.all()

class PowerFeedCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_coordinate'

    queryset = PowerFeedCoordinate.objects.all()
    form = PowerFeedCoordinatesForm
    template_name = 'netbox_topology_views/powerfeedcoordinate_add.html'

class PowerFeedCoordinateBulkImportView(BulkImportView):
    queryset = PowerFeedCoordinate.objects.all()
    model_form = PowerFeedCoordinatesImportForm

class PowerFeedCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerFeedCoordinate.objects.all()
    table = PowerFeedCoordinateListTable
    template_name = 'netbox_topology_views/powerfeedcoordinate_list.html'
    filterset = PowerFeedCoordinatesFilterSet
    filterset_form = PowerFeedCoordinatesFilterForm

class PowerFeedCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinate'

    queryset = PowerFeedCoordinate.objects.all()
    form = PowerFeedCoordinatesForm
    template_name = 'netbox_topology_views/powerfeedcoordinate_edit.html'

class PowerFeedCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinate'

    queryset = PowerFeedCoordinate.objects.all()

class PowerFeedCoordinateChangeLogView(PermissionRequiredMixin, ObjectChangeLogView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = PowerFeedCoordinate.objects.all()

class CoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = Coordinate.objects.all()

class CoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_coordinate'

    queryset = Coordinate.objects.all()
    form = CoordinatesForm
    template_name = 'netbox_topology_views/coordinate_add.html'

class CoordinateBulkImportView(BulkImportView):
    queryset = Coordinate.objects.all()
    model_form = CoordinatesImportForm

class CoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = Coordinate.objects.all()
    table = CoordinateListTable
    template_name = 'netbox_topology_views/coordinate_list.html'
    filterset = CoordinatesFilterSet
    filterset_form = CoordinatesFilterForm

class CoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinate'

    queryset = Coordinate.objects.all()
    form = CoordinatesForm
    template_name = 'netbox_topology_views/coordinate_edit.html'

class CoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinate'

    queryset = Coordinate.objects.all()

class CoordinateChangeLogView(PermissionRequiredMixin, ObjectChangeLogView):
    permission_required = 'netbox_topology_views.view_coordinate'

    queryset = Coordinate.objects.all()

class CoordinateGroupView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinategroup'

    queryset = CoordinateGroup.objects.all()

    def get_extra_context(self, request, instance):
        circuittable = CircuitCoordinateListTable(instance.circuitcoordinate_set.all())
        circuittable.configure(request)
        powerpaneltable = PowerPanelCoordinateListTable(instance.powerpanelcoordinate_set.all())
        powerpaneltable.configure(request)
        powerfeedtable = PowerFeedCoordinateListTable(instance.powerfeedcoordinate_set.all())
        powerfeedtable.configure(request)
        table = CoordinateListTable(instance.coordinate_set.all())
        table.configure(request)

        return {
            'circuitcoordinates_table': circuittable,
            'powerpanelcoordinates_table': powerpaneltable,
            'powerfeedcoordinates_table': powerfeedtable,
            'coordinates_table': table,
        }

class CoordinateGroupAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_coordinategroup'

    queryset = CoordinateGroup.objects.all()
    form = CoordinateGroupsForm
    template_name = 'netbox_topology_views/coordinategroup_add.html'

class CoordinateGroupBulkImportView(BulkImportView):
    queryset = CoordinateGroup.objects.all()
    model_form = CoordinateGroupsImportForm

class CoordinateGroupListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_coordinategroup'

    queryset = CoordinateGroup.objects.annotate(
        devices = Count('coordinate')
    )
    table = CoordinateGroupListTable
    template_name = 'netbox_topology_views/coordinategroup_list.html'

class CoordinateGroupEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinategroup'

    queryset = CoordinateGroup.objects.all()
    form = CoordinateGroupsForm
    template_name = 'netbox_topology_views/coordinategroup_edit.html'

class CoordinateGroupDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinategroup'

    queryset = CoordinateGroup.objects.all()

class CoordinateGroupChangeLogView(PermissionRequiredMixin, ObjectChangeLogView):
    permission_required = 'netbox_topology_views.view_coordinategroup'

    queryset = CoordinateGroup.objects.all()

class TopologyIndividualOptionsView(PermissionRequiredMixin, View):
    permission_required = 'netbox_topology_views.change_individualoptions'

    def post(self, request):
        instance = IndividualOptions.objects.get(user_id=request.user.id)
        form = IndividualOptionsForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Options have been sucessfully saved")
        else:
            messages.error(request, form.errors)
            
        return HttpResponseRedirect("./")

    def get(self, request):
        queryset, created = IndividualOptions.objects.get_or_create(
            user_id=request.user.id,
        )

        form = IndividualOptionsForm(
            initial={
                'user_id': request.user.id,
                'ignore_cable_type': tuple(queryset.ignore_cable_type.translate({ord(i): None for i in '[]\''}).split(', ')),
                'preselected_device_roles': IndividualOptions.objects.get(id=queryset.id).preselected_device_roles.all(),
                'preselected_tags': IndividualOptions.objects.get(id=queryset.id).preselected_tags.all(),
                'save_coords': queryset.save_coords,
                'show_unconnected': queryset.show_unconnected,
                'show_cables': queryset.show_cables, 
                'show_logical_connections': queryset.show_logical_connections,
                'show_single_cable_logical_conns': queryset.show_single_cable_logical_conns,
                'show_neighbors': queryset.show_neighbors,
                'show_circuit': queryset.show_circuit,
                'show_power': queryset.show_power,
                'show_wireless': queryset.show_wireless,
                'group_sites': queryset.group_sites,
                'group_locations': queryset.group_locations,
                'group_racks': queryset.group_racks,
                'draw_default_layout': queryset.draw_default_layout,
            },
        )

        return render(
            request,
            "netbox_topology_views/individual_options.html",
            {
                "form": form,
                "object": queryset,
            },
        )
