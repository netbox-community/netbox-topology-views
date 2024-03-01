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
    
    function combineNodeLocationInfo() {
        let nodesArray = [];
        // extract node ids and node location ids from all nodes
        for (let [key, value] of nodes._data) {
            nodesArray.push([value.id, value.location_id, value.location]);
        }
        // split single array above into arrays grouped by location_id
        let groupedNodeLocationArray = nodesArray.reduce((acc, value) => {
            let key = value[1]; // group by location_id
            acc[key] = acc[key] || [];
            acc[key].push(value);
            return acc;
        }, {});

        return Object.values(groupedNodeLocationArray);
    }

    function combineNodeSiteInfo() {
        let nodesArray = [];
        // extract node ids and node site ids from all nodes
        for (let [key, value] of nodes._data) {
            nodesArray.push([value.id, value.site_id, value.site]);
        }
        // split single array above into arrays grouped by site_id
        let groupedNodeSiteArray = nodesArray.reduce((acc, value) => {
            let key = value[1]; // group by site_id
            acc[key] = acc[key] || [];
            acc[key].push(value);
            return acc;
        }, {});

        return Object.values(groupedNodeSiteArray);
    }

    graph.on('afterDrawing', (canvascontext) => {
        groupedNodeSites = combineNodeSiteInfo();
        for(let value of Object.entries(groupedNodeSites)) { 
            xValues = [];
            yValues = [];
            for(let val of value[1]) { 
                xValues.push(graph.getPosition(val[0]).x);
                yValues.push(graph.getPosition(val[0]).y);
            }
            const rectX = Math.min(...xValues) - 80
            const rectY = Math.min(...yValues) - 80
            const rectSizeX = Math.max(...xValues) - Math.min(...xValues) + 160
            const rectSizeY = Math.max(...yValues) - Math.min(...yValues) + 160
            // Draw rectangle
            canvascontext.beginPath();
            canvascontext.lineWidth = "4";
            canvascontext.strokeStyle = "red";
            canvascontext.rect(rectX, rectY, rectSizeX, rectSizeY);
            canvascontext.stroke();
    
            // Draw text
            canvascontext.font = "14px helvetica";
            canvascontext.fillStyle = "red"
            canvascontext.fillText(value[1][0][2], rectX + 8, rectY - 8); 
        }

        groupedNodeLocations = combineNodeLocationInfo();
        for(let value of Object.entries(groupedNodeLocations)) { 
            xValues = [];
            yValues = [];
            for(let val of value[1]) { 
                xValues.push(graph.getPosition(val[0]).x);
                yValues.push(graph.getPosition(val[0]).y);
            }
            const rectX = Math.min(...xValues) - 75
            const rectY = Math.min(...yValues) - 75
            const rectSizeX = Math.max(...xValues) - Math.min(...xValues) + 150
            const rectSizeY = Math.max(...yValues) - Math.min(...yValues) + 150
            // Draw rectangle
            canvascontext.beginPath();
            canvascontext.lineWidth = "4";
            canvascontext.strokeStyle = "yellow";
            canvascontext.rect(rectX, rectY, rectSizeX, rectSizeY);
            canvascontext.stroke();
    
            // Draw text
            canvascontext.font = "14px helvetica";
            canvascontext.fillStyle = "yellow"
            canvascontext.fillText(value[1][0][2], rectX + 8, rectY + 18); 
        }
    })
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
