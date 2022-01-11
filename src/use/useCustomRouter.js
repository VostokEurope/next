import { useRouter } from "vue-router"

export default () => {
    const router = useRouter()
    const paths = router.options.routes
    const flatRoutes = router.options.routes.flatMap(path => path.children || path)

    const getNavPath = () => flatRoutes.filter((path) => path.meta?.menu)
    const getAdminNav = () => flatRoutes.filter((path) => path.meta?.admin)
    const getAdminShortcuts = () => flatRoutes.filter((path) => path.meta?.shortcut)

    return {
        paths,
        getNavPath,
        getAdminNav,
        getAdminShortcuts
    }
}
