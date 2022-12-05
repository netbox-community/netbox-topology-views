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

    const edges = new DataSet(
        topologyData.edges.map((node) => ({
            ...node,
            title: htmlTitle(node.title)
        }))
    )
    graph = new Network(container, { nodes, edges }, options)
    graph.fit()

    graph.on('dragEnd', function (params) {
        if (!coordSaveCheckbox.checked) return

        Promise.allSettled(
            this.getPositions(params.nodes).map(async (node) => {
                const res = await fetch(
                    '/api/plugins/netbox_topology_views/save-coords/',
                    {
                        method: 'PATCH',
                        headers: {
                            'X-CSRFToken': csrftoken,
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            node_id: node,
                            x: node.x,
                            y: node.y
                        })
                    }
                )

                console.log(node, res.status, res.statusText)
            })
        )
    })

    graph.on('doubleClick', function (params) {
        params.nodes.forEach((node) => {
            window.open(nodes.get(node).href, '_blank')
        })
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
