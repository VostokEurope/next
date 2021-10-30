export default [
    {
        path: '/collekciya/',
        name: 'collections',
        meta: {
            menu: true
        },
        component: () => import('@/views/Collections.vue')
    },
    {
        path: '/collekciya/:id/',
        name: 'collection',
        component: () => import('@/views/Collection.vue')
    }
]
