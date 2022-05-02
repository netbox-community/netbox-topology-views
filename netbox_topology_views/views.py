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

    dev_title = "<table> %s </table>" % (node_content)

    node = {}
    node["id"] = device.id
    node["name"] = dev_name
    node["label"] = dev_name
    node["title"] = dev_title
    node["shape"] = 'image'
    if device.device_role.slug in settings.PLUGINS_CONFIG["netbox_topology_views"]["device_img"]:
        node["image"] = '../../static/netbox_topology_views/img/'  + device.device_role.slug + ".png"
    else:
        node["image"] = "../../static/netbox_topology_views/img/role-unknown.png"

    if device.device_role.color != "":
        node["color.border"] = "#" + device.device_role.color

    if "coordinates" in device.custom_field_data:
        if device.custom_field_data["coordinates"] is not None:
            if ';' in device.custom_field_data["coordinates"]:
                cords =  device.custom_field_data["coordinates"].split(";")
                node["x"] = int(cords[0])
                node["y"] = int(cords[1])
                node["physics"] = False
    return node

def get_topology_data(queryset, hide_unconnected, filter_role_ids):
    nodes = []
    nodes_ids = []
    edges = []
    edge_ids = 0
    cable_ids = []
    circuit_ids = []
    if not queryset:
        return None

    ignore_cable_type = settings.PLUGINS_CONFIG["netbox_topology_views"]["ignore_cable_type"]
    enable_circuit_terminations = settings.PLUGINS_CONFIG["netbox_topology_views"]["enable_circuit_terminations"]

    device_ids = [d.id for d in queryset]

    for qs_device in queryset:
        device_has_connections = False

        links_device = Cable.objects.filter(Q(_termination_a_device_id=qs_device.id) | Q(_termination_b_device_id=qs_device.id) )

        for link_from in links_device:
            if link_from.termination_a_type.name in ignore_cable_type:
                continue

            if link_from.id in cable_ids:
                continue

            # termination_a can be a CircuitTermination (no trace()) while termination_b is an interface
            # If so, we swap them so we can follow the path using PathEndpoint#trace()
            if isinstance(link_from.termination_a, PathEndpoint):
                termination_from = link_from.termination_a
            else:
                if isinstance(link_from.termination_b, PathEndpoint):
                    termination_from = link_from.termination_b
                else:
                    continue

            # Ignore incomplete path
            if not termination_from.path.is_active:
                continue

            trace = termination_from.trace()
            destination = trace[-1][2]  #  last step (-1), termination_b (2)

            if isinstance(destination, ProviderNetwork):
                # ProviderNetwork not supported - It would need to manage several kind of nodes (Device, ProviderNetwork)
                # and maps javascript nodes ID with Devices IDs, and ProviderNetworks IDs
                continue

            if destination.device.id not in device_ids:
                # end device not in queryset, skip
                continue

            # variables needed for trace() browsing
            origin = None
            iscircuit = False
            circuit = None
            path = []

            # trace() : Return the path as a list of three-tuples (A termination, cable, B termination)
            for (termination_a, cable, termination_b) in trace:
                
                if origin is None:
                    # New part of the link, reset variables
                    origin = termination_a
                    iscircuit = False
                    circuit = None
                    path = []

                if cable is not None:
                    if cable.id in cable_ids or cable.termination_a_type in ignore_cable_type or cable.termination_b_type in ignore_cable_type:
                        # Ignore this path
                        break

                if isinstance(termination_b, CircuitTermination):
                    if enable_circuit_terminations and termination_b.circuit.id not in circuit_ids:
                        iscircuit = True
                        circuit = termination_b.circuit
                        circuit_ids.append(circuit.id)
                        path.append(termination_b.circuit.cid)
                    else:
                        # Ignore this circuit
                        break
                elif hasattr(termination_b, 'device') and termination_b.device.device_role.id in filter_role_ids:
                    # Skip this intermediate device (filtered), keep origin device in $origin
                    path.append(termination_b.device.name)
                else:
                    # New part of the link we want to display
                    device_has_connections = True
                    if cable is not None:
                        cable_ids.append(cable.id)
                    edge_ids += 1
                    cable_a_dev_name = origin.device.name
                    if cable_a_dev_name is None:
                        cable_a_dev_name = "device A name unknown"
                    cable_a_name = origin.name
                    if cable_a_name is None:
                        cable_a_name = "cable A name unknown"
                    cable_b_dev_name = termination_b.device.name
                    if cable_b_dev_name is None:
                        cable_b_dev_name = "device B name unknown"
                    cable_b_name = termination_b.name
                    if cable_b_name is None:
                        cable_b_name = "cable B name unknown"

                    # Add intermediate device (if not filtered) as it may be absent of the queryset
                    if termination_b.device.id not in nodes_ids and termination_b.device.device_role.id not in filter_role_ids:
                        nodes_ids.append(termination_b.device.id)
                        nodes.append(create_node(termination_b.device))

                    edge = {}
                    edge["id"] = edge_ids
                    edge["from"] = origin.device.id
                    edge["to"] = termination_b.device.id

                    if iscircuit:
                        edge["dashes"] = True
                        edge["title"] = "Circuit provider: "  + circuit.provider.name + "<br>"
                        edge["title"] += "Termination between <br>"
                        edge["title"] += cable_b_dev_name + " [" + cable_b_name +  "]<br>"
                        edge["title"] += cable_a_dev_name + " [" + cable_a_name +  "]"
                    else:
                        edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
                        
                    edge["title"] += '' if len(path) <= 0 else "<br>Through " + '/'.join(path)
                        
                    if cable is not None and cable.color != "":
                        edge["color"] = "#" + cable.color

                    edges.append(edge)
                    
                    # Reset for next iteration
                    origin = None

            # endfor (trace)
        # endfor (link)
        
        if(qs_device.id not in nodes_ids):
            if hide_unconnected == None or (hide_unconnected is True and device_has_connections is True):
                nodes_ids.append(qs_device.id)
                nodes.append(create_node(qs_device))
    #endfor (qs_device)

    results = {}
    results["nodes"] = nodes
    results["edges"] = edges
    return results


class TopologyHomeView(PermissionRequiredMixin, View):
    permission_required = ('dcim.view_site', 'dcim.view_device')

    """
    Show the home page
    """
    def get(self, request):
        self.filterset = DeviceFilterSet
        self.queryset = Device.objects.all()
        self.queryset = self.filterset(request.GET, self.queryset).qs
        topo_data = None

        if request.GET:
            hide_unconnected = None
            if 'hide_unconnected' in request.GET:
                if request.GET["hide_unconnected"] == "on" :
                    hide_unconnected = True

            if 'hide_role_id' in request.GET:
                hide_role_ids = list(map(int, request.GET.getlist('hide_role_id')))
            else:
                hide_role_ids = []

            if 'draw_init' in request.GET:
                if request.GET["draw_init"].lower() == 'true':
                    topo_data = get_topology_data(self.queryset, hide_unconnected, hide_role_ids)
            else:
                topo_data = get_topology_data(self.queryset, hide_unconnected, hide_role_ids)
        else:
            preselected_device_roles = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_device_roles"]
            preselected_hide_roles = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_hide_roles"]
            preselected_tags = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_tags"]

            q_device_role_id = DeviceRole.objects.filter(name__in=preselected_device_roles).values_list('id', flat=True)
            q_hide_role_id = DeviceRole.objects.filter(name__in=preselected_hide_roles).values_list('id', flat=True)
            q_tags = Tag.objects.filter(name__in=preselected_tags).values_list('name', flat=True)

            q = QueryDict(mutable=True)
            q.setlist('device_role_id', list(q_device_role_id))
            q.setlist('hide_role_id', list(q_hide_role_id))
            q.setlist('tag', list(q_tags))
            q['draw_init'] = settings.PLUGINS_CONFIG["netbox_topology_views"]["draw_default_layout"]
            query_string = q.urlencode()
            return HttpResponseRedirect(request.path + "?" + query_string)

        return render(request, 'netbox_topology_views/index.html' , {
             'filter_form': DeviceFilterForm(request.GET, label_suffix=''),
             'topology_data': json.dumps(topo_data)
            }
        )
