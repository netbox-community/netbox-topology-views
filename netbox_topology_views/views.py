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

from dcim.models import Device, Cable, CableTermination, DeviceRole, PathEndpoint, Interface
from circuits.models import CircuitTermination, ProviderNetwork
from wireless.models import WirelessLink
from extras.models import Tag

supported_termination_types = ["interface", "front port", "rear port"]

def create_node(device, save_coords, circuit = None):

    node = {}
    if circuit is None:
        dev_name = device.name
        if dev_name is None:
            dev_name = "device name unknown"

        node_content = ""

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

        dev_title = "<table> %s </table>" % (node_content)

        node["title"] = dev_title
        node["id"] = device.id
        
        if device.device_role.slug in settings.PLUGINS_CONFIG["netbox_topology_views"]["device_img"]:
            node["image"] = "../../static/netbox_topology_views/img/"  + device.device_role.slug + ".png"
        else:
            node["image"] = "../../static/netbox_topology_views/img/role-unknown.png"

        if device.device_role.color != "":
            node["color.border"] = "#" + device.device_role.color
    else:
        dev_name = "Circuit " + str(device.cid)
        node["image"] = "../../static/netbox_topology_views/img/circuit.png"
        node["id"] = "c{}".format(device.id)
    
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

def create_edge(edge_id, termination_a, termination_b, circuit = None, cable = None, wireless = None):
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
    else:
        if wireless is not None:
            edge["dashes"] = [2, 10, 2, 10]
            edge["title"] = "Wireless Connection between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
        else:
            edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
        
    if cable is not None and cable.color != "":
        edge["color"] = "#" + cable.color
    
    return edge

def create_circuit_termination(termination):
    if isinstance(termination, CircuitTermination):
        return { "termination_name": termination.circuit.provider.name, "termination_device_name": termination.circuit.cid, "device_id": "c{}".format(termination.circuit.id) }
    if isinstance(termination, Interface):
        return { "termination_name": termination.name, "termination_device_name": termination.device.name, "device_id": termination.device.id }


def get_topology_data(queryset, hide_unconnected, save_coords):
    nodes_devices = {}
    edges = []
    nodes = []
    edge_ids = 0
    cable_ids = {}
    nodes_circuits = {}
    if not queryset:
        return None

    ignore_cable_type = settings.PLUGINS_CONFIG["netbox_topology_views"]["ignore_cable_type"]
    enable_circuit_terminations = settings.PLUGINS_CONFIG["netbox_topology_views"]["enable_circuit_terminations"]

    device_ids = [d.id for d in queryset]

    if enable_circuit_terminations:
        site_ids = [d.site.id for d in queryset]
        circuits = CircuitTermination.objects.filter( Q(site_id__in=site_ids) ).prefetch_related("provider_network", "circuit")
        for circuit in circuits:
            if circuit.circuit.id not in nodes_circuits:
                nodes_circuits[circuit.circuit.id] = circuit.circuit

            termination_a = {}
            termination_b = {}
            circuit_model = {}
            if circuit.cable is not None:
                termination_a = create_circuit_termination(circuit.cable.a_terminations[0])
                termination_b = create_circuit_termination(circuit.cable.b_terminations[0])
            if bool(termination_a) and bool(termination_b):
                circuit_model = {"provider_name": circuit.circuit.provider.name}
                edge_ids += 1
                edges.append(create_edge(edge_id=edge_ids,circuit=circuit_model, termination_a=termination_a, termination_b=termination_b))

        nodes.append([create_node(d, save_coords, circuit=True) for d in nodes_circuits.values()])

    links = CableTermination.objects.filter( Q(_device_id__in=device_ids) ).select_related("termination_type")
    wlan_links = WirelessLink.objects.filter( Q(_interface_a_device_id__in=device_ids) & Q(_interface_b_device_id__in=device_ids))

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
            cable_ids[link.cable.id][link.cable_end] = { "termination_name": link.termination.name, "termination_device_name": link.termination.device.name, "device_id": link._device_id }

            if complete_link:
                if link._device_id not in nodes_devices:
                    nodes_devices[link._device_id] = link.termination.device
                edge_ids += 1
                edges.append(create_edge(edge_id=edge_ids, cable=link.cable, termination_a=cable_ids[link.cable.id]["A"], termination_b=cable_ids[link.cable.id]["B"]))
           
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
    nodes.append([create_node(d, save_coords) for d in nodes_devices.values()])
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

            if "draw_init" in request.GET:
                if request.GET["draw_init"].lower() == "true":
                    topo_data = get_topology_data(self.queryset, hide_unconnected, save_coords)
            else:
                topo_data = get_topology_data(self.queryset, hide_unconnected, save_coords)
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
