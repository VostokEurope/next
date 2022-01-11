const base = 'admin'
const entry = 'watches'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-watch',
            shortcut: true,
            admin: true
        },
        component: () => import('@/views/Admin/AdminHome.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/AdminHome.vue'),
        meta: {
            title: `${entry} Edit`
        },
    }
]
