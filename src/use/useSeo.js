const baseUrl = import.meta.env.VITE_SITE_URL

export default () => {
    const url = (route) => baseUrl + route.fullPath
    const title = (route, title) => route.meta.title(title)

    return {
        url,
        title
    }
}
