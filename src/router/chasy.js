export default [
    {
        path: '/chasy/:id/',
        name: 'watch',
        meta: {
            title: (name) => {
                console.log(name)
                return `Восток Европа  - Часы ${name.replace('-','/')}`.toUpperCase()
            }
        },
        component: () => import('@/views/Watch.vue')
    }
]
