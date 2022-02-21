from django.shortcuts import get_object_or_404, render
from django.db.models import Q
from django.views.generic import View
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.conf import settings

from .forms import DeviceFilterForm
from .filters import DeviceFilterSet
import json

from dcim.models import Device, Cable, DeviceRole, DeviceType

def get_topology_data(queryset):
    nodes = []
    nodes_ids = []
    edges = []
    edge_ids = 0
    cable_ids = []
    circuit_ids = []
    if not queryset:
        return None

    for qs_device in queryset:
        device_has_connections = False
        links_from_device = Cable.objects.filter(Q(_termination_a_device_id=qs_device.id) |  Q(_termination_b_device_id=qs_device.id) )
        for link_from in links_from_device:
            device_has_connections = True
            if link_from.termination_a_type.name != "circuit termination" and link_from.termination_b_type.name != "circuit termination":
                if link_from.id not in cable_ids:
                    cable_ids.append(link_from.id)
                    edge_ids += 1
                    cable_a_dev_name = link_from.termination_a.device.name
                    if cable_a_dev_name is None:
                        cable_a_dev_name = "device A name unknown"
                    cable_a_name = link_from.termination_a.name
                    if cable_a_name is None:
                        cable_a_name = "cable A name unknown"
                    cable_b_dev_name = link_from.termination_b.device.name
                    if cable_b_dev_name is None:
                        cable_b_dev_name = "device B name unknown"
                    cable_b_name = link_from.termination_b.name
                    if cable_b_name is None:
                        cable_b_name = "cable B name unknown"

                    edge = {}
                    edge["id"] = edge_ids
                    edge["from"] = link_from.termination_a.device.id
                    edge["to"] = link_from.termination_b.device.id
                    edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
                    if link_from.color != "":
                        edge["color"] = "#" + link_from.color
                    edges.append(edge)
            else:
                if link_from.termination_a.circuit.id not in circuit_ids:
                    circuit_ids.append(link_from.termination_a.circuit.id)
                    edge_ids += 1

                    cable_b_dev_name = link_from.termination_b.device.name
                    if cable_b_dev_name is None:
                        cable_b_dev_name = "device B name unknown"
                    cable_b_name = link_from.termination_b.name
                    if cable_b_name is None:
                        cable_b_name = "cable B name unknown"

                    edge = {}
                    edge["id"] = edge_ids
                    edge["to"] = link_from.termination_b.device.id
                    edge["dashes"] = True
                    title = ""

                    title += "Circuit provider: "  + link_from.termination_a.circuit.provider.name + "<br>"
                    title += "Termination between <br>"
                    title += cable_b_dev_name + " [" + cable_b_name +  "]<br>"

                    if link_from.termination_a.circuit.termination_a is not None and link_from.termination_a.circuit.termination_a.cable is not None and link_from.termination_a.circuit.termination_a.cable.id != link_from.id and link_from.termination_a.circuit.termination_a.cable.termination_b is not None and link_from.termination_a.circuit.termination_a.cable.termination_b.device is not None:
                        edge["from"] = link_from.termination_a.circuit.termination_a.cable.termination_b.device.id

                        cable_a_dev_name = link_from.termination_a.circuit.termination_a.cable.termination_b.device.name
                        if cable_a_dev_name is None:
                            cable_a_dev_name = "device B name unknown"
                        cable_b_name = link_from.termination_a.circuit.termination_a.cable.termination_b.name
                        if cable_a_name is None:
                            cable_a_name = "cable B name unknown"
                        title += cable_a_dev_name + " [" + cable_a_name +  "]<br>"
                        edge["title"] = title
                        edges.append(edge)

                    if link_from.termination_a.circuit.termination_z is not None and link_from.termination_a.circuit.termination_z.cable is not None and link_from.termination_a.circuit.termination_z.cable.id != link_from.id and link_from.termination_a.circuit.termination_z.cable.termination_b is not None and link_from.termination_a.circuit.termination_z.cable.termination_b.device is not None:
                        edge["from"] = link_from.termination_a.circuit.termination_z.cable.termination_b.device.id

                        cable_a_dev_name = link_from.termination_a.circuit.termination_z.cable.termination_b.device.name
                        if cable_a_dev_name is None:
                            cable_a_dev_name = "device B name unknown"
                        cable_a_name = link_from.termination_a.circuit.termination_z.cable.termination_b.name
                        if cable_a_name is None:
                            cable_a_name = "cable B name unknown"
                        title += cable_a_dev_name + " [" + cable_a_name +  "]<br>"
                        edge["title"] = title
                        edges.append(edge)

            if qs_device.id not in nodes_ids:
                nodes_ids.append(qs_device.id)

                dev_name = qs_device.name
                if dev_name is None:
                    dev_name = "device name unknown"

                node_content = ""

                if qs_device.device_type is not None:
                    node_content += "<tr><th>Type: </th><td>" + qs_device.device_type.model + "</td></tr>"
                if qs_device.device_role.name is not None:
                    node_content +=  "<tr><th>Role: </th><td>" + qs_device.device_role.name + "</td></tr>"
                if qs_device.serial != "":
                    node_content += "<tr><th>Serial: </th><td>" + qs_device.serial + "</td></tr>"
                if qs_device.primary_ip is not None:
                    node_content += "<tr><th>IP Address: </th><td>" + str(qs_device.primary_ip.address) + "</td></tr>"

                dev_title = "<table> %s </table>" % (node_content)

                node = {}
                node["id"] = qs_device.id
                node["name"] = dev_name
                node["label"] = dev_name
                node["title"] = dev_title
                node["shape"] = 'image'
                if qs_device.device_role.slug in settings.PLUGINS_CONFIG["netbox_topology_views"]["device_img"]:
                    node["image"] = '../../static/netbox_topology_views/img/'  + qs_device.device_role.slug + ".png"
                else:
                    node["image"] = "../../static/netbox_topology_views/img/role-unknown.png"

                if qs_device.device_role.color != "":
                    node["color.border"] = "#" + qs_device.device_role.color

                if "coordinates" in qs_device.custom_field_data:
                    print(qs_device.custom_field_data)
                    if qs_device.custom_field_data["coordinates"] is not None:
                        cords =  qs_device.custom_field_data["coordinates"].split(";")
                        node["x"] = int(cords[0])
                        node["y"] = int(cords[1])
                        node["physics"] = False
                nodes.append(node)

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
            topo_data = get_topology_data(self.queryset)

        return render(request, 'netbox_topology_views/index.html' , {
             'filter_form': DeviceFilterForm(request.GET, label_suffix=''),
             'topology_data': json.dumps(topo_data)
            }
        )
