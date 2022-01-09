export default [
    {
        path: '/kollektsii/',
        name: 'collections',
        meta: {
            menu: true
        },
        component: () => import('@/views/Collections.vue')
    },
    {
        path: '/kollektsiya/:id/',
        name: 'collection',
        component: () => import('@/views/Collection.vue')
    }
]
