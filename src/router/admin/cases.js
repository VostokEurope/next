const base = 'admin'
const entry = 'cases'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-copyright',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Cases/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Cases/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Cases/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
