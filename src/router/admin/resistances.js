const base = 'admin'
const entry = 'resistances'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-gem',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Resistances/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Resistances/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Resistances/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
