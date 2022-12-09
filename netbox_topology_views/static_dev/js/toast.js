export const toast = {
    success: (message) => {
        const el = document.querySelector('#topology-plugin-success-toast')
        if (!el) return console.error('Could not find toast component!')
        const content = el.querySelector('span')
        content.textContent = message
        const toast = new window.Toast(el)
        toast.show()
    },
    error: (message) => {
        const el = document.querySelector('#topology-plugin-error-toast')
        if (!el) return console.error('Could not find toast component!')
        const content = el.querySelector('span')
        content.textContent = message
        const toast = new window.Toast(el)
        toast.show()
    }
}
