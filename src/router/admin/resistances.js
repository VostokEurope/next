import isAdmin from '@/middleware/isAdmin'

const base = 'admin'
const entry = 'resistances'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        beforeEnter: [isAdmin],
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
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Resistances/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Resistances/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
