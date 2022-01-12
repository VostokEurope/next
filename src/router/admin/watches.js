const base = 'admin'
const entry = 'watches'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-watch',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Watches/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Watches/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Watches/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
