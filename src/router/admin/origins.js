import isAdmin from '@/middleware/isAdmin'

const base = 'admin'
const entry = 'origins'



export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        beforeEnter: [isAdmin],
        meta: {
            title: `${entry}`,
            icon: 'fal fa-flag',
            shortcut: false,
            admin: true,
            robots: 'noindex,nofollow'
        },
        component: () => import('@/views/Admin/Origins/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Origins/Edit.vue'),
        meta: {
            title: `${entry} Edit`,
            robots: 'noindex,nofollow'
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        beforeEnter: [isAdmin],
        component: () => import('@/views/Admin/Origins/Edit.vue'),
        meta: {
            title: `${entry} New`,
            robots: 'noindex,nofollow'
        },
    }
]
