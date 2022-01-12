const base = 'admin'
const entry = 'mechanisms'



export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`,
            icon: 'fal fa-cog',
            shortcut: false,
            admin: true
        },
        component: () => import('@/views/Admin/Mechanisms/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Mechanisms/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    },
    {
        path: `${entry}/new`,
        name: `${base}-${entry}-new`,
        component: () => import('@/views/Admin/Mechanisms/Edit.vue'),
        meta: {
            title: `${entry} New`
        },
    }
]
