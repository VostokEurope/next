const base = 'admin'
const entry = 'bracelets'

export default [
    {
        path: `${entry}`,
        name: `${base}-${entry}`,
        meta: {
            title: `${entry}`
        },
        component: () => import('@/views/Admin/Bracelets/Browse.vue'),
    },
    {
        path: `${entry}/:id`,
        name: `${base}-${entry}-edit`,
        component: () => import('@/views/Admin/Bracelets/Edit.vue'),
        meta: {
            title: `${entry} Edit`
        },
    }
]
