from platform import node
from django.shortcuts import get_object_or_404, render
from django.db.models import Q
from django.views.generic import View
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.conf import settings
from django.http import QueryDict
from django.http import HttpResponseRedirect


from .forms import DeviceFilterForm
from .filters import DeviceFilterSet

import json

from dcim.models import Device, Cable, CableTermination, DeviceRole, PathEndpoint, Interface, FrontPort, RearPort, PowerPanel,  PowerFeed
from circuits.models import CircuitTermination, ProviderNetwork
from wireless.models import WirelessLink
from extras.models import Tag

supported_termination_types = ["interface", "front port", "rear port", "power outlet", "power port"]

def create_node(device, save_coords, circuit = None, powerpanel = None, powerfeed= None):

    node = {}
    node_content = ""
    if circuit:
        dev_name = "Circuit " + str(device.cid)
        node["image"] = "../../static/netbox_topology_views/img/circuit.png"
        node["id"] = "c{}".format(device.id)

        if device.provider is not None:
            node_content += "<tr><th>Provider: </th><td>" + device.provider.name + "</td></tr>"
        if device.type is not None:
            node_content += "<tr><th>Type: </th><td>" + device.type.name + "</td></tr>"
    elif powerpanel:
        dev_name = "Power Panel " + str(device.id)
        node["image"] = "../../static/netbox_topology_views/img/power-panel.png"
        node["id"] = "p{}".format(device.id)

        if device.site is not None:
            node_content += "<tr><th>Site: </th><td>" + device.site.name + "</td></tr>"
        if device.location is not None:
            node_content += "<tr><th>Location: </th><td>" + device.location.name + "</td></tr>"
    elif powerfeed:
        dev_name = "Power Feed " + str(device.id)
        node["image"] = "../../static/netbox_topology_views/img/power-feed.png"
        node["id"] = "f{}".format(device.id)

        if device.power_panel is not None:
            node_content += "<tr><th>Power Panel: </th><td>" + device.power_panel.name + "</td></tr>"
        if device.type is not None:
            node_content += "<tr><th>Type: </th><td>" + device.type + "</td></tr>"
        if device.supply is not None:
            node_content += "<tr><th>Supply: </th><td>" + device.supply + "</td></tr>"
        if device.phase is not None:
            node_content += "<tr><th>Phase: </th><td>" + device.phase + "</td></tr>"
        if device.amperage is not None:
            node_content += "<tr><th>Amperage: </th><td>" + str(device.amperage )+ "</td></tr>"
        if device.voltage is not None:
            node_content += "<tr><th>Voltage: </th><td>" + str(device.voltage) + "</td></tr>"
    else:
        dev_name = device.name
        if dev_name is None:
            dev_name = "device name unknown"

        if device.device_type is not None:
            node_content += "<tr><th>Type: </th><td>" + device.device_type.model + "</td></tr>"
        if device.device_role.name is not None:
            node_content +=  "<tr><th>Role: </th><td>" + device.device_role.name + "</td></tr>"
        if device.serial != "":
            node_content += "<tr><th>Serial: </th><td>" + device.serial + "</td></tr>"
        if device.primary_ip is not None:
            node_content += "<tr><th>IP Address: </th><td>" + str(device.primary_ip.address) + "</td></tr>"
        if device.site is not None:
            node_content += "<tr><th>Site: </th><td>" + device.site.name + "</td></tr>"
        if device.location is not None:
            node_content += "<tr><th>Location: </th><td>" + device.location.name + "</td></tr>"
        if device.rack is not None:
            node_content += "<tr><th>Rack: </th><td>" + device.rack.name + "</td></tr>"
        if device.position is not None:
            if device.face is not None:
                node_content += "<tr><th>Position: </th><td> {} ({}) </td></tr>".format(device.position, device.face)
            else:
                node_content += "<tr><th>Position: </th><td>" + device.position + "</td></tr>"

        node["id"] = device.id
        
        if device.device_role.slug in settings.PLUGINS_CONFIG["netbox_topology_views"]["device_img"]:
            node["image"] = "../../static/netbox_topology_views/img/"  + device.device_role.slug + ".png"
        else:
            node["image"] = "../../static/netbox_topology_views/img/role-unknown.png"

        if device.device_role.color != "":
            node["color.border"] = "#" + device.device_role.color
    
    dev_title = "<table><tbody> %s</tbody></table>" % (node_content)

    node["title"] = dev_title
    node["name"] = dev_name
    node["label"] = dev_name
    node["shape"] = "image"

    node["physics"] = True        
    if "coordinates" in device.custom_field_data:
        if device.custom_field_data["coordinates"] is not None:
            if ";" in device.custom_field_data["coordinates"]:
                cords =  device.custom_field_data["coordinates"].split(";")
                node["x"] = int(cords[0])
                node["y"] = int(cords[1])
                node["physics"] = False
        else:
            if save_coords:
                node["physics"] = False
            else:
                node["physics"] = True
    return node

def create_edge(edge_id, termination_a, termination_b, circuit = None, cable = None, wireless = None, power=None):
    cable_a_name = "device A name unknown" if termination_a["termination_name"] is None else termination_a["termination_name"]
    cable_a_dev_name = "device A name unknown" if termination_a["termination_device_name"] is None else termination_a["termination_device_name"]
    cable_b_name= "device A name unknown" if termination_b["termination_name"] is None else termination_b["termination_name"]
    cable_b_dev_name  = "cable B name unknown" if termination_b["termination_device_name"] is None else termination_b["termination_device_name"]

    edge = {}
    edge["id"] = edge_id
    edge["from"] = termination_a["device_id"]
    edge["to"] = termination_b["device_id"]

    if circuit is not None:
        edge["dashes"] = True
        edge["title"] = "Circuit provider: "  + circuit["provider_name"] + "<br>"
        edge["title"] += "Termination between <br>"
        edge["title"] += cable_b_dev_name + " [" + cable_b_name +  "]<br>"
        edge["title"] += cable_a_dev_name + " [" + cable_a_name +  "]"
    elif wireless is not None:
        edge["dashes"] = [2, 10, 2, 10]
        edge["title"] = "Wireless Connection between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
    elif power is not None:
        edge["dashes"] = [5, 5, 3, 3] 
        edge["title"] = "Power Connection between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
    else:
        edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
    
    if cable is not None and cable.color != "":
        edge["color"] = "#" + cable.color
    
    return edge

def create_circuit_termination(termination):
    if isinstance(termination, CircuitTermination):
        return { "termination_name": termination.circuit.provider.name, "termination_device_name": termination.circuit.cid, "device_id": "c{}".format(termination.circuit.id) }
    if isinstance(termination, Interface) or isinstance(termination, FrontPort) or isinstance(termination, RearPort):
        return { "termination_name": termination.name, "termination_device_name": termination.device.name, "device_id": termination.device.id }
    return None

def get_topology_data(queryset, hide_unconnected, save_coords, show_circuit, show_power):
    nodes_devices = {}
    edges = []
    nodes = []
    edge_ids = 0
    nodes_circuits = {}
    nodes_powerpanel = {}
    nodes_powerfeed = {}
    nodes_provider_networks = {}
    cable_ids = {}
    if not queryset:
        return None

    ignore_cable_type = settings.PLUGINS_CONFIG["netbox_topology_views"]["ignore_cable_type"]

    device_ids = [d.id for d in queryset]

    if show_circuit:
        site_ids = [d.site.id for d in queryset]
        circuits = CircuitTermination.objects.filter( Q(site_id__in=site_ids) | Q( provider_network__isnull=False) ).prefetch_related("provider_network", "circuit")
        for circuit in circuits:
            if not hide_unconnected and circuit.circuit.id not in nodes_circuits:
                nodes_circuits[circuit.circuit.id] = circuit.circuit

            termination_a = {}
            termination_b = {}
            circuit_model = {}
            if circuit.cable is not None:
                termination_a = create_circuit_termination(circuit.cable.a_terminations[0])
                termination_b = create_circuit_termination(circuit.cable.b_terminations[0])
            elif circuit.provider_network is not None:
                if circuit.provider_network.id not in nodes_provider_networks:
                    nodes_provider_networks[circuit.provider_network.id] = circuit.provider_network

            if bool(termination_a) and bool(termination_b):
                circuit_model = {"provider_name": circuit.circuit.provider.name}
                edge_ids += 1
                edges.append(create_edge(edge_id=edge_ids,circuit=circuit_model, termination_a=termination_a, termination_b=termination_b))

                circuit_has_connections = False
                for termination in [circuit.cable.a_terminations[0], circuit.cable.b_terminations[0]]:
                    if not isinstance(termination, CircuitTermination):
                        if termination.device.id not in nodes_devices and termination.device.id in device_ids:
                            nodes_devices[termination.device.id] = termination.device
                            circuit_has_connections = True
                        else:
                            if termination.device.id in device_ids:
                                 circuit_has_connections = True
      
                if circuit_has_connections and hide_unconnected:
                    if circuit.circuit.id not in nodes_circuits:
                        nodes_circuits[circuit.circuit.id] = circuit.circuit

       
        for d in nodes_circuits.values():
            nodes.append(create_node(d, save_coords, circuit=True))

    links = CableTermination.objects.filter( Q(_device_id__in=device_ids) ).select_related("termination_type")
    wlan_links = WirelessLink.objects.filter( Q(_interface_a_device_id__in=device_ids) & Q(_interface_b_device_id__in=device_ids))
    
    if show_power:
        power_panels = PowerPanel.objects.filter( Q (site_id__in=site_ids))
        power_panels_ids = [d.id for d in power_panels]
        power_feeds = PowerFeed.objects.filter( Q (power_panel_id__in=power_panels_ids))
        
        for power_feed in power_feeds:
            if not hide_unconnected  or (hide_unconnected and power_feed.cable_id is not None):
                if power_feed.power_panel.id not in nodes_powerpanel:
                    nodes_powerpanel[power_feed.power_panel.id] = power_feed.power_panel

                if power_feed.id not in nodes_powerfeed:
                    if hide_unconnected:
                        if power_feed.link_peers[0].device.id in device_ids:
                            nodes_powerfeed[power_feed.id] = power_feed
                    else:
                        nodes_powerfeed[power_feed.id] = power_feed

                edge_ids += 1
                termination_a = { "termination_name": power_feed.power_panel.name, "termination_device_name": str(power_feed.power_panel.id), "device_id": "p{}".format(power_feed.power_panel.id) }
                termination_b = { "termination_name": power_feed.name, "termination_device_name": str(termination.id), "device_id": "f{}".format(power_feed.id) }
                edges.append(create_edge(edge_id=edge_ids, termination_a=termination_a, termination_b=termination_b, power=True))

                if power_feed.cable_id is not None:
                    if power_feed.cable.id not in cable_ids:
                        cable_ids[power_feed.cable.id] = {}
                    cable_ids[power_feed.cable.id][power_feed.cable_end] = termination_b
                
        
        for d in nodes_powerfeed.values():
            nodes.append(create_node(d, save_coords, powerfeed = True))
        
        for d in nodes_powerpanel.values():
            nodes.append(create_node(d, save_coords, powerpanel = True))        

    for link in links:
        if link.termination_type.name in ignore_cable_type :
            continue
        
        #Normal device cables
        if link.termination_type.name in supported_termination_types:
            complete_link = False
            if link.cable_end == "A":
                if link.cable.id not in cable_ids:
                    cable_ids[link.cable.id] = {}
                else:
                    if cable_ids[link.cable.id]['B'] is not None:
                        complete_link = True
            elif link.cable_end == "B":
                if link.cable.id not in cable_ids:
                    cable_ids[link.cable.id] = {}
                else:
                    if cable_ids[link.cable.id]['A'] is not None:
                        complete_link = True
            else:
                print("Unkown cable end")
            cable_ids[link.cable.id][link.cable_end] = link

            if complete_link:
                edge_ids += 1
                if isinstance(cable_ids[link.cable.id]["B"], CableTermination):
                    if cable_ids[link.cable.id]["B"]._device_id not in nodes_devices:
                        nodes_devices[cable_ids[link.cable.id]["B"]._device_id] = cable_ids[link.cable.id]["B"].termination.device
                    termination_b = { "termination_name": cable_ids[link.cable.id]["B"].termination.name, "termination_device_name": cable_ids[link.cable.id]["B"].termination.device.name, "device_id": cable_ids[link.cable.id]["B"].termination.device.id }
                else:
                    termination_b = cable_ids[link.cable.id]["B"]

                if isinstance(cable_ids[link.cable.id]["A"], CableTermination):
                    if cable_ids[link.cable.id]["A"]._device_id not in nodes_devices:
                        nodes_devices[cable_ids[link.cable.id]["A"]._device_id] = cable_ids[link.cable.id]["A"].termination.device
                    termination_a = { "termination_name": cable_ids[link.cable.id]["A"].termination.name, "termination_device_name": cable_ids[link.cable.id]["A"].termination.device.name, "device_id": cable_ids[link.cable.id]["A"].termination.device.id }
                else:
                    termination_a = cable_ids[link.cable.id]["A"]
               
                edges.append(create_edge(edge_id=edge_ids, cable=link.cable, termination_a=termination_a, termination_b=termination_b))
           
    for wlan_link in wlan_links:
        if wlan_link.interface_a.device.id not in nodes_devices:
                nodes_devices[wlan_link.interface_a.device.id] = wlan_link.interface_a.device
        if wlan_link.interface_b.device.id not in nodes_devices:
                nodes_devices[wlan_link.interface_b.device.id] = wlan_link.interface_b.device
        
        termination_a = {"termination_name": wlan_link.interface_a.name, "termination_device_name": wlan_link.interface_a.device.name, "device_id": wlan_link.interface_a.device.id}
        termination_b = {"termination_name": wlan_link.interface_b.name, "termination_device_name": wlan_link.interface_b.device.name, "device_id": wlan_link.interface_b.device.id}
        wireless = {"ssid": wlan_link.ssid }

        edge_ids += 1
        edges.append(create_edge(edge_id=edge_ids, termination_a=termination_a, termination_b=termination_b,wireless=wireless))

    for qs_device in queryset:
        if qs_device.id not in nodes_devices and not hide_unconnected:
            nodes_devices[qs_device.id] = qs_device

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
        self.queryset = Device.objects.all().select_related("device_type", "device_role")
        self.queryset = self.filterset(request.GET, self.queryset).qs
        topo_data = None

        if request.GET:
            save_coords = False
            if 'save_coords' in request.GET:
                if request.GET["save_coords"] == "on":
                    save_coords = True
                    
            hide_unconnected = False
            if "hide_unconnected" in request.GET:
                if request.GET["hide_unconnected"] == "on" :
                    hide_unconnected = True

            show_power = False
            if "show_power" in request.GET:
                if request.GET["show_power"] == "on" :
                    show_power = True

            show_circuit = False
            if "show_circuit" in request.GET:
                if request.GET["show_circuit"] == "on" :
                    show_circuit = True

            if "draw_init" in request.GET:
                if request.GET["draw_init"].lower() == "true":
                    topo_data = get_topology_data(self.queryset, hide_unconnected, save_coords, show_circuit, show_power)
            else:
                topo_data = get_topology_data(self.queryset, hide_unconnected, save_coords,  show_circuit, show_power)
        else:
            preselected_device_roles = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_device_roles"]
            preselected_tags = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_tags"]
            always_save_coordinates = bool(settings.PLUGINS_CONFIG["netbox_topology_views"]["always_save_coordinates"])

            q_device_role_id = DeviceRole.objects.filter(name__in=preselected_device_roles).values_list("id", flat=True)
            q_tags = Tag.objects.filter(name__in=preselected_tags).values_list("name", flat=True)

            q = QueryDict(mutable=True)
            q.setlist("device_role_id", list(q_device_role_id))
            q.setlist("tag", list(q_tags))
            q["draw_init"] = settings.PLUGINS_CONFIG["netbox_topology_views"]["draw_default_layout"]
            if always_save_coordinates:
                q["save_coords"] = "on"
            query_string = q.urlencode()
            return HttpResponseRedirect(request.path + "?" + query_string)

        return render(request, "netbox_topology_views/index.html" , {
             "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
             "topology_data": json.dumps(topo_data)
            }
        )
