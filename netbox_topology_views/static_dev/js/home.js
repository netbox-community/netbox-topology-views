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
        container = document.getElementById('visgraph');
        handleLoadData();
        downloadButton = document.getElementById('btnDownloadImage');
        btnFullView = document.getElementById('btnFullView');
    }, false);
}

function handleLoadData() {

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

}
