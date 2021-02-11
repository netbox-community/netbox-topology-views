from rest_framework.viewsets import ModelViewSet, ViewSet, ReadOnlyModelViewSet, GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from rest_framework.routers import APIRootView

from .serializers import PreDeviceRoleSerializer, TopologyDummySerializer, PreTagSerializer
from django.conf import settings

from dcim.models import  DeviceRole, Device, Cable
from circuits.models import Circuit
from extras.models import Tag


ignore_cable_type_raw = settings.PLUGINS_CONFIG["netbox_topology_views"]["ignore_cable_type"]
ignore_cable_type = ignore_cable_type_raw.split(",")

preselected_device_roles_raw = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_device_roles"]
preselected_device_roles = preselected_device_roles_raw.split(",")

preselected_tags_raw = settings.PLUGINS_CONFIG["netbox_topology_views"]["preselected_tags"]
preselected_tags = preselected_tags_raw.split(",")

class TopologyViewsRootView(APIRootView):
    def get_view_name(self):
        return 'TopologyViews'

class PreSelectDeviceRolesViewSet(ReadOnlyModelViewSet):
    queryset = DeviceRole.objects.filter(name__in=preselected_device_roles)
    serializer_class = PreDeviceRoleSerializer

class PreSelectTagsViewSet(ReadOnlyModelViewSet):
    queryset = Tag.objects.filter(name__in=preselected_tags)
    serializer_class = PreTagSerializer

class SaveCoordsViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.all()
    serializer_class = TopologyDummySerializer

    @action(detail=False, methods=['patch'])
    def save_coords(self, request):
        results = {}
        if settings.PLUGINS_CONFIG["netbox_topology_views"]["allow_coordinates_saving"]:
            device_id = None
            x_coord = None
            y_coord = None
            if "node_id" in request.data:
                if request.data["node_id"]:
                    device_id = request.data["node_id"]
            if "x" in request.data:
                if request.data["x"]:
                    x_coord = request.data["x"]
            if "y" in request.data:
                if request.data["y"]:
                    y_coord = request.data["y"]

            actual_device= Device.objects.get(id=device_id)

            if "coordinates" in actual_device.custom_field_data:
                actual_device.custom_field_data["coordinates"] = "%s;%s" % (x_coord,y_coord)
                actual_device.save()
                results["status"] = "saved coords"
            else:
                try:
                    actual_device.custom_field_data["coordinates"] = "%s;%s" % (x_coord,y_coord)
                    actual_device.save()
                    results["status"] = "saved coords"
                except :
                    results["status"] = "coords custom field not created"
                    return Response(status=500)

            return Response(results)
        else:
            results["status"] = "not allowed to save coords"
            return Response(results, status=500)

class SearchViewSet(ReadOnlyModelViewSet):
    queryset = Device.objects.all()
    serializer_class = TopologyDummySerializer

    def _filter(self, site, role, name, tags, region):
        filter_devices = Device.objects.all()
        if name is not None:
            filter_devices = filter_devices.filter(name__contains=name)
        if site is not None:
            filter_devices = filter_devices.filter(site__id__in=site)
        if role is not None:
            filter_devices = filter_devices.filter(device_role__id__in=role)
        if tags is not None:
            filter_devices = filter_devices.filter(tags__id__in=tags)
        if region is not None:
            filter_devices = filter_devices.filter(site__region__id__in=region)
        return filter_devices


    @action(detail=False, methods=['get'])
    def search(self, request):
        name = request.query_params.get('name', None)
        if name == "":
            name = None

        sites = request.query_params.getlist('sites[]', None)
        if sites == []:
            sites = None

        devicerole = request.query_params.getlist('devicerole[]', None)
        if devicerole == []:
            devicerole = None

        tags = request.query_params.getlist('tags[]', None)
        if tags == []:
            tags = None

        regions = request.query_params.getlist('regions[]', None)
        if regions == []:
            regions = None

        devices = self._filter(sites, devicerole, name, tags, regions)

        nodes = []
        edges = []
        edge_ids = 0
        cable_ids = []
        circuit_ids = []
        for device in devices:
            cables = device.get_cables()
            for cable in cables:
                if cable.termination_a_type.name != "circuit termination" and cable.termination_b_type.name != "circuit termination":
                    if cable.id not in cable_ids:
                        if cable.termination_a_type.name not in ignore_cable_type and cable.termination_b_type.name not in ignore_cable_type:
                            cable_ids.append(cable.id)
                            edge_ids += 1

                            cable_a_dev_name = cable.termination_a.device.name
                            if cable_a_dev_name is None:
                                cable_a_dev_name = "device A name unknown"
                            cable_a_name = cable.termination_a.name
                            if cable_a_name is None:
                                cable_a_name = "cable A name unknown"
                            cable_b_dev_name = cable.termination_b.device.name
                            if cable_b_dev_name is None:
                                cable_b_dev_name = "device B name unknown"
                            cable_b_name = cable.termination_b.name
                            if cable_b_name is None:
                                cable_b_name = "cable B name unknown"

                            edge = {}
                            edge["id"] = edge_ids
                            edge["from"] = cable.termination_a.device.id
                            edge["to"] = cable.termination_b.device.id
                            edge["title"] = "Cable between <br> " + cable_a_dev_name + " [" + cable_a_name +  "]<br>" + cable_b_dev_name + " [" + cable_b_name + "]"
                            if cable.color != "":
                                edge["color"] = "#" + cable.color
                            edges.append(edge)
                else:
                    if cable.termination_a_type.name == "circuit termination":
                        if settings.PLUGINS_CONFIG["netbox_topology_views"]["enable_circuit_terminations"]:
                            if cable.termination_a.circuit.id not in circuit_ids:
                                circuit_ids.append(cable.termination_a.circuit.id)
                                edge_ids += 1

                                cable_b_dev_name = cable.termination_b.device.name
                                if cable_b_dev_name is None:
                                    cable_b_dev_name = "device B name unknown"
                                cable_b_name = cable.termination_b.name
                                if cable_b_name is None:
                                    cable_b_name = "cable B name unknown"

                                edge = {}
                                edge["id"] = edge_ids
                                edge["to"] = cable.termination_b.device.id
                                edge["dashes"] = True
                                title = ""

                                title += "Circuit provider: "  + cable.termination_a.circuit.provider.name + "<br>"
                                title += "Termination between <br>"
                                title += cable_b_dev_name + " [" + cable_b_name +  "]<br>"
                                # To Many if's
                                if cable.termination_a.circuit.termination_a is not None:
                                    if cable.termination_a.circuit.termination_a.cable is not None:
                                        if cable.termination_a.circuit.termination_a.cable.id != cable.id:
                                            if cable.termination_a.circuit.termination_a.cable.termination_b is not None:
                                                if cable.termination_a.circuit.termination_a.cable.termination_b.device is not None:
                                                    edge["from"] = cable.termination_a.circuit.termination_a.cable.termination_b.device.id

                                                    cable_a_dev_name = cable.termination_a.circuit.termination_a.cable.termination_b.device.name
                                                    if cable_a_dev_name is None:
                                                        cable_a_dev_name = "device B name unknown"
                                                    cable_b_name = cable.termination_a.circuit.termination_a.cable.termination_b.name
                                                    if cable_a_name is None:
                                                        cable_a_name = "cable B name unknown"
                                                    title += cable_a_dev_name + " [" + cable_a_name +  "]<br>"
                                                    edge["title"] = title
                                                    edges.append(edge)
                                # To Many if's
                                if cable.termination_a.circuit.termination_z is not None:
                                    if cable.termination_a.circuit.termination_z.cable is not None:
                                        if cable.termination_a.circuit.termination_z.cable.id != cable.id:
                                            if cable.termination_a.circuit.termination_z.cable.termination_b is not None:
                                                if cable.termination_a.circuit.termination_z.cable.termination_b.device is not None:
                                                    edge["from"] = cable.termination_a.circuit.termination_z.cable.termination_b.device.id

                                                    cable_a_dev_name = cable.termination_a.circuit.termination_z.cable.termination_b.device.name
                                                    if cable_a_dev_name is None:
                                                        cable_a_dev_name = "device B name unknown"
                                                    cable_a_name = cable.termination_a.circuit.termination_z.cable.termination_b.name
                                                    if cable_a_name is None:
                                                        cable_a_name = "cable B name unknown"
                                                    title += cable_a_dev_name + " [" + cable_a_name +  "]<br>"
                                                    edge["title"] = title
                                                    edges.append(edge)
            dev_name = device.name
            if dev_name is None:
                dev_name = "device name unknown"

            node_content = ""

            if device.device_type.display_name is not None:
                node_content += "<tr><th>Type: </th><td>" + device.device_type.display_name + "</td></tr>"
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
                if device.custom_field_data["coordinates"] != "":
                    cords =  device.custom_field_data["coordinates"].split(";")
                    node["x"] = int(cords[0])
                    node["y"] = int(cords[1])
                    node["physics"] = False
            
            nodes.append(node)

        results = {}
        results["nodes"] = nodes
        results["edges"] = edges

        return Response(results)
 