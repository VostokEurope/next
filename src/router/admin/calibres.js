import isAdmin from '@/middleware/isAdmin'

const base = 'admin'
const entry = 'calibres'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        beforeEnter: [isAdmin],
        meta: {
            title: `${entry}`,
            icon: 'fal fa-moon',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Calibres/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Calibres/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Calibres/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
