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

function iniPlotboxIndex() {
    document.addEventListener('DOMContentLoaded', function () {
        container = document.getElementById('visgraph');
        csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        startLoadSearchBar();
        handleButtonPress();
        downloadButton = document.getElementById('btnDownloadImage');
        btnFullView = document.getElementById('btnFullView');
    }, false);
}

function startLoadSearchBar() {
    $('#device-roles').select2({
        allowClear: true,
        placeholder: "---------",
        theme: "bootstrap",
        multiple: true,
        ajax: {
            url: "../../api/dcim/device-roles/?brief=true",
            dataType: "json",
            type: "GET",
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
    $('#sites').select2({
        allowClear: true,
        placeholder: "---------",
        theme: "bootstrap",
        multiple: true,
        ajax: {
            url: function (params) { 
                var base_url = "../../api/dcim/sites/?brief=true";
                if (selected_regions.length == 0) {
                    return base_url;
                }
                else {
                    for (var i = 0; i < selected_regions.length; i++) {
                        var tmp = "&region_id=" + selected_regions[i];
                        base_url = base_url + tmp;
                    }
                    return base_url;
                }

            },
            dataType: "json",
            type: "GET",
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });

    $('#sites').on('select2:select', function (e) {
        var data = e.params.data;
        var index = selected_sites.indexOf(data.id.toString());
        if (index == -1) {
            selected_sites.push(data.id.toString());
        }
    });
    $('#sites').on('select2:unselect', function (e) {
        var data = e.params.data;
        var index = selected_sites.indexOf(data.id.toString());
        if (index > -1) {
            selected_sites.splice(index, 1);
          }
    });
    $('#sites').on('select2:clear', function (e) {
        selected_sites = [];
    });

    $('#tags').select2({
        allowClear: true,
        placeholder: "---------",
        theme: "bootstrap",
        multiple: true,
        ajax: {
            url: "../../api/extras/tags/?brief=true",
            dataType: "json",
            type: "GET",
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
    $('#regions').select2({
        allowClear: true,
        placeholder: "---------",
        theme: "bootstrap",
        multiple: true,
        ajax: {
            url: "../../api/dcim/regions/?brief=true",
            dataType: "json",
            type: "GET",
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });

    $('#regions').on('select2:select', function (e) {
        var data = e.params.data;
        var index = selected_regions.indexOf(data.id.toString());
        if (index == -1) {
            selected_regions.push(data.id.toString());
        }
    });
    $('#regions').on('select2:unselect', function (e) {
        var data = e.params.data;
        var index = selected_regions.indexOf(data.id.toString());
        if (index > -1) {
            selected_regions.splice(index, 1);
          }
    });
    $('#regions').on('select2:clear', function (e) {
         selected_regions = [];
    });

    $('#locations').select2({
        allowClear: true,
        placeholder: "---------",
        theme: "bootstrap",
        multiple: true,
        ajax: {
            url: function (params) { 
                var base_url = "../../api/dcim/locations/?brief=true";
                if (selected_sites.length == 0) {
                    return base_url;
                }
                else {
                    for (var i = 0; i < selected_sites.length; i++) {
                        var tmp = "&site_id=" + selected_sites[i];
                        base_url = base_url + tmp;
                    }
                    return base_url;
                }

            },
            dataType: "json",
            type: "GET",
            data: function (params) {
                var queryParameters = {
                    q: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });


    var deviceRolesSelect = $('#device-roles');
    $.ajax({
        type: 'GET',
        url: '../../api/plugins/topology-views/preselectdeviceroles/'
    }).then(function (data) {
        $.each(data.results, function (index, device_role_to_preload) {
            var option = new Option(device_role_to_preload.name, device_role_to_preload.id, true, true);
            deviceRolesSelect.append(option).trigger('change');
            deviceRolesSelect.trigger({
                type: 'select2:select',
                params: {
                    data: device_role_to_preload
                }
            });
        });
    });

    var tagsSelect = $('#tags');
    $.ajax({
        type: 'GET',
        url: '../../api/plugins/topology-views/preselecttags/'
    }).then(function (data) {
        $.each(data.results, function (index, tags_to_preload) {
            var option = new Option(tags_to_preload.name, tags_to_preload.id, true, true);
            tagsSelect.append(option).trigger('change');
            tagsSelect.trigger({
                type: 'select2:select',
                params: {
                    data: tags_to_preload
                }
            });
        });
    });
}

function handleButtonPress() {
    $("#search-form").submit(function (event) {
        $("#status").html('<span class="label  label-info">Loading data</span>');
        event.preventDefault();
        var value = $("#name").val();
        var value2 = $("#device-roles").val();
        var value3 = $("#sites").val();
        var value4 = $("#tags").val();
        var value5 = $("#regions").val();
        var value6 = $('#checkHideUnconnected').is(":checked");
        var value7 = $("#locations").val();
        $.ajax({
            type: "GET",
            url: "../../api/plugins/topology-views/search/search/",
            data: {
                'name': value,
                'devicerole[]': value2,
                'sites[]': value3,
                'tags[]': value4,
                'regions[]': value5,
                'hide_unconnected': value6,
                'locations[]': value7
            },
            headers: { "X-CSRFToken": csrftoken },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function(){ 
                new_url = this.url.split("../../api/plugins/topology-views/search/search/?");
                new_url = new_url[1];
                new_url = "../../plugins/topology-views/full?" + new_url

                btnFullView.classList.remove("disabled");
                btnFullView.href = new_url;
            },
            success: function (data_result, status, xhr) {
                $("#status").html('<span class="label  label-info">Drawing network</span>');
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
                canvas = document.getElementById('visgraph').getElementsByTagName('canvas')[0];

                graph.on('afterDrawing', function () {
                    $("#status").html('<span class="label label-success">Ready</span>');
                    var image = canvas.toDataURL(MIME_TYPE);
                    downloadButton.href = image;
                    downloadButton.download = "topology";
                });

                graph.on("dragEnd", function (params) {
                    dragged = this.getPositions(params.nodes);
                    $.each(dragged, function (node_id, coordinates) {
                        $("#coordstatus").html('');
                        if ($('#checkSaveCoordinates').is(":checked")) {
                            //nodes.update({ id: node_id, physics: false });
                            $.ajax({
                                url: "../../api/plugins/topology-views/save-coords/save_coords/",
                                type: 'PATCH',
                                dataType: 'json',
                                headers: { "X-CSRFToken": csrftoken },
                                contentType: "application/json; charset=utf-8",
                                processData: false,
                                data: JSON.stringify({
                                    'node_id': node_id,
                                    'x': coordinates.x,
                                    'y': coordinates.y
                                }),
                                error: function (error_result) {
                                    $("#coordstatus").html('<span class="label label-warning">Failed to update coordinates</span>');
                                },
                                success: function (data_result) {
                                    $("#coordstatus").html('<span class="label label-success">Updated coordinates</span>');
                                },
                            });
                        }
                    });
                });

            },
            error: function (error_result) {
                $("#status").html('<span class="label label-warning">Something went wrong</span>');
            },
        });
    });
}
