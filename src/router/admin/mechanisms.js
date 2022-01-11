const base = 'admin'
const entry = 'mechanisms'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-cog',
            shortcut: false,
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
