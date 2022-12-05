import { DataSet } from 'vis-data/esnext'
import { Network } from 'vis-network/esnext'

let graph = null

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

const MIME_TYPE = 'image/png'

const csrftoken = getCookie('csrftoken')
const container = document.querySelector('#visgraph')
const downloadButton = document.querySelector('#btnDownloadImage')
const coordSaveCheckbox = document.querySelector('#id_save_coords')
handleLoadData()

downloadButton.addEventListener('click', (e) => {
    performGraphDownload()
})

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

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                )
                break
            }
        }
    }
    return cookieValue
}

function htmlTitle(text) {
    const container = document.createElement('div')
    container.innerHTML = text
    return container
}

function performGraphDownload() {
    const canvas = container.querySelector('#visgraph canvas')
    const tempDownloadLink = document.createElement('a')
    const generatedImageUrl = canvas.toDataURL(MIME_TYPE)

    tempDownloadLink.href = generatedImageUrl
    tempDownloadLink.download = 'topology'
    document.body.appendChild(tempDownloadLink)
    tempDownloadLink.click()
    document.body.removeChild(tempDownloadLink)
}

function handleLoadData() {
    if (!topologyData) return

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
}
