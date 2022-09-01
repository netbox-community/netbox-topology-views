import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
//import 'vis-util';


var graph = null;
var container = null;
var downloadButton = null;
const MIME_TYPE = "image/png";
var canvas = null;
var csrftoken = null;
var nodes = new DataSet();
var edges = new DataSet();
var options = {
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        multiselect: false
    },
    nodes: {
        shape: 'image',
        brokenImage: '../../static/netbox_topology_views/img/role-unknown.png',
        size: 35,
        font: {
            multi: 'md',
            face: 'helvetica',
        },
    },
    edges: {
        length: 100,
        width: 2,
        font: {
            face: 'helvetica',
        },
        shadow: {
            enabled: true
        }
    },
    physics: {
        solver: 'forceAtlas2Based'
    }
};
var selected_regions = [];
var selected_sites = [];
var coord_save_checkbox = null;
var htmlElement = null;

export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


export function htmlTitle(html) {
    container = document.createElement("div");
    container.innerHTML = html;
    return container;
};

export function addEdge(item) {
    item.title = htmlTitle( item.title );
    edges.add(item);
};

export function addNode(item) {
    item.title = htmlTitle( item.title );
    nodes.add(item);
}

export function iniPlotboxIndex() {
    csrftoken = getCookie('csrftoken');
    container = document.getElementById('visgraph');
    htmlElement = document.getElementsByTagName("html")[0];
    downloadButton = document.getElementById('btnDownloadImage');
    handleLoadData();
    btnFullView = document.getElementById('btnFullView');
    coord_save_checkbox = document.getElementById('id_save_coords');
};

export function performGraphDownload() {
    var tempDownloadLink = document.createElement('a');
    var generatedImageUrl = canvas.toDataURL(MIME_TYPE);

    tempDownloadLink.href = generatedImageUrl;
    tempDownloadLink.download = "topology";
    document.body.appendChild(tempDownloadLink);
    tempDownloadLink.click();
    document.body.removeChild(tempDownloadLink);
};

export function handleLoadData() {
    if (topology_data !== null) {
        
        if (htmlElement.dataset.netboxColorMode == "dark") {
            options.nodes.font.color = "#fff";
        }

        graph = null;
        nodes = new DataSet();
        edges = new DataSet();
        graph = new Network(container, { nodes: nodes, edges: edges }, options);
        
        topology_data.edges.forEach(addEdge);
        topology_data.nodes.forEach(addNode);

        graph.fit();
        canvas = document.getElementById('visgraph').getElementsByTagName('canvas')[0];

        downloadButton.onclick = function(e) { performGraphDownload(); return false; };

        graph.on("dragEnd", function (params) {
            dragged = this.getPositions(params.nodes);

            if (coord_save_checkbox.checked) {
                if (Object.keys(dragged).length !== 0) {
                    for (dragged_device in dragged) {
                        var node_id = dragged_device;

                        var url = "/api/plugins/netbox_topology_views/save-coords/save_coords/";
                        var xhr = new XMLHttpRequest();
                        xhr.open("PATCH", url);
                        xhr.setRequestHeader('X-CSRFToken', csrftoken );
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
    
                        xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            console.log(xhr.status);
                        }};
    
                        var data = JSON.stringify({
                            'node_id': node_id,
                            'x': dragged[node_id].x,
                            'y': dragged[node_id].y});
    
                        xhr.send(data);
                    }
                }
            }
        });

        graph.on("doubleClick", function (params) {
            let selected_devices = params.nodes;
            for (let selected_device in selected_devices) {
                let url = ""
                if(String(selected_devices[selected_device]).startsWith("c")) {
                    cid = selected_devices[selected_device].substring(1);
                    url = "/circuits/circuits/" + cid + "/";
                }
                else if (String(selected_devices[selected_device]).startsWith("p")) {
                    cid = selected_devices[selected_device].substring(1);
                    url = "/dcim/power-panels/" + cid + "/";
                }
                else if (String(selected_devices[selected_device]).startsWith("f")) {
                    cid = selected_devices[selected_device].substring(1);
                    url = "/dcim/power-feeds/" + cid + "/";
                }
                else {
                    url = "/dcim/devices/" + selected_devices[selected_device] + "/";
                }
                
                window.open(url, "_blank");
            }

        });
    }
};

export function load_doc() {
    if (document.readyState !== 'loading') {
        iniPlotboxIndex();
      } else {
        document.addEventListener('DOMContentLoaded', iniPlotboxIndex);
    }
};


load_doc();
