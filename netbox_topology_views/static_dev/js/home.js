import { DataSet } from 'vis-data/esnext'
import { Network } from 'vis-network/esnext'
import { getCookie } from './csrftoken.js'

const options = {
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        multiselect: true
    },
    nodes: {
        shape: 'image',
        brokenImage: brokenImage ?? '',
        size: 35,
        font: {
            multi: 'md',
            face: 'helvetica',
            color:
                document.documentElement.dataset.netboxColorMode === 'dark'
                    ? '#fff'
                    : '#000'
        }
    },
    edges: {
        length: 100,
        width: 2,
        font: {
            face: 'helvetica'
        },
        shadow: {
            enabled: true
        }
    },
    physics: {
        solver: 'forceAtlas2Based'
    }
}

// Load CSRF token
const csrftoken = getCookie('csrftoken')

// Render vis graph
let graph = null // vis graph instance

let searchParams = new URLSearchParams(window.location.search)
let group_sites = searchParams.get('group_sites')
let group_locations = searchParams.get('group_locations')
let group_racks = searchParams.get('group_racks')

const container = document.querySelector('#visgraph')
const coordSaveCheckbox = document.querySelector('#id_save_coords')
;(function handleLoadData() {
    if (!topologyData) return

    function htmlTitle(text) {
        const container = document.createElement('div')
        container.innerHTML = text
        return container
    }

    const nodes = new DataSet(
        topologyData.nodes.map((node) => ({
            ...node,
            title: htmlTitle(node.title)
        }))
    )

    // make nodes object available globally in order to update their physics and positions later
    window.nodes = nodes;

    const edges = new DataSet(
        topologyData.edges.map((node) => ({
            ...node,
            title: htmlTitle(node.title)
        }))
    )
    graph = new Network(container, { nodes, edges }, options)
    graph.fit()

    graph.on('dragEnd', (params) => {
        if (coordSaveCheckbox == null) return
        if (!coordSaveCheckbox.checked) return

        Promise.allSettled(
            Object.entries(graph.getPositions(params.nodes)).map(
                async ([nodeId, nodePosition]) => {
                    if(!isNaN(parseInt(nodeId))) { 
                        nodeKey = parseInt(nodeId);
                    }
                    else {
                        nodeKey = nodeId;
                    }

                    try {
                        window.nodes.update({id: nodeKey, physics: false, x: nodePosition.x, y: nodePosition.y});
                    }
                    catch (e) {
                        console.log([
                            'Error while executing window.nodes.update()', 
                            'nodeId: ' + nodeId, 
                            'nodeKey: ' + nodeKey, 
                            'x: ' + nodePosition.x, 
                            'y: ' + nodePosition.y
                        ]);
                        console.log(e);
                    }
                    const res = await fetch(
                        '/' + basePath + 'api/plugins/netbox_topology_views/save-coords/save_coords/',
                        {
                            method: 'PATCH',
                            headers: {
                                'X-CSRFToken': csrftoken,
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                node_id: nodeId,
                                x: nodePosition.x,
                                y: nodePosition.y,
                                group: topologyData.group
                            })
                        }
                    )
                }
            )
        )
    })

    graph.on('doubleClick', (params) => {
        if (params.nodes.length > 0) {
            params.nodes.forEach((node) => {
                window.open(nodes.get(node).href, '_blank')
            })
        }
        else {
            params.edges.forEach((edge) => {
                window.open(edges.get(edge).href, '_blank')
            })
        }
    })

    graph.on('afterDrawing', (canvascontext) => {
        allRectangles = [];
        if(group_sites != null && group_sites == 'on') { drawGroupRectangles(canvascontext, groupedNodeSites, siteRectParams); }
        if(group_locations != null && group_locations == 'on') { drawGroupRectangles(canvascontext, groupedNodeLocations, locationRectParams); }
        if(group_racks != null && group_racks == 'on') { drawGroupRectangles(canvascontext, groupedNodeRacks, rackRectParams); }
    })

    graph.on('click', (canvascontext) => {
        allRectangles.forEach(key => {
            // Is the mouse pointer inside of the current rectangle?
            if(canvascontext.pointer.canvas.x > (key.x1 - key.border / 2 - 1) && canvascontext.pointer.canvas.x < (key.x2 + key.border / 2 + 1)
                && canvascontext.pointer.canvas.y > (key.y1 - key.border / 2 - 1) && canvascontext.pointer.canvas.y < (key.y2 + key.border / 2 + 1)) {
                // We just want to react when the border has been clicked, not the whole rectangle
                if (canvascontext.pointer.canvas.x < (key.x1 + key.border / 2 + 1) || canvascontext.pointer.canvas.x > (key.x2 - key.border / 2 - 1)
                    || canvascontext.pointer.canvas.y < (key.y1 + key.border / 2 + 1) || canvascontext.pointer.canvas.y > (key.y2 - key.border / 2 - 1)) {
                    // Generate an array of affected nodes in order to pass it to the select.Nodes() function
                    let arr = [];
                    if(key.category == "Site") {
                        groupedNodeSites.forEach(subArray => {
                            subArray.forEach(element => {
                                if (element[1] == key.id) {
                                    arr.push(element[0]);
                                }
                            });
                        });
                    }
                    if(key.category == "Location") {
                        groupedNodeLocations.forEach(subArray => {
                            subArray.forEach(element => {
                                if (element[1] === key.id) {
                                    arr.push(element[0]);
                                }
                            });
                        });
                    }
                    if(key.category == "Rack") {
                        groupedNodeRacks.forEach(subArray => {
                            subArray.forEach(element => {
                                if (element[1] === key.id) {
                                    arr.push(element[0]);
                                }
                            });
                        });
                    }
                    graph.selectNodes(arr);
                }
            }
        });
    })

    // Add information on which node belongs to which group (site/location/rack).
    // Create an array for each group in order to loop through that arrays later
    function combineNodeInfo(typeId, type) {
        let nodesArray = [];
        // Extract node ids and node type ids from all nodes
        for (let [key, value] of nodes._data) {
            if (value[typeId] != undefined) {
                nodesArray.push([value.id, value[typeId], value[type]]);
            }
        }
        // Split single array above into arrays grouped by node id
        let groupedNodeArray = nodesArray.reduce((acc, value) => {
            let key = value[1]; // node id
            acc[key] = acc[key] || [];
            acc[key].push(value);
            return acc;
        }, {});

        return Object.values(groupedNodeArray);
    }

    var allRectangles = [];
    /* Draw a single rectangle with given parameters
        rectangle expects an object that consists of the following keys:
        ctx: canvas context on which the rectangle should be drawn
        x: x-coordinate of top left point of the rectangle
        y: y-coordinate of top left point of the rectangle 
        width: width of rectangle 
        height: height of rectangle 
        lineWidth: border width 
        color: border color 
        text: a string to be placed where you want it to be
        textPaddingX: x-position of the text 
        textPaddingY: y-position of the text
        font: text font */
    function drawGroupRectangle(rectangle) {
        // Draw rectangle
        rectangle.ctx.beginPath();
        rectangle.ctx.lineWidth = rectangle.lineWidth;
        rectangle.ctx.strokeStyle = rectangle.color;
        rectangle.ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        rectangle.ctx.stroke();
        // Draw text
        rectangle.ctx.font = rectangle.font;
        rectangle.ctx.fillStyle = rectangle.color;
        rectangle.ctx.fillText(rectangle.text, rectangle.x + rectangle.textPaddingX, rectangle.y + rectangle.textPaddingY); 

        allRectangles.push({category: rectangle.category, id: rectangle.id, x1: rectangle.x, y1: rectangle.y, x2: rectangle.x + rectangle.width, y2: rectangle.y + rectangle.height, border: rectangle.lineWidth})
    }

    /* Draw all rectangles of a given group (site/location/rack)
        rectParams expects an object that consists of the following keys:
        lineWidth: border width (string)
        color: border color (string)
        paddingX: rectangle x-padding, calculated from the center of a node (int)
        paddingY: rectangle y-padding, calculated from the center of a node (int)
        textPaddingX: text x-padding, calculated from the lower left point of the text (int)
        textPaddingY: text y-padding, calculated from the lower left point of the text (int)
        font: css-like font size and font (string) */
    function drawGroupRectangles(canvascontext, groupedNodes, rectParams) {
        for(let value of Object.entries(groupedNodes)) { 
            const rectangles = [];
            const xValues = [];
            const yValues = [];

            for(let val of value[1]) { 
                xValues.push(graph.getPosition(val[0]).x);
                yValues.push(graph.getPosition(val[0]).y);
            }

            const rectX = Math.min(...xValues) - rectParams.paddingX;
            const rectY = Math.min(...yValues) - rectParams.paddingY;
            const rectSizeX = Math.max(...xValues) - Math.min(...xValues) + 2*rectParams.paddingX;
            const rectSizeY = Math.max(...yValues) - Math.min(...yValues) + 2*rectParams.paddingY;

            rectangles.push({
                ctx: canvascontext, 
                x: rectX, 
                y: rectY, 
                width: rectSizeX, 
                height: rectSizeY, 
                lineWidth: rectParams.lineWidth, 
                color: rectParams.color, 
                text: value[1][0][2], 
                textPaddingX: rectParams.textPaddingX, 
                textPaddingY: rectParams.textPaddingY, 
                font: rectParams.font,
                id: value[1][0][1],
                category: rectParams.category
            });

            rectangles.forEach(function(rectangle) {
                drawGroupRectangle(rectangle);
            });
        }
    }

    let groupedNodeSites = combineNodeInfo('site_id', 'site');
    let siteRectParams = {
        lineWidth: "5", 
        color: "red",
        paddingX: 84, 
        paddingY: 84, 
        textPaddingX: 8, 
        textPaddingY: -8, 
        font: "14px helvetica",
        category: "Site"
    }
    
    let groupedNodeLocations = combineNodeInfo('location_id', 'location');
    let locationRectParams = {
        lineWidth: "5", 
        color: "yellow",
        paddingX: 77, 
        paddingY: 77, 
        textPaddingX: 12, 
        textPaddingY: 22, 
        font: "14px helvetica",
        category: "Location"
    }

    let groupedNodeRacks = combineNodeInfo('rack_id', 'rack');
    let rackRectParams = {
        lineWidth: "5", 
        color: "green",
        paddingX: 70, 
        paddingY: 70, 
        textPaddingX: 8, 
        textPaddingY: 30, 
        font: "14px helvetica",
        category: "Rack"
    }
})()

// Download Graph
const MIME_TYPE = 'image/png'

const downloadButton = document.querySelector('#btnDownloadImage')
downloadButton.addEventListener('click', (e) => {
    performGraphDownload()
})

function performGraphDownload() {
    const canvas = container.querySelector('canvas')
    const tempDownloadLink = document.createElement('a')
    const generatedImageUrl = canvas.toDataURL(MIME_TYPE)

    tempDownloadLink.href = generatedImageUrl
    tempDownloadLink.download = 'topology'
    document.body.appendChild(tempDownloadLink)
    tempDownloadLink.click()
    document.body.removeChild(tempDownloadLink)
}

// Download XML
const downloadXmlButton = document.querySelector('#btnDownloadXml')
downloadXmlButton.addEventListener('click', (e) => {
    performXmlDownload()
})

function performXmlDownload() {

    const tempDownloadLink = document.createElement('a');

    let xml_search_options = '';

    if (typeof is_htmx !== 'undefined') {
        var curr_url = window.location.href;
        const sites_prefix = '/sites/'
        const location_prefix = '/locations/'
        if (curr_url.includes(sites_prefix)) {
            var site_id =  curr_url.split(sites_prefix)[1];
            site_id = site_id.split('/')[0]
            xml_search_options = 'site_id=' + site_id + '&show_cables=on&show_unconnected=on'
        }
        else if (curr_url.includes(location_prefix)) {
            var location_id =  curr_url.split(location_prefix)[1];
            location_id = location_id.split('/')[0]
            xml_search_options = 'location_id=' + location_id + '&show_cables=on&show_unconnected=on'
        }
    }
    else {
        xml_search_options = new URLSearchParams(window.location.search);
    }

    

    fetch('/' + basePath + 'api/plugins/netbox_topology_views/xml-export/?' + xml_search_options).then(response => response.text())
    .then(data => {
        var blob = new Blob([data ], { type: "text/plain" });

        tempDownloadLink.setAttribute("href", window.URL.createObjectURL(blob));
        tempDownloadLink.setAttribute("download", 'topology.xml');

        tempDownloadLink.dataset.downloadurl = ["text/plain", tempDownloadLink.download, tempDownloadLink.href].join(":");

        tempDownloadLink.click();

    });
}

// Theme switching
const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) => {
        if (
            !graph ||
            mutation.type !== 'attributes' ||
            mutation.attributeName !== 'data-netbox-color-mode' ||
            !(mutation.target instanceof HTMLElement)
        )
            return
        const { netboxColorMode } = mutation.target.dataset
        options.nodes.font.color = netboxColorMode === 'dark' ? '#fff' : '#000'
        graph.setOptions(options)
    })
)

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-netbox-color-mode']
})
