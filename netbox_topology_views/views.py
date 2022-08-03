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

from dcim.models import Device, Cable, DeviceRole, PathEndpoint
from circuits.models import CircuitTermination, ProviderNetwork
from extras.models import Tag


def create_node(device):
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

    node = {}
    node["id"] = device.id
    node["name"] = dev_name
    node["label"] = dev_name
    node["title"] = dev_title
    node["shape"] = "image"
    if device.device_role.slug in settings.PLUGINS_CONFIG["netbox_topology_views"]["device_img"]:
        node["image"] = "../../static/netbox_topology_views/img/"  + device.device_role.slug + ".png"
    else:
        node["image"] = "../../static/netbox_topology_views/img/role-unknown.png"

    if device.device_role.color != "":
        node["color.border"] = "#" + device.device_role.color

    if "coordinates" in device.custom_field_data:
        if device.custom_field_data["coordinates"] is not None:
            if ";" in device.custom_field_data["coordinates"]:
                cords =  device.custom_field_data["coordinates"].split(";")
                node["x"] = int(cords[0])
                node["y"] = int(cords[1])
                node["physics"] = False
    return node

def create_edge(edge_id, cable, termination_a, termination_b, path = None, circuit = None):
    cable_a_dev_name = "device A name unknown" if termination_a.device.name is None else termination_a.device.name
    cable_a_name = "device A name unknown" if termination_a.name is None else termination_a.name
    cable_b_dev_name = "device A name unknown" if termination_b.device.name is None else termination_b.device.name
    cable_b_name = "cable B name unknown" if termination_b.name is None else termination_b.name

    edge = {}
    edge["id"] = edge_id
    edge["from"] = termination_a.device.id
    edge["to"] = termination_b.device.id

    if circuit is not None:
        edge["dashes"] = True
        edge["title"] = "Circuit provider: "  + circuit.provider.name + "<br>"
        edge["title"] += "Termination between <br>"
        edge["title"] += cable_b_dev_name + " [" + cable_b_name +  "]<br>"
        edge["title"] += cable_a_dev_name + " [" + cable_a_name +  "]"
    else:
        edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
    
    if path is not None:
        edge["title"] += "" if len(path) <= 0 else "<br>Through " + "/".join(path)
        
    if cable is not None and cable.color != "":
        edge["color"] = "#" + cable.color
    
    return edge

def get_topology_data(queryset, hide_unconnected, intermediate_dev_role_ids, end2end_connections):
    nodes_devices = {}
    edges = []
    edge_ids = 0
    cable_ids = []
    circuit_ids = []
    if not queryset:
        return None

    ignore_cable_type = settings.PLUGINS_CONFIG["netbox_topology_views"]["ignore_cable_type"]
    enable_circuit_terminations = settings.PLUGINS_CONFIG["netbox_topology_views"]["enable_circuit_terminations"]

    device_ids = [d.id for d in queryset]

    links = Cable.objects.filter( Q(_termination_a_device_id__in=device_ids) | Q(_termination_b_device_id__in=device_ids) ) \
                        .select_related("termination_a_type", "termination_b_type") \
                        .prefetch_related("termination_a", "termination_b")

    for link in links:

        if link.termination_a_type.name in ignore_cable_type or link.termination_b_type.name in ignore_cable_type \
            or link.id in cable_ids:
            continue
        
        a_is_path_endoint = isinstance(link.termination_a, PathEndpoint)
        b_is_path_endoint = isinstance(link.termination_b, PathEndpoint)

        if not end2end_connections or (not a_is_path_endoint and not b_is_path_endoint):

            if isinstance(link.termination_a, CircuitTermination):
                if enable_circuit_terminations and link.termination_a.circuit.id not in circuit_ids:
                    circuit = link.termination_a.circuit
                    circuit_ids.append(circuit.id)
                    cable_ids.append(link.id)
                    
                    path_destination = circuit.termination_z if link.termination_a.term_side == "A" else circuit.termination_a

                    if path_destination is not None and path_destination.provider_network is None:
                        # ProviderNetwork not supported at the moment
                        # $path_destination.cable would be none : there is no cable between a CircuitTermination and ProviderNetwork

                        if not hasattr(link.termination_b, 'device'):
                            #CircuitTermination B Missing Device
                            continue

                        origin_device = link.termination_b.device
                        destination_device = path_destination.cable.termination_b.device

                        if origin_device.id in device_ids and destination_device.id in device_ids:
                            if origin_device.id not in nodes_devices:
                                nodes_devices[origin_device.id] = origin_device
                            if destination_device.id not in nodes_devices:
                                nodes_devices[destination_device.id] = destination_device

                            edge_ids += 1
                            edges.append(create_edge(edge_ids, link, link.termination_b, path_destination.cable.termination_b, [circuit.cid], circuit))

            elif link.termination_a.device.id in device_ids and link.termination_b.device.id in device_ids:

                    if link.termination_a.device.id not in nodes_devices:
                        nodes_devices[link.termination_a.device.id] = link.termination_a.device
                    if link.termination_b.device.id not in nodes_devices:
                        nodes_devices[link.termination_b.device.id] = link.termination_b.device

                    cable_ids.append(link.id)
                    edge_ids += 1
                    edges.append(create_edge(edge_ids, link, link.termination_a, link.termination_b))
        else:
            # termination_a can be a CircuitTermination (no trace()) while termination_b is a PathEndpoint
            # If so, we swap them so we can follow the path using PathEndpoint#trace()
            path_start = link.termination_a if a_is_path_endoint else link.termination_b
            if path_start.device is not None and path_start.device.id not in device_ids:
                # device not in queryset, skip
                continue

            # Ignore incomplete path when in end-to-end connection mode
            if path_start.path is not None:
                if not path_start.path.is_active or path_start.path.is_split:
                    continue
            else:
                continue

            path_destination = path_start.path.destination
            if hasattr(path_destination, "device") and path_destination.device is not None and path_destination.device.id not in device_ids:
                # device not in queryset, skip
                continue

            valid_path = False

            # variables needed for trace() browsing
            origin = None
            circuit = None
            tmp_path = []

            # trace() : Return the path as a list of three-tuples (A termination, cable, B termination)
            # TODO device qui ne s"affichent pas si hide_unconnected
            for (termination_a, cable, termination_b) in path_start.trace():
                
                if origin is None:
                    # New part of the link
                    origin = termination_a
                    circuit = None
                    tmp_path = []

                if isinstance(termination_b, ProviderNetwork):
                    # ProviderNetwork not supported at the moment
                    # It would need to manage several kind of nodes (Device, ProviderNetwork)
                    # and maps javascript nodes ID with Devices IDs and ProviderNetworks IDs
                    # When $termination_b is a ProviderNetwork instance, $cable will be None
                    break

                if cable is not None and (cable.termination_a_type in ignore_cable_type or cable.termination_b_type in ignore_cable_type):
                    # Ignore this path
                    break

                if isinstance(termination_b, CircuitTermination):
                    if enable_circuit_terminations:
                        circuit = termination_b.circuit
                        tmp_path.append(circuit.cid)
                        if circuit.id not in circuit_ids:
                            circuit_ids.append(circuit.id)
                    else:
                        # Ignore this path
                        break
                elif end2end_connections and termination_b != path_destination \
                        and termination_b.device.device_role.id not in intermediate_dev_role_ids \
                        and termination_b.device.id not in device_ids:
                    # Skip this intermediate device, origin device is keep in $origin for next iteration
                    tmp_path.append(termination_b.device.name)
                elif cable is not None and termination_b is not None:
                    if cable.id not in cable_ids:
                        # New part of the link we want to display
                        cable_ids.append(cable.id)
                        edge_ids += 1
                        edges.append(create_edge(edge_ids, cable, origin, termination_b, tmp_path, circuit))

                    if not valid_path:
                        valid_path = True

                    if termination_b.device.id not in nodes_devices and \
                      (termination_b.device.device_role.id in intermediate_dev_role_ids or termination_b.device.id in device_ids) :
                        nodes_devices[termination_b.device.id] = termination_b.device
                    # Reset for next iteration
                    origin = None
            # endfor (trace)

            if valid_path and path_start.device.id not in nodes_devices:
                nodes_devices[path_start.device.id] = path_start.device

    # endfor (link)
    
    for qs_device in queryset:
        if qs_device.id not in nodes_devices and not hide_unconnected:
            nodes_devices[qs_device.id] = qs_device

    results = {}
    results["nodes"] = [create_node(d) for d in nodes_devices.values()]
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
            hide_unconnected = False
            if "hide_unconnected" in request.GET:
                if request.GET["hide_unconnected"] == "on" :
                    hide_unconnected = True

            if "intermediate_dev_role_id" in request.GET:
                intermediate_dev_role_ids = list(map(int, request.GET.getlist("intermediate_dev_role_id")))
            else:
                intermediate_dev_role_ids = []

            end2end_connections = False
            if "end2end_connections" in request.GET:
                if request.GET["end2end_connections"] == "on" :
                    end2end_connections = True
            
            if "draw_init" in request.GET:
                if request.GET["draw_init"].lower() == "true":
                    topo_data = get_topology_data(self.queryset, hide_unconnected, intermediate_dev_role_ids, end2end_connections)
            else:
                topo_data = get_topology_data(self.queryset, hide_unconnected, intermediate_dev_role_ids, end2end_connections)
        else:
            preselected_device_roles = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_device_roles"]
            preselected_intermediate_dev_roles = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_intermediate_dev_roles"]
            preselected_tags = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_tags"]

            q_device_role_id = DeviceRole.objects.filter(name__in=preselected_device_roles).values_list("id", flat=True)
            q_intermediate_dev_role_id = DeviceRole.objects.filter(name__in=preselected_intermediate_dev_roles).values_list("id", flat=True)
            q_tags = Tag.objects.filter(name__in=preselected_tags).values_list("name", flat=True)

            q = QueryDict(mutable=True)
            q.setlist("device_role_id", list(q_device_role_id))
            q.setlist("intermediate_dev_role_id", list(q_intermediate_dev_role_id))
            q.setlist("tag", list(q_tags))
            q["draw_init"] = settings.PLUGINS_CONFIG["netbox_topology_views"]["draw_default_layout"]
            query_string = q.urlencode()
            return HttpResponseRedirect(request.path + "?" + query_string)

        return render(request, "netbox_topology_views/index.html" , {
             "filter_form": DeviceFilterForm(request.GET, label_suffix=""),
             "topology_data": json.dumps(topo_data)
            }
        )
