const base = 'admin'
const entry = 'coatings'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-adjust',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Coatings/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Coatings/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Coatings/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
