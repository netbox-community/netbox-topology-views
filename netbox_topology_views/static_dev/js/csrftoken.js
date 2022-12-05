export const getCookie = (name) => {
    if (!document.cookie) return null

    const cookie = document.cookie
        .split(';')
        .find((cookie) => {
            return cookie.trim().substring(0, name.length + 1) === name + '='
        })
        ?.substring(name.length + 1)

    return cookie ? decodeURIComponent(cookie) : null
}
