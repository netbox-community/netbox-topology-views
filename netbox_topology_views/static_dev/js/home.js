var graph = null;
var container = null;
var downloadButton = null;
var MIME_TYPE = "image/png";
var canvas = null;
var csrftoken = null;
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
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
    },
    physics: {
        solver: 'forceAtlas2Based'
    }
};
var selected_regions = [];
var selected_sites = [];
var coord_save_checkbox = null;

function getCookie(name) {
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
}


function htmlTitle(html) {
    container = document.createElement("div");
    container.innerHTML = html;
    return container;
  }

function addEdge(item) {
    item.title = htmlTitle( item.title );
    edges.add(item);
}

function addNode(item) {
    item.title = htmlTitle( item.title );
    nodes.add(item);
}

function iniPlotboxIndex() {
    document.addEventListener('DOMContentLoaded', function () {
        csrftoken = getCookie('csrftoken');
        container = document.getElementById('visgraph');
        handleLoadData();
        downloadButton = document.getElementById('btnDownloadImage');
        btnFullView = document.getElementById('btnFullView');
        coord_save_checkbox = document.getElementById('id_save_coords');
    }, false);
}

function handleLoadData() {
    if (topology_data !== null) {
        graph = null;
        nodes = new vis.DataSet();
        edges = new vis.DataSet();
        graph = new vis.Network(container, { nodes: nodes, edges: edges }, options);
        
        topology_data.edges.forEach(addEdge);
        topology_data.nodes.forEach(addNode);

        graph.fit();
        canvas = document.getElementById('visgraph').getElementsByTagName('canvas')[0];

        graph.on('afterDrawing', function () {
            var image = canvas.toDataURL(MIME_TYPE);
            downloadButton.href = image;
            downloadButton.download = "topology";
        });

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
                            console.log(xhr.responseText);
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
    }
}
