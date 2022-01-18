import isAdmin from '@/middleware/isAdmin'

const base = 'admin'
const entry = 'colors'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        beforeEnter: [isAdmin],
        meta: {
            title: `${entry}`,
            icon: 'fal fa-palette',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Colors/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Colors/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Colors/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
