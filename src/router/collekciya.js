
export default [
    {
        path: '/kollektsii/',
        name: 'collections',
        meta: {
            menu: true,
            title: 'page.collections.title',
            description: 'page.collections.description'
        },
        component: () => import('@/views/Collections.vue')
    },
    {
        path: '/kollektsiya/:id/',
        name: 'collection',
        component: () => import('@/views/Collection.vue'),
        meta: {
            title: 'page.collection.title'
        }

    }
]
