const mapping = {}
let csrftoken = null

const getCookie = (name) => {
    if (!document.cookie) return null

    const cookie = document.cookie
        .split(';')
        .find((cookie) => {
            return cookie.trim().substring(0, name.length + 1) === name + '='
        })
        ?.substring(name.length + 1)

    return cookie ? decodeURIComponent(cookie) : null
}

document.addEventListener('DOMContentLoaded', () => {
    csrftoken = getCookie('csrftoken')
})

document.querySelector('form#images').addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const res = await fetch('/api/plugins/netbox_topology_views/images/', {
            method: 'POST',
            body: JSON.stringify(mapping),
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) throw new Error(await res.text())
        toast.success('Saved settings')
    } catch (err) {
        console.dir(err)
        toast.error(err.message)
    }
})

document.querySelectorAll('form#images .dropdown-menu img').forEach((el) => {
    el.addEventListener('click', (e) => {
        if (!(e.currentTarget instanceof HTMLElement)) return
        const {
            dataset: { role, image }
        } = e.currentTarget

        mapping[parseInt(role)] = image

        const button = e.currentTarget
            .closest('.dropdown')
            ?.querySelector(`#dropdownMenuButton${role}`)
        if (button) button.innerHTML = `<img src="${image}" />`
    })
})