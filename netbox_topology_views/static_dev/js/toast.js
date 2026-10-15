export const toast = {
    success: (message) => {
        const el = document.querySelector('#topology-plugin-success-toast')
        if (!el) return console.error('Could not find toast component!')
        const content = el.querySelector('span')
        content.textContent = message
        window.Toast.getOrCreateInstance(el).show()
    },
    error: (message) => {
        const el = document.querySelector('#topology-plugin-error-toast')
        if (!el) return console.error('Could not find toast component!')
        const content = el.querySelector('span')
        content.textContent = message
        window.Toast.getOrCreateInstance(el).show()
    }
}
