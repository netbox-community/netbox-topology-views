var graph = null;
var container = null;

function iniPlotboxFull() {
    document.addEventListener('DOMContentLoaded', function () {
        container = document.getElementById('fullvisgraph');
        startRender();
    }, false);
}

function startRender() {
  var url = location.search;

  $.ajax({
    type: "GET",
    url: "../../api/plugins/topology-views/search/search/" + url,
    contentType: "application/json; charset=utf-8",
    success: function (data_result, status, xhr) {
        graph = null;
        nodes = new vis.DataSet();
        edges = new vis.DataSet();
        graph = new vis.Network(container, { nodes: nodes, edges: edges }, options);
        $.each(data_result["nodes"], function (index, device) {
            nodes.add(device);
        });
        $.each(data_result["edges"], function (index, edge) {
            edges.add(edge);
        });
        graph.fit();
        canvas = document.getElementById('fullvisgraph').getElementsByTagName('canvas')[0];
    },
    error: function (error_result) {
       
    },
});
}