export default [
    {
        path: '/chasy/:id/',
        name: 'watch',
        meta: {
            title: 'page.watch.title'
        },
        component: () => import('@/views/Watch.vue')
    }
]
