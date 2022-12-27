import json
from functools import reduce
from typing import DefaultDict, Dict, Optional, Union
import time

from utilities.htmx import is_htmx
from circuits.models import Circuit, CircuitTermination
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
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q, QuerySet
from django.http import HttpRequest, HttpResponseRedirect, QueryDict
from django.shortcuts import render
from django.views.generic import View
from extras.models import Tag
from wireless.models import WirelessLink

from netbox_topology_views.filters import DeviceFilterSet
from netbox_topology_views.forms import DeviceFilterForm
from netbox_topology_views.models import RoleImage
from netbox_topology_views.utils import (
    CONF_IMAGE_DIR,
    find_image_url,
    get_model_role,
    get_model_slug,
    image_static_url,
)

supported_termination_types = [
    "interface",
    "front port",
    "rear port",
    "power outlet",
    "power port",
    "console port",
    "console server port",
]


def get_image_for_entity(entity: Union[Device, Circuit, PowerPanel, PowerFeed]):
    is_device = isinstance(entity, Device)
    query = (
        {"object_id": entity.device_role_id}
        if is_device
        else {"content_type_id": ContentType.objects.get_for_model(entity).pk}
    )

    try:
        return RoleImage.objects.get(**query).get_image_url()
    except RoleImage.DoesNotExist:
        return find_image_url(
            entity.device_role.slug if is_device else get_model_slug(entity.__class__)
        )


def create_node(
    device: Union[Device, Circuit, PowerPanel, PowerFeed], save_coords: bool
):
    node = {}
    node_content = ""
    if isinstance(device, Circuit):
        dev_name = f"Circuit {device.cid}"
        node["id"] = f"c{device.pk}"

        if device.provider is not None:
            node_content += (
                f"<tr><th>Provider: </th><td>{device.provider.name}</td></tr>"
            )
        if device.type is not None:
            node_content += f"<tr><th>Type: </th><td>{device.type.name}</td></tr>"
    elif isinstance(device, PowerPanel):
        dev_name = f"Power Panel {device.pk}"
        node["id"] = f"p{device.pk}"

        if device.site is not None:
            node_content += f"<tr><th>Site: </th><td>{device.site.name}</td></tr>"
        if device.location is not None:
            node_content += (
                f"<tr><th>Location: </th><td>{device.location.name}</td></tr>"
            )
    elif isinstance(device, PowerFeed):
        dev_name = f"Power Feed {device.pk}"
        node["id"] = f"f{device.pk}"

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
        dev_name = device.name
        if dev_name is None:
            dev_name = "device name unknown"

        if device.device_type is not None:
            node_content += (
                f"<tr><th>Type: </th><td>{device.device_type.model}</td></tr>"
            )
        if device.device_role.name is not None:
            node_content += (
                f"<tr><th>Role: </th><td>{device.device_role.name}</td></tr>"
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

        if device.device_role.color != "":
            node["color.border"] = "#" + device.device_role.color

    dev_title = "<table><tbody> %s</tbody></table>" % (node_content)

    node["title"] = dev_title
    node["name"] = dev_name
    node["label"] = dev_name
    node["shape"] = "image"
    node["href"] = device.get_absolute_url()
    node["image"] = get_image_for_entity(device)

    node["physics"] = True
    if "coordinates" in device.custom_field_data:
        if device.custom_field_data["coordinates"] is not None:
            if ";" in device.custom_field_data["coordinates"]:
                cords = device.custom_field_data["coordinates"].split(";")
                node["x"] = int(cords[0])
                node["y"] = int(cords[1])
                node["physics"] = False
        elif save_coords:
            node["physics"] = False
    return node


def create_edge(
    edge_id: int,
    termination_a: Dict,
    termination_b: Dict,
    circuit: Optional[Dict] = None,
    cable: Optional[Cable] = None,
    wireless: Optional[Dict] = None,
    power: Optional[bool] = None,
    interface: Optional[bool] = None,
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
    title = "Cable"

    if circuit is not None:
        edge["dashes"] = True
        title = f"Circuit provider: {circuit['provider_name']}<br>Termination"

    elif wireless is not None:
        edge["dashes"] = [2, 10, 2, 10]
        title = "Wireless Connection"

    elif power is not None:
        edge["dashes"] = [5, 5, 3, 3]
        title = "Power Connection"

    elif interface is not None:
        title = "Interface Connection"
        edge["width"] = 3
        edge["dashes"] = [1, 10, 1, 10]
        edge["arrows"] = {"to": {"enabled": True, "scaleFactor": 0.5}, "from": {"enabled": True, "scaleFactor": 0.5}}
        edge["color"] = '#f1c232'
        
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
    hide_unconnected: bool,
    save_coords: bool,
    show_cables: bool,
    show_circuit: bool,
    show_logical_connections: bool,
    show_power: bool,
    show_wireless: bool,
):
    if not queryset:
        return None

    nodes_devices = {}
    edges = []
    nodes = []
    edge_ids = 0
    nodes_circuits: Dict[int, Circuit] = {}
    nodes_powerpanel: Dict[int, PowerPanel] = {}
    nodes_powerfeed: Dict[int, PowerFeed] = {}
    nodes_provider_networks = {}
    cable_ids = DefaultDict(dict)
    interface_ids = DefaultDict(dict)
    ignore_cable_type = settings.PLUGINS_CONFIG["netbox_topology_views"][
        "ignore_cable_type"
    ]
    hide_single_cable_logical_conns = bool(
        settings.PLUGINS_CONFIG["netbox_topology_views"][
            "hide_single_cable_logical_conns"
        ]
    )

    device_ids = [d.pk for d in queryset]
    site_ids = [d.site_id for d in queryset]

    if show_circuit:
        circuit_terminations = CircuitTermination.objects.filter(
            Q(site_id__in=site_ids) | Q(provider_network__isnull=False)
        ).prefetch_related("provider_network", "circuit")
        for circuit_termination in circuit_terminations:
            circuit_termination: CircuitTermination
            if (
                not hide_unconnected
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

                if circuit_has_connections and hide_unconnected:
                    if circuit_termination.circuit_id not in nodes_circuits:
                        nodes_circuits[
                            circuit_termination.circuit.pk
                        ] = circuit_termination.circuit

        for d in nodes_circuits.values():
            nodes.append(create_node(d, save_coords))

    if show_power:
        power_panels_ids = PowerPanel.objects.filter(
            Q(site_id__in=site_ids)
        ).values_list("pk", flat=True)
        power_feeds: QuerySet[PowerFeed] = PowerFeed.objects.filter(
            Q(power_panel_id__in=power_panels_ids)
        )

        for power_feed in power_feeds:
            if not hide_unconnected or (
                hide_unconnected and power_feed.cable_id is not None
            ):
                if power_feed.power_panel_id not in nodes_powerpanel:
                    nodes_powerpanel[power_feed.power_panel.pk] = power_feed.power_panel

                power_link_name = ""
                if power_feed.pk not in nodes_powerfeed:
                    if hide_unconnected:
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
            nodes.append(create_node(d, save_coords))

        for d in nodes_powerpanel.values():
            nodes.append(create_node(d, save_coords))

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

                    if hide_single_cable_logical_conns and interface.cable_id==destination.cable_id and show_cables:
                        # interface connection is the same as the cable connection, ignore this connection
                        continue
            
                    interface_ids[interface.id]=interface
                    edge_ids += 1
                    termination_a = { "termination_name": interface.name, "termination_device_name": interface.device.name, "device_id": interface.device.id }
                    termination_b = { "termination_name": destination.name, "termination_device_name": destination.device.name, "device_id": destination.device.id }
                    edges.append(create_edge(edge_id=edge_ids, termination_a=termination_a, termination_b=termination_b, interface=True))
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

    for qs_device in queryset:
        if qs_device.pk not in nodes_devices and not hide_unconnected:
            nodes_devices[qs_device.pk] = qs_device

    results = {}

    for d in nodes_devices.values():
        nodes.append(create_node(d, save_coords))

    results["nodes"] = nodes
    results["edges"] = edges
    return results


class TopologyHomeView(PermissionRequiredMixin, View):
    permission_required = ("dcim.view_site", "dcim.view_device")

    """
    Show the home page
    """

    def get(self, request):
        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.all().select_related(
            "device_type", "device_role"
        )
        self.queryset = self.filterset(request.GET, self.queryset).qs
        self.model = self.queryset.model
        topo_data = None

        if request.GET:
            save_coords = False
            if "save_coords" in request.GET:
                if request.GET["save_coords"] == "on":
                    save_coords = True

            hide_unconnected = False
            if "hide_unconnected" in request.GET:
                if request.GET["hide_unconnected"] == "on":
                    hide_unconnected = True

            show_power = False
            if "show_power" in request.GET:
                if request.GET["show_power"] == "on":
                    show_power = True

            show_circuit = False
            if "show_circuit" in request.GET:
                if request.GET["show_circuit"] == "on":
                    show_circuit = True

            show_logical_connections = False
            if "show_logical_connections" in request.GET:
                if request.GET["show_logical_connections"] == "on" :
                    show_logical_connections = True

            show_cables = False
            if "show_cables" in request.GET:
                if request.GET["show_cables"] == "on" :
                    show_cables = True

            show_wireless = False
            if "show_wireless" in request.GET:
                if request.GET["show_wireless"] == "on" :
                    show_wireless = True

            if "draw_init" in request.GET:
                if request.GET["draw_init"].lower() == "true":
                    topo_data = get_topology_data(
                        self.queryset,
                        hide_unconnected,
                        save_coords,
                        show_cables,
                        show_circuit,
                        show_logical_connections,
                        show_power,
                        show_wireless,
                    )
            else:
                topo_data = get_topology_data(
                    self.queryset,
                    hide_unconnected,
                    save_coords,
                    show_cables,
                    show_circuit,
                    show_logical_connections,
                    show_power,
                    show_wireless,
                )
        else:
            preselected_device_roles = settings.PLUGINS_CONFIG["netbox_topology_views"][
                "preselected_device_roles"
            ]
            preselected_tags = settings.PLUGINS_CONFIG["netbox_topology_views"][
                "preselected_tags"
            ]
            always_save_coordinates = bool(
                settings.PLUGINS_CONFIG["netbox_topology_views"][
                    "always_save_coordinates"
                ]
            )

            q_device_role_id = DeviceRole.objects.filter(
                name__in=preselected_device_roles
            ).values_list("id", flat=True)
            q_tags = Tag.objects.filter(name__in=preselected_tags).values_list(
                "name", flat=True
            )

            q = QueryDict(mutable=True)
            q.setlist("device_role_id", list(q_device_role_id))
            q.setlist("tag", list(q_tags))
            q["draw_init"] = settings.PLUGINS_CONFIG["netbox_topology_views"][
                "draw_default_layout"
            ]
            if always_save_coordinates:
                q["save_coords"] = "on"
            query_string = q.urlencode()
            return HttpResponseRedirect(f"{request.path}?{query_string}")

        if is_htmx(request): 
            return render(
                request,
                "netbox_topology_views/htmx_topology.html",
                {
                    "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
                    "topology_data": json.dumps(topo_data),
                    "broken_image": find_image_url("role-unknown"),
                    "epoch": int(time.time()),
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
            },
        )


CONFIG = settings.PLUGINS_CONFIG["netbox_topology_views"]
ADDITIONAL_ROLES = (PowerPanel, PowerFeed, Circuit)


class TopologyImagesView(PermissionRequiredMixin, View):
    permission_required = (
        "dcim.view_site",
        "dcim.view_device_role",
        "dcim.add_device_role",
        "dcim.change_device_role",
    )

    def get(self, request: HttpRequest):
        images = [
            {"url": image_static_url(image), "title": image.stem}
            for image in CONF_IMAGE_DIR.iterdir()
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
            },
        )
