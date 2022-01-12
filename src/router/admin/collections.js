const base = 'admin'
const entry = 'collections'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-border-all',
            shortcut: true,
            admin: true
        },
        component: () => import('@/views/Admin/Collections/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Collections/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Collections/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
