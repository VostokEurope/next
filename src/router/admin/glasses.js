const base = 'admin'
const entry = 'glasses'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-lightbulb',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Glasses/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Glasses/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Glasses/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
