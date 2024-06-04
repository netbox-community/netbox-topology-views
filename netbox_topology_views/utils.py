from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Type
import base64
import xml.dom.minidom

import sys

from django.conf import settings
from django.db.models import Model
from django.templatetags.static import static
from django.utils.text import camel_case_to_spaces, re_camel_case
from django.contrib import messages

IMAGE_DIR = Path(settings.STATIC_ROOT) / "netbox_topology_views/img"
if sys.version_info >= (3,9,0):
    CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / settings.PLUGINS_CONFIG[
        "netbox_topology_views"
    ]["static_image_directory"].removeprefix("/")
else:
    prefix = "/"
    plugin_path = settings.PLUGINS_CONFIG["netbox_topology_views"]["static_image_directory"]
    if plugin_path.startswith(prefix):
        plugin_path_new = plugin_path[len(prefix):]
        CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / plugin_path_new
    else:
        CONF_IMAGE_DIR: Path = Path(settings.STATIC_ROOT) / plugin_path


def image_static_url(path: Path) -> str:
    return static(
        f"/{path.relative_to(Path(settings.STATIC_ROOT))}"
    )


def get_image_from_url(url: str) -> str:
    if sys.version_info >= (3,9,0):
        return url.removeprefix(settings.STATIC_URL)
    else:
        if url.startswith(settings.STATIC_URL):
            url_new = url[len(settings.STATIC_URL):]
            return url_new
        else:
            return url


IMAGE_FILETYPES = (
    "apng",
    "avif",
    "bmp",
    "cur",
    "gif",
    "ico",
    "jfif",
    "jpeg",
    "jpg",
    "pjp",
    "pjpeg",
    "png",
    "svg",
    "webp",
)


def find_image_in_dir(glob: str, dir: Path):
    return next(
        (f for f in dir.glob(f"{glob}.*") if f.suffix.lstrip(".") in IMAGE_FILETYPES),
        None,
    )


@lru_cache(maxsize=50)
def find_image_url(glob: str, dir: Path = CONF_IMAGE_DIR):
    """
    will attempt to find a file that matches glob in given directory with any file extension,
    otherwise will try to find a `role-unknown` image

    returns static file url
    """
    if file := find_image_in_dir(glob, dir):
        return image_static_url(file)

    if glob != "role-unknown" and (file := find_image_in_dir("role-unknown", dir)):
        return image_static_url(file)

    if dir != IMAGE_DIR and (file := find_image_in_dir("role-unknown", IMAGE_DIR)):
        return image_static_url(file)

    return ""


@dataclass
class Role:
    slug: str
    name: str


def get_model_slug(model: Type[Model]):
    return camel_case_to_spaces(model.__name__).replace(" ", "-")


def get_model_role(model: Type[Model]) -> Role:
    return Role(
        slug=get_model_slug(model),
        name=re_camel_case.sub(r" \1", model.__name__),
    )

def get_query_settings(request):
    filter_id = ''
    if "filter_id" in request.GET:
        filter_id = request.GET["filter_id"]

    save_coords = False
    if "save_coords" in request.GET:
        if request.GET["save_coords"] == "True":
            save_coords = True
    # General options overrides
    if save_coords == True and settings.PLUGINS_CONFIG["netbox_topology_views"]["allow_coordinates_saving"] == False:
        save_coords = False
        messages.warning(request, "Coordinate saving not allowed. Setting has been overridden")
    elif settings.PLUGINS_CONFIG["netbox_topology_views"]["always_save_coordinates"] == True:
        save_coords = True

    # Individual options
    show_unconnected = False
    if "show_unconnected" in request.GET:
        if request.GET["show_unconnected"] == "True":
            show_unconnected = True

    show_power = False
    if "show_power" in request.GET:
        if request.GET["show_power"] == "True":
            show_power = True

    show_circuit = False
    if "show_circuit" in request.GET:
        if request.GET["show_circuit"] == "True":
            show_circuit = True

    show_logical_connections = False
    if "show_logical_connections" in request.GET:
        if request.GET["show_logical_connections"] == "True" :
            show_logical_connections = True

    show_single_cable_logical_conns = False
    if "show_single_cable_logical_conns" in request.GET:
        if request.GET["show_single_cable_logical_conns"] == "True" :
            show_single_cable_logical_conns = True

    show_cables = False
    if "show_cables" in request.GET:
        if request.GET["show_cables"] == "True" :
            show_cables = True

    show_wireless = False
    if "show_wireless" in request.GET:
        if request.GET["show_wireless"] == "True" :
            show_wireless = True

    group_sites = False
    if "group_sites" in request.GET:
        if request.GET["group_sites"] == "True" :
            group_sites = True

    group_locations = False
    if "group_locations" in request.GET:
        if request.GET["group_locations"] == "True" :
            group_locations = True

    group_racks = False
    if "group_racks" in request.GET:
        if request.GET["group_racks"] == "True" :
            group_racks = True

    show_neighbors = False
    if "show_neighbors" in request.GET:
        if request.GET["show_neighbors"] == "True" :
            show_neighbors = True
    
    return filter_id, save_coords, show_unconnected, show_power, show_circuit, show_logical_connections, show_single_cable_logical_conns, show_cables, show_wireless, group_sites, group_locations, group_racks, show_neighbors

class LinePattern():
    wireless = [2, 10, 2, 10]
    power = [5, 5, 3, 3]
    logical = [1, 10, 1, 10]

    
def export_data_to_xml(data: dict):
    if data is None:
        return ''

    # static xml header
    doc = xml.dom.minidom.Document()
    mxfile = doc.createElement('mxfile')
    mxfile.setAttribute('host', 'app.diagrams.net')
    mxfile.setAttribute('type', 'device')
    diagram = doc.createElement('diagram')
    diagram.setAttribute('name', 'topology')
    diagram.setAttribute('id', 'someid')

    doc.appendChild(mxfile)
    mxfile.appendChild(diagram)

    # mxGraphModel
    mxgraphmodel = doc.createElement('mxGraphModel')
    mxgraphmodel.setAttribute('dx', '0')
    mxgraphmodel.setAttribute('dy', '0')
    mxgraphmodel.setAttribute('grid', '0')
    mxgraphmodel.setAttribute('guides', '1')
    mxgraphmodel.setAttribute('tooltips', '1')
    mxgraphmodel.setAttribute('connect', '1')
    mxgraphmodel.setAttribute('arrows', '1')
    mxgraphmodel.setAttribute('fold', '1')
    mxgraphmodel.setAttribute('page', '1')
    mxgraphmodel.setAttribute('pageScale', '1')
    mxgraphmodel.setAttribute('pageWidth', '827')
    mxgraphmodel.setAttribute('pageHeight', '1169')
    mxgraphmodel.setAttribute('background', 'none')
    mxgraphmodel.setAttribute('math', '0')
    mxgraphmodel.setAttribute('shadow', '0')

    diagram.appendChild(mxgraphmodel)

    # root
    root = doc.createElement('root')

    mxgraphmodel.appendChild(root)

    # mxCells
    # header
    mxcell = doc.createElement('mxCell')
    mxcell.setAttribute('id', '0')
    root.appendChild(mxcell)
    mxcell = doc.createElement('mxCell')
    mxcell.setAttribute('id', '1')
    mxcell.setAttribute('parent', '0')
    root.appendChild(mxcell)

    # edges
    for edge in data['edges']:
        dashes = ''
        if 'dashes' in edge:
            if edge['dashes'] == LinePattern().wireless:
                dashes = 'dashed=1;dashPattern=3 6;'
            if edge['dashes'] == LinePattern().power:
                dashes = 'dashed=1;dashPattern=6 6;'
            if edge['dashes'] == LinePattern().logical:
                dashes = 'dashed=1;dashPattern=1 4;strokeWidth=2;'
            
        mxcell = doc.createElement('mxCell')
        mxcell.setAttribute('id', 'edge_' + str(edge['id']))
        mxcell.setAttribute('style', 'rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;strokeColor=' + edge['color'] + ';' + dashes)
        mxcell.setAttribute('edge', '1')
        mxcell.setAttribute('parent', '1')
        mxcell.setAttribute('source', 'node_' + str(edge['from']))
        mxcell.setAttribute('target', 'node_' + str(edge['to']))

        root.appendChild(mxcell)

        mxgeometry = doc.createElement('mxGeometry')
        mxgeometry.setAttribute('relative', '1')
        mxgeometry.setAttribute('as', 'geometry')

        mxcell.appendChild(mxgeometry)

    # nodes
    noPositionX = 0
    noPositionY = 1000
    for node in data['nodes']:
        with open(settings.STATIC_ROOT + '/' + get_image_from_url(node['image']), "rb") as img:
            svg = base64.b64encode(img.read()).decode('utf-8')
        mxcell = doc.createElement('mxCell')
        mxcell.setAttribute('id', 'node_' + str(node['id']))
        mxcell.setAttribute('value', str(node['label']))
        mxcell.setAttribute('style', 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=data:image/svg+xml,' + svg + ';perimeter=elippsePerimeter;fontSize=10;strokeWidth=1;fontColor=#000000;')
        mxcell.setAttribute('vertex', '1')
        mxcell.setAttribute('parent', '1')

        root.appendChild(mxcell)

        mxgeometry = doc.createElement('mxGeometry')
        # Check if x and y values are stored in the database and set pseudo
        # coordinates if not. Otherwise icons will not be exported / KeyError is raised
        if 'x' in node:
            mxgeometry.setAttribute('x', str(node['x']))
        else:
            # Set next pseudo coordinates
            if noPositionX > 2500:
                noPositionX = 100
                noPositionY = noPositionY + 100
            else:
                noPositionX = noPositionX + 100                

            mxgeometry.setAttribute('x', str(noPositionX))
        if 'y' in node:
            mxgeometry.setAttribute('y', str(node['y']))
        else:
            mxgeometry.setAttribute('y', str(noPositionY))

        mxgeometry.setAttribute('width', '50')
        mxgeometry.setAttribute('height', '50')
        mxgeometry.setAttribute('as', 'geometry')

        mxcell.appendChild(mxgeometry)

    # Place a warning if one or more icons are misplaced because of missing coordinates
    if noPositionX > 0:
        mxcell = doc.createElement('mxCell')
        mxcell.setAttribute('id', 'noPositionWarning')
        mxcell.setAttribute('value', 'One or more icons are misplaced. This happens if no coordinates are stored for a device. Turn on coordinates saving and make sure to drag all icons in the topology to a specific position before exporting to XML.')
        mxcell.setAttribute('style', 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#FF0000;fontStyle=0;fontSize=35;labelBackgroundColor=#FFFF99;labelBorderColor=none;strokeWidth=20;')
        mxcell.setAttribute('vertex', '1')
        mxcell.setAttribute('parent', '1')
        
        root.appendChild(mxcell)

        mxgeometry = doc.createElement('mxGeometry')
        mxgeometry.setAttribute('x', '0')
        mxgeometry.setAttribute('y', '0')
        mxgeometry.setAttribute('width', '870')
        mxgeometry.setAttribute('height', '100')
        mxgeometry.setAttribute('as', 'geometry')

        mxcell.appendChild(mxgeometry)

    # debug output
    # print(doc.toprettyxml())

    return doc.toxml(encoding='UTF-8')
    