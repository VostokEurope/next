import { useI18n } from "vue-i18n"
import { useMeta } from "vue-meta"
import { useRoute } from "vue-router"

const baseUrl = import.meta.env.VITE_SITE_URL

export default (context = {}) => {
    const route = useRoute()
    const url = baseUrl + route?.fullPath
    const { t } = useI18n()
    const title = (newContext) =>(newContext || context)?.title || t(route?.meta?.title || '', newContext || context || {})
    const description = (newContext) => (newContext || context)?.description || t(route?.meta?.description || '', newContext || context || {})

    const { meta } = useMeta({
        title: title(),
        description: description()
    })

    const setMetas = (context) => {
        const _title = title(context)
        const _description = description(context)

        meta.title = _title
        meta.description = _description
        meta.meta =  [
            // Primary Meta Tags
            { name: 'title', content:  _title, },
            { name: 'description', content: _description },
            // Open Graph / Facebook
            { property: 'og:type', content: 'shop' },
            { property: 'og:url', content: url },
            { property: 'og:title', content:  _title, },
            { property: 'og:description', content: _description},
            // Twitter
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:url', content: url },
            { property: 'twitter:title', content: _title },
            { property: 'twitter:description', content: _description },
            { name: 'robots', content: route.meta?.robots ? route.meta?.robots : 'index,follow' }
        ]

    }

    setMetas()

    return {
        url,
        title,
        setMetas
    }
}
