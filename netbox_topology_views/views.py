from functools import reduce
from operator import or_
from typing import DefaultDict, Dict, Optional, Union

from circuits.models import Circuit, CircuitTermination
from dcim.models import (
    Cable,
    CableTermination,
    Device,
    DeviceRole,
    FrontPort,
    Interface,
    PowerFeed,
    PowerPanel,
    RearPort,
)
from dcim.utils import decompile_path_node
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q, QuerySet, Count
from django.http import Http404, HttpRequest, HttpResponseRedirect, QueryDict
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.utils.html import format_html
from django.views.generic import View
from wireless.models import WirelessLink
from netbox.views.generic import (
    ObjectView,
    ObjectListView,
    ObjectEditView,
    ObjectDeleteView,
    BulkImportView
)
from netbox_topology_views.filters import DeviceFilterSet, CoordinateGroupFilterSet, CoordinatesFilterSet, CircuitCoordinatesFilterSet, PowerPanelCoordinatesFilterSet, PowerFeedCoordinatesFilterSet
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
from netbox_topology_views.models import (
    RoleImage,
    IndividualOptions,
    CoordinateGroup,
    Coordinate,
    CircuitCoordinate,
    PowerPanelCoordinate,
    PowerFeedCoordinate,
    NODE_TYPES,
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

from netbox_topology_views.choices import NodeLabelItems

NODE_DEVICE_RELATIONS = (
    "device_type__manufacturer",
    "role",
    "platform",
    "tenant",
    "site",
    "location",
    "rack",
    "virtual_chassis",
    "primary_ip4",
    "primary_ip6",
    "oob_ip",
)


def get_image_resolver():
    role_images = {
        role_image.object_id if role_image.object_id is not None else f"ct{role_image.content_type_id}": role_image
        for role_image in RoleImage.objects.all()
    }
    urls = {}

    def resolve(entity: Union[Device, Circuit, PowerPanel, PowerFeed]):
        if isinstance(entity, Device):
            key, slug = entity.role_id, entity.role.slug
        else:
            key, slug = f"ct{ContentType.objects.get_for_model(entity).pk}", get_model_slug(entity.__class__)
        if key not in urls:
            role_image = role_images.get(key)
            urls[key] = role_image.get_image_url() if role_image else find_image_url(slug)
        return urls[key]

    return resolve


def get_coordinate_group(group_id, user) -> Optional[CoordinateGroup]:
    if group_id in (None, "default"):
        return CoordinateGroup.objects.filter(name="default").first()
    if not str(group_id).isdigit():
        raise Http404("Invalid coordinate group")
    return get_object_or_404(CoordinateGroup.objects.restrict(user, "view"), pk=group_id)


def get_coordinates(group: Optional[CoordinateGroup]) -> Dict:
    coordinates = {}
    if group is None:
        return coordinates
    for prefix, (_, model_class) in NODE_TYPES.items():
        for device_id, x, y in model_class.objects.filter(group=group).values_list("device_id", "x", "y"):
            coordinates[f"{prefix}{device_id}" if prefix else device_id] = (x, y)
    return coordinates


def restrict_terminations(user, model_names, device_ids) -> Q:
    def visible(ct):
        queryset = ct.model_class().objects.restrict(user, "view")
        if not queryset.query.has_filters():
            return Q(termination_type=ct)
        return Q(termination_type=ct, termination_id__in=queryset.filter(device_id__in=device_ids).values("pk"))

    return reduce(or_, map(visible, ContentType.objects.filter(app_label="dcim", model__in=model_names)), Q(pk__in=[]))


def get_path_destination_ids(interface_paths) -> Dict[int, list]:
    interface_ct = ContentType.objects.get_for_model(Interface).pk
    return {
        pk: [destination_id for ct_id, destination_id in map(decompile_path_node, path[-1]) if ct_id == interface_ct]
        for pk, path in interface_paths
    }


def get_path_destinations(interface_paths, user) -> Dict[int, list]:
    destination_ids = get_path_destination_ids(interface_paths)
    destinations = Interface.objects.restrict(user, "view").select_related("device").in_bulk(
        {pk for ids in destination_ids.values() for pk in ids}
    )
    return {pk: [destinations[d] for d in ids if d in destinations] for pk, ids in destination_ids.items()}


def create_node(
    device: Union[Device, Circuit, PowerPanel, PowerFeed],
    node_label_items: list,
    coordinates: Dict,
    image_resolver,
):
    node = {}
    node_content = ""
    if isinstance(device, Circuit):
        dev_name = device.cid
        node["id"] = f"c{device.pk}"

        if device.provider is not None:
            node_content += (
                format_html("<tr><th>Provider: </th><td>{}</td></tr>", device.provider.name)
            )
        if device.type is not None:
            node_content += format_html("<tr><th>Type: </th><td>{}</td></tr>", device.type.name)
    elif isinstance(device, PowerPanel):
        dev_name = device.name
        node["id"] = f"p{device.pk}"

        if device.site is not None:
            node_content += format_html("<tr><th>Site: </th><td>{}</td></tr>", device.site.name)
        if device.location is not None:
            node_content += (
                format_html("<tr><th>Location: </th><td>{}</td></tr>", device.location.name)
            )
    elif isinstance(device, PowerFeed):
        dev_name = device.name
        node["id"] = f"f{device.pk}"

        if device.power_panel is not None:
            node_content += (
                format_html("<tr><th>Power Panel: </th><td>{}</td></tr>", device.power_panel.name)
            )
        if device.type is not None:
            node_content += format_html("<tr><th>Type: </th><td>{}</td></tr>", device.type)
        if device.supply is not None:
            node_content += format_html("<tr><th>Supply: </th><td>{}</td></tr>", device.supply)
        if device.phase is not None:
            node_content += format_html("<tr><th>Phase: </th><td>{}</td></tr>", device.phase)
        if device.amperage is not None:
            node_content += format_html("<tr><th>Amperage: </th><td>{}</td></tr>", device.amperage)
        if device.voltage is not None:
            node_content += format_html("<tr><th>Voltage: </th><td>{}</td></tr>", device.voltage)
    else:
        dev_name = device.name
        if dev_name is None:
            dev_name = device.device_type.full_name

        if device.device_type is not None:
            node_content += (
                format_html("<tr><th>Type: </th><td>{}</td></tr>", device.device_type.model)
            )
        if device.role.name is not None:
            node_content += (
                format_html("<tr><th>Role: </th><td>{}</td></tr>", device.role.name)
            )
        if device.serial != "":
            node_content += format_html("<tr><th>Serial: </th><td>{}</td></tr>", device.serial)
        if device.primary_ip is not None:
            node_content += (
                format_html("<tr><th>IP Address: </th><td>{}</td></tr>", device.primary_ip.address)
            )
        if device.site is not None:
            node_content += format_html("<tr><th>Site: </th><td>{}</td></tr>", device.site.name)
        if device.location is not None:
            node_content += (
                format_html("<tr><th>Location: </th><td>{}</td></tr>", device.location.name)
            )
        if device.rack is not None:
            node_content += format_html("<tr><th>Rack: </th><td>{}</td></tr>", device.rack.name)
        if device.position is not None:
            if device.face:
                node_content += format_html("<tr><th>Position: </th><td>{} ({})</td></tr>", device.position, device.face)
            else:
                node_content += (
                    format_html("<tr><th>Position: </th><td>{}</td></tr>", device.position)
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
        if device.virtual_chassis is not None:
            node["virtual_chassis"] = device.virtual_chassis.name
            node["virtual_chassis_id"] = device.virtual_chassis_id

        if device.role.color != "":
            node["color.border"] = "#" + device.role.color

    node["physics"] = True
    # Coords must be set even if no coords have been stored. Otherwise nodes with coords 
    # will not be placed correctly by vis-network.
    node["x"] = 0
    node["y"] = 0
    cf_coordinates = device.custom_field_data.get("coordinates")
    if node["id"] in coordinates:
        # Coordinates data for the device exists in Coordinates Group. Let's assign them
        node["x"], node["y"] = coordinates[node["id"]]
        node["physics"] = False
    elif isinstance(cf_coordinates, str) and ";" in cf_coordinates:
        # We prefer the new Coordinate model but leave the deprecated method 
        # for now as fallback for compatibility reasons
        x, y = cf_coordinates.split(";")[:2]
        try:
            node["x"], node["y"] = int(x), int(y)
            node["physics"] = False
        except ValueError:
            pass

    dev_title = "<table><tbody> %s</tbody></table>" % (node_content)
    node["title"] = dev_title
    node["name"] = dev_name

    # Create a list of possible label items. Omit None types
    label_mapping = {
        NodeLabelItems.DEVICE_NAME: dev_name,
        NodeLabelItems.DEVICE_TYPE: getattr(device, 'device_type', None), 
        NodeLabelItems.ROLE: getattr(device, 'role', None), 
        NodeLabelItems.DESCRIPTION: getattr(device, 'description', None),
        NodeLabelItems.PRIMARY_IPV4: getattr(device, 'primary_ip4', None), 
        NodeLabelItems.PRIMARY_IPV6: getattr(device, 'primary_ip6', None),
        NodeLabelItems.OUT_OF_BAND_IP: getattr(device, 'oob_ip', None), 
        NodeLabelItems.PLATFORM: getattr(device, 'platform', None), 
        NodeLabelItems.SERIAL: getattr(device, 'serial', None), 
        NodeLabelItems.TENANT: getattr(device, 'tenant', None), 
        NodeLabelItems.SITE: getattr(device, 'site', None), 
        NodeLabelItems.LOCATION: getattr(device, 'location', None), 
        NodeLabelItems.RACK: getattr(device, 'rack', None), 
        NodeLabelItems.VIRTUAL_CHASSIS: getattr(device, 'virtual_chassis', None), 
        NodeLabelItems.ASSET_TAG: getattr(device, 'asset_tag', None),
    }

    label_items = [str(value) for value in map(label_mapping.get, node_label_items) if value]
    node_label = '\n'.join(label_items)

    node["label"] = node_label
    node["shape"] = "image"
    node["href"] = device.get_absolute_url()
    node["image"] = image_resolver(device)
    node["label_num_lines"] = len(label_items)

    return node


def create_edge(
    edge_id: int,
    termination_a: Dict,
    termination_b: Dict,
    straight_cables: bool,
    draw_termination_labels: bool,
    draw_cable_labels: bool,
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
        "device B name unknown"
        if termination_b["termination_name"] is None
        else termination_b["termination_name"]
    )
    cable_b_dev_name = (
        "device B name unknown"
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
        title = format_html("Circuit provider: {}<br>Termination", circuit['provider_name'])

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
    
    if cable is not None and hasattr(cable, "label") and cable.label:
        cable_label = format_html("<br>Label: {}", cable.label)
        if draw_cable_labels is True:
            edge["label"] = cable.label
    else:
        cable_label = ""

    edge[
        "title"
    ] = format_html("{} between<br>{} [{}]<br>{} [{}] {}", title, cable_a_dev_name, cable_a_name, cable_b_dev_name, cable_b_name, cable_label)

    if cable is not None:
        edge["href"] = cable.get_absolute_url()
        if hasattr(cable, 'color') and cable.color != "":
            edge["color"] = "#" + cable.color

    # if straight_cables == True: edge["smooth"] = False
    edge["smooth"] = not straight_cables

    if draw_termination_labels is True:
        edge["drawTerminationLabel"] = True
        edge["cable_a_name"] = cable_a_name
        edge["cable_b_name"] = cable_b_name


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
    user,
    show_unconnected: bool,
    ignore_cable_type: list,
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
    group_virtualchassis: bool,
    group_id,
    straight_cables: bool,
    draw_termination_labels: bool,
    draw_cable_labels: bool,
    grid_size: int,
    node_label_items: list,
):

    supported_termination_types = []
    for t in IndividualOptions.CHOICES:
        supported_termination_types.append(t[1])

    device_rows = list(queryset.values_list("pk", "site_id"))
    if not device_rows:
        return None

    nodes_devices = {}
    edges = []
    nodes = []
    options = {}
    edge_ids = 0
    nodes_circuits: Dict[int, Circuit] = {}
    nodes_powerpanel: Dict[int, PowerPanel] = {}
    nodes_powerfeed: Dict[int, PowerFeed] = {}
    cable_ids = DefaultDict(dict)
    interface_ids = DefaultDict(dict)
    coordinates = get_coordinates(get_coordinate_group(group_id, user))
    image_resolver = get_image_resolver()

    device_ids = {pk for pk, _ in device_rows}
    site_ids = {site_id for _, site_id in device_rows}
    visible_devices = Device.objects.restrict(user, 'view')
    visible_cables = Cable.objects.restrict(user, 'view')
    visible_interfaces = Interface.objects.restrict(user, 'view')

    if show_neighbors:
        origins = set(
            CableTermination.objects.filter(
                Q(_device_id__in=device_ids)
                & restrict_terminations(user, ("interface", "frontport", "rearport"), device_ids)
            ).order_by().values_list("cable_id", "cable_end")
        )
        neighbor_ids = {
            peer_device_id
            for cable_id, cable_end, peer_device_id in CableTermination.objects.filter(
                cable_id__in={cable_id for cable_id, _ in origins}, _device_id__isnull=False
            ).order_by().values_list("cable_id", "cable_end", "_device_id")
            if (cable_id, cable_end) not in origins
        }

        if show_logical_connections:
            path_complete_interfaces = visible_interfaces.filter(
                Q(_path__is_complete=True) & Q(device_id__in=device_ids)
            ).order_by().values_list("pk", "_path__path")
            destination_ids = {pk for ids in get_path_destination_ids(path_complete_interfaces).values() for pk in ids}
            neighbor_ids.update(
                visible_interfaces.filter(pk__in=destination_ids).order_by().values_list("device_id", flat=True)
            )

        device_ids.update(visible_devices.filter(pk__in=neighbor_ids).exclude(pk__in=device_ids).values_list('pk', flat=True))

    if show_circuit:
        visible_circuit_terminations = CircuitTermination.objects.restrict(user, 'view').filter(
            circuit__in=Circuit.objects.restrict(user, 'view')
        )
        circuit_ids = visible_circuit_terminations.filter(
            Q(_site_id__in=site_ids)
            | Q(cable__in=visible_cables.filter(terminations___device__in=device_ids))
        ).values("circuit_id")
        circuit_terminations = list(visible_circuit_terminations.filter(
            Q(circuit_id__in=circuit_ids)
            & (Q(cable__isnull=True) | Q(cable__in=visible_cables))
        ).select_related(
            "circuit__provider", "circuit__type", "cable"
        ).prefetch_related("cable__terminations__termination"))
        circuit_termination_ids = {circuit_termination.pk for circuit_termination in circuit_terminations}
        visible_device_ends = set(
            CableTermination.objects.filter(
                Q(cable_id__in={circuit_termination.cable_id for circuit_termination in circuit_terminations})
                & restrict_terminations(user, ("interface", "frontport", "rearport"), device_ids)
            ).order_by().values_list("termination_type_id", "termination_id")
        )

        def is_visible_end(termination):
            if isinstance(termination, CircuitTermination):
                return termination.pk in circuit_termination_ids
            return (
                termination.device_id in device_ids
                and (ContentType.objects.get_for_model(termination).pk, termination.pk) in visible_device_ends
            )

        circuit_cable_ids = set()
        circuit_links = []
        for circuit_termination in circuit_terminations:
            circuit_termination: CircuitTermination
            if show_unconnected:
                nodes_circuits[circuit_termination.circuit_id] = circuit_termination.circuit

            cable = circuit_termination.cable
            if cable is None or cable.pk in circuit_cable_ids or not cable.a_terminations or not cable.b_terminations:
                continue
            circuit_cable_ids.add(cable.pk)

            ends = (cable.a_terminations[0], cable.b_terminations[0])
            termination_a, termination_b = map(create_circuit_termination, ends)
            device_ends = [t for t in ends if not isinstance(t, CircuitTermination)]
            if not termination_a or not termination_b or not all(map(is_visible_end, ends)):
                continue

            for termination in device_ends:
                nodes_devices[termination.device_id] = termination.device
            if device_ends:
                nodes_circuits[circuit_termination.circuit_id] = circuit_termination.circuit
            circuit_links.append((circuit_termination, ends, termination_a, termination_b))

        # Circuit-to-circuit cables are only drawn once both circuits are part of the topology
        for circuit_termination, ends, termination_a, termination_b in circuit_links:
            if any(isinstance(t, CircuitTermination) and t.circuit_id not in nodes_circuits for t in ends):
                continue
            edge_ids += 1
            edges.append(
                create_edge(
                    edge_id=edge_ids,
                    cable=circuit_termination.cable,
                    circuit={"provider_name": circuit_termination.circuit.provider.name},
                    termination_a=termination_a,
                    termination_b=termination_b,
                    straight_cables=straight_cables,
                    draw_termination_labels=draw_termination_labels,
                    draw_cable_labels=draw_cable_labels,
                )
            )

        for d in nodes_circuits.values():
            nodes.append(create_node(d, node_label_items, coordinates, image_resolver))

    if show_power:
        power_feeds = list(PowerFeed.objects.restrict(user, 'view').filter(
            Q(power_panel__in=PowerPanel.objects.restrict(user, 'view'))
            & (
                Q(power_panel__site_id__in=site_ids)
                | Q(cable__in=visible_cables.filter(terminations___device__in=device_ids))
            )
        ).select_related("power_panel__site", "power_panel__location"))
        power_cable_ids = {power_feed.cable_id for power_feed in power_feeds if power_feed.cable_id}
        visible_power_cable_ids = set(
            visible_cables.filter(pk__in=power_cable_ids).values_list('pk', flat=True)
        )
        power_feed_peers = {
            link.cable_id: link.termination
            for link in CableTermination.objects.filter(
                Q(cable_id__in=visible_power_cable_ids) & restrict_terminations(user, ("powerport",), device_ids)
            ).order_by().prefetch_related("termination")
        }

        for power_feed in power_feeds:
            power_link_name = ""
            if not show_unconnected:
                link_peer = power_feed_peers.get(power_feed.cable_id)
                if link_peer is None or link_peer.device_id not in device_ids:
                    continue
                power_link_name = link_peer.name

            nodes_powerpanel[power_feed.power_panel_id] = power_feed.power_panel
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
                    straight_cables=straight_cables,
                    draw_termination_labels=draw_termination_labels,
                    draw_cable_labels=draw_cable_labels,
                )
            )

            if power_feed.cable_id in visible_power_cable_ids:
                cable_ids[power_feed.cable_id][power_feed.cable_end] = termination_b

        for d in nodes_powerfeed.values():
            nodes.append(create_node(d, node_label_items, coordinates, image_resolver))

        for d in nodes_powerpanel.values():
            nodes.append(create_node(d, node_label_items, coordinates, image_resolver))

    if show_logical_connections:
        path_complete_interfaces = visible_interfaces.filter(
            Q(_path__is_complete=True) & Q(device_id__in=device_ids)
        )
        path_destinations = get_path_destinations(path_complete_interfaces.values_list("pk", "_path__path"), user)
        interfaces = list(path_complete_interfaces.select_related("device"))

        for interface in interfaces:
            for destination in path_destinations[interface.pk]:
                if destination.device_id not in device_ids:
                    continue

                if destination.id in interface_ids:
                    # we've already captured the destination interface, ignore this connection
                    # print('Destination interface already exists, ignoring')
                    continue

                same_cable = interface.cable_id is not None and interface.cable_id == destination.cable_id
                same_wireless_link = (
                    interface.wireless_link_id is not None and interface.wireless_link_id == destination.wireless_link_id
                )
                if not show_single_cable_logical_conns and (same_cable and show_cables or same_wireless_link and show_wireless):
                    # interface connection is the same as the cable or wireless connection, ignore this connection
                    continue
        
                interface_ids[interface.id]=interface
                edge_ids += 1
                termination_a = { "termination_name": interface.name, "termination_device_name": interface.device.name, "device_id": interface.device.id }
                termination_b = { "termination_name": destination.name, "termination_device_name": destination.device.name, "device_id": destination.device.id }
                edges.append(create_edge(edge_id=edge_ids, termination_a=termination_a, termination_b=termination_b, interface=interface, straight_cables=straight_cables, draw_termination_labels=draw_termination_labels, draw_cable_labels=draw_cable_labels))
                nodes_devices[interface.device.id] = interface.device
                nodes_devices[destination.device.id] = destination.device

    if show_cables:
        cable_device_pairs = set()
        links: QuerySet[CableTermination] = CableTermination.objects.filter(
            Q(_device_id__in=device_ids) & Q(cable__in=visible_cables)
            & restrict_terminations(user, supported_termination_types, device_ids)
        ).select_related("cable").prefetch_related("termination__device")

        for link in links:
            termination_model = ContentType.objects.get_for_id(link.termination_type_id).model
            if termination_model in ignore_cable_type:
                continue

            # Normal device cables
            if termination_model in supported_termination_types:
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
                cable_ids[link.cable_id][link.cable_end] = link

                if complete_link:
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

                    device_pair = (link.cable_id, termination_a["device_id"], termination_b["device_id"])
                    if device_pair in cable_device_pairs:
                        continue
                    cable_device_pairs.add(device_pair)
                    edge_ids += 1
                    edges.append(
                        create_edge(
                            edge_id=edge_ids,
                            cable=link.cable,
                            termination_a=termination_a,
                            termination_b=termination_b,
                            straight_cables=straight_cables,
                            draw_termination_labels=draw_termination_labels,
                            draw_cable_labels=draw_cable_labels,
                        )
                    )

    if show_wireless:
        wlan_links: QuerySet[WirelessLink] = WirelessLink.objects.restrict(user, 'view').filter(
            Q(_interface_a_device_id__in=device_ids)
            & Q(_interface_b_device_id__in=device_ids)
        ).select_related("interface_a__device", "interface_b__device")

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
                    straight_cables=straight_cables,
                    draw_termination_labels=draw_termination_labels,
                    draw_cable_labels=draw_cable_labels,
                )
            )

    if group_locations:
        options['group_locations'] = 'on'
    if group_racks:
        options['group_racks'] = 'on'
    if group_sites:
        options['group_sites'] = 'on'
    if group_virtualchassis:
        options['group_virtualchassis'] = 'on'
    options['grid_size'] = grid_size

    for pk, _ in device_rows:
        if pk not in nodes_devices and show_unconnected:
            nodes_devices[pk] = None

    results = {}

    devices = Device.objects.select_related(*NODE_DEVICE_RELATIONS).in_bulk(nodes_devices.keys())
    for pk in nodes_devices:
        nodes.append(create_node(devices[pk], node_label_items, coordinates, image_resolver))

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
        self.queryset = Device.objects.restrict(request.user, 'view').select_related(
            "device_type", "role"
        )
        filterset = self.filterset(request.GET, self.queryset, request=request)
        self.queryset = filterset.qs
        self.model = self.queryset.model
        topo_data = None

        if request.GET:
            # filterset.data includes the parameters of any selected saved filters
            query_settings = get_query_settings(request, filterset.data, notify_user=True)
            filter_required = True
            empty_result = False

            if filterset.data.get("draw_init", "true").lower() == "true":
                filter_required = False

                topo_data = get_topology_data(self.queryset, request.user, **query_settings)

                if topo_data is None or not topo_data["nodes"]:
                    empty_result = True
            
        else:
            # No GET-Request in URL. We most likely came here from the navigation menu.
            q = QueryDict(mutable=True)
            if not request.user.is_authenticated:
                q['draw_init'] = "False"
                return HttpResponseRedirect(f"{reverse('plugins:netbox_topology_views:home')}?{q.urlencode()}")

            individualOptions, created = IndividualOptions.objects.get_or_create(
                user=request.user,
            )
            q.setlist("role_id", list(individualOptions.preselected_device_roles.values_list('id', flat=True)))
            q.setlist("tag", list(individualOptions.preselected_tags.values_list('slug', flat=True)))
            q.setlist("ignore_cable_type", individualOptions.ignore_cable_type)

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
            if individualOptions.group_virtualchassis: q['group_virtualchassis'] = "True"
            if individualOptions.straight_cables: q['straight_cables'] = "True"
            if individualOptions.draw_termination_labels: q['draw_termination_labels'] = "True"
            if individualOptions.draw_cable_labels: q['draw_cable_labels'] = "True"
            if individualOptions.grid_size: q['grid_size'] = individualOptions.grid_size
            q.setlist("node_label_items", individualOptions.node_label_items)

            if individualOptions.draw_default_layout: 
                q['draw_init'] = "True"
            else:
                q['draw_init'] = "False"

            query_string = q.urlencode()
            return HttpResponseRedirect(f"{reverse('plugins:netbox_topology_views:home')}?{query_string}")

        return render(
            request,
            "netbox_topology_views/index.html",
            {
                "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
                "topology_data": topo_data,
                "broken_image": find_image_url("role-unknown"),
                "model": self.model,
                "basepath": settings.BASE_PATH,
                "filter_required": filter_required,
                "empty_result": empty_result,
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
        images = []
        if CONF_IMAGE_DIR.is_dir():
            images = [
                {"url": image_static_url(image), "title": image.stem}
                for image in CONF_IMAGE_DIR.iterdir() if image.suffix.lstrip(".").lower() in IMAGE_FILETYPES
            ]
        else:
            messages.warning(request, "The configured image directory does not exist")

        roles = {
            role.pk: {
                "id": role.pk,
                "name": role.name,
                "slug": role.slug,
                "image": find_image_url(role.slug),
            }
            for role in DeviceRole.objects.restrict(request.user, 'view')
        }

        for additional_role in ADDITIONAL_ROLES:
            cur = get_model_role(additional_role)
            ct = ContentType.objects.get_for_model(additional_role).pk

            roles[f"ct{ct}"] = {
                "id": f"ct{ct}",
                "name": cur.name,
                "slug": cur.slug,
                "image": find_image_url(cur.slug),
            }

        role_images = RoleImage.objects.all()

        for role_image in role_images:
            key = role_image.object_id if role_image.object_id is not None else f"ct{role_image.content_type_id}"
            if (role := roles.get(key)) is not None:
                role["image"] = role_image.get_image_url()

        return render(
            request,
            "netbox_topology_views/images.html",
            {
                "roles": sorted(roles.values(), key=lambda r: (r["name"], str(r["id"]))),
                "images": images,
                "basepath": settings.BASE_PATH,
            },
        )

class CircuitCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_circuitcoordinate'

    queryset = CircuitCoordinate.objects.all()

class CircuitCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_circuitcoordinate'

    queryset = CircuitCoordinate.objects.all()
    form = CircuitCoordinatesForm
    template_name = 'netbox_topology_views/circuitcoordinate_add.html'

class CircuitCoordinateBulkImportView(BulkImportView):
    queryset = CircuitCoordinate.objects.all()
    model_form = CircuitCoordinatesImportForm

class CircuitCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_circuitcoordinate'

    queryset = CircuitCoordinate.objects.all()
    table = CircuitCoordinateListTable
    template_name = 'netbox_topology_views/circuitcoordinate_list.html'
    filterset = CircuitCoordinatesFilterSet
    filterset_form = CircuitCoordinatesFilterForm

class CircuitCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_circuitcoordinate'

    queryset = CircuitCoordinate.objects.all()
    form = CircuitCoordinatesForm
    template_name = 'netbox_topology_views/circuitcoordinate_edit.html'

class CircuitCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_circuitcoordinate'

    queryset = CircuitCoordinate.objects.all()

class PowerPanelCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_powerpanelcoordinate'

    queryset = PowerPanelCoordinate.objects.all()

class PowerPanelCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_powerpanelcoordinate'

    queryset = PowerPanelCoordinate.objects.all()
    form = PowerPanelCoordinatesForm
    template_name = 'netbox_topology_views/powerpanelcoordinate_add.html'

class PowerPanelCoordinateBulkImportView(BulkImportView):
    queryset = PowerPanelCoordinate.objects.all()
    model_form = PowerPanelCoordinatesImportForm

class PowerPanelCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_powerpanelcoordinate'

    queryset = PowerPanelCoordinate.objects.all()
    table = PowerPanelCoordinateListTable
    template_name = 'netbox_topology_views/powerpanelcoordinate_list.html'
    filterset = PowerPanelCoordinatesFilterSet
    filterset_form = PowerPanelCoordinatesFilterForm

class PowerPanelCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_powerpanelcoordinate'

    queryset = PowerPanelCoordinate.objects.all()
    form = PowerPanelCoordinatesForm
    template_name = 'netbox_topology_views/powerpanelcoordinate_edit.html'

class PowerPanelCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_powerpanelcoordinate'

    queryset = PowerPanelCoordinate.objects.all()

class PowerFeedCoordinateView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_powerfeedcoordinate'

    queryset = PowerFeedCoordinate.objects.all()

class PowerFeedCoordinateAddView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.add_powerfeedcoordinate'

    queryset = PowerFeedCoordinate.objects.all()
    form = PowerFeedCoordinatesForm
    template_name = 'netbox_topology_views/powerfeedcoordinate_add.html'

class PowerFeedCoordinateBulkImportView(BulkImportView):
    queryset = PowerFeedCoordinate.objects.all()
    model_form = PowerFeedCoordinatesImportForm

class PowerFeedCoordinateListView(PermissionRequiredMixin, ObjectListView):
    permission_required = 'netbox_topology_views.view_powerfeedcoordinate'

    queryset = PowerFeedCoordinate.objects.all()
    table = PowerFeedCoordinateListTable
    template_name = 'netbox_topology_views/powerfeedcoordinate_list.html'
    filterset = PowerFeedCoordinatesFilterSet
    filterset_form = PowerFeedCoordinatesFilterForm

class PowerFeedCoordinateEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_powerfeedcoordinate'

    queryset = PowerFeedCoordinate.objects.all()
    form = PowerFeedCoordinatesForm
    template_name = 'netbox_topology_views/powerfeedcoordinate_edit.html'

class PowerFeedCoordinateDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_powerfeedcoordinate'

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

class CoordinateGroupView(PermissionRequiredMixin, ObjectView):
    permission_required = 'netbox_topology_views.view_coordinategroup'

    queryset = CoordinateGroup.objects.all()

    def get_extra_context(self, request, instance):
        circuittable = CircuitCoordinateListTable(instance.circuitcoordinate_set.restrict(request.user, 'view'))
        circuittable.configure(request)
        powerpaneltable = PowerPanelCoordinateListTable(instance.powerpanelcoordinate_set.restrict(request.user, 'view'))
        powerpaneltable.configure(request)
        powerfeedtable = PowerFeedCoordinateListTable(instance.powerfeedcoordinate_set.restrict(request.user, 'view'))
        powerfeedtable.configure(request)
        table = CoordinateListTable(instance.coordinate_set.restrict(request.user, 'view'))
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
    filterset = CoordinateGroupFilterSet

class CoordinateGroupEditView(PermissionRequiredMixin, ObjectEditView):
    permission_required = 'netbox_topology_views.change_coordinategroup'

    queryset = CoordinateGroup.objects.all()
    form = CoordinateGroupsForm
    template_name = 'netbox_topology_views/coordinategroup_edit.html'

class CoordinateGroupDeleteView(PermissionRequiredMixin, ObjectDeleteView):
    permission_required = 'netbox_topology_views.delete_coordinategroup'

    queryset = CoordinateGroup.objects.all()

class TopologyIndividualOptionsView(PermissionRequiredMixin, View):
    permission_required = 'netbox_topology_views.change_individualoptions'

    def post(self, request):
        instance, created = IndividualOptions.objects.get_or_create(user=request.user)
        form = IndividualOptionsForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Options have been sucessfully saved")
        else:
            messages.error(request, form.errors)
            
        return HttpResponseRedirect("./")

    def get(self, request):
        queryset, created = IndividualOptions.objects.get_or_create(
            user=request.user,
        )

        form = IndividualOptionsForm(
            initial={
                'ignore_cable_type': queryset.ignore_cable_type,
                'preselected_device_roles': queryset.preselected_device_roles.all(),
                'preselected_tags': queryset.preselected_tags.all(),
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
                'group_virtualchassis': queryset.group_virtualchassis,
                'draw_default_layout': queryset.draw_default_layout,
                'straight_cables': queryset.straight_cables,
                'draw_termination_labels': queryset.draw_termination_labels,
                'draw_cable_labels': queryset.draw_cable_labels,
                'grid_size': queryset.grid_size,
                'node_label_items': queryset.node_label_items,
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
