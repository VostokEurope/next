import bracelets from '@/router/admin/bracelets'
import calibres from '@/router/admin/calibres'
import cases from '@/router/admin/cases'
import coatings from '@/router/admin/coatings'
import collections from '@/router/admin/collections'
import glasses from '@/router/admin/glasses'
import mechanisms from '@/router/admin/mechanisms'
import origins from '@/router/admin/origins'
import resistances from '@/router/admin/resistances'
import watches from '@/router/admin/watches'


export default [
    {
        path: '/admin',
        component: () => import('@/views/Router.vue'),
        children: [
            {
                path: '',
                name: 'admin',
                meta: {
                    title: 'Home'
                },
                component: () => import('@/views/Admin/AdminHome.vue'),
            },
            ...bracelets,
            ...calibres,
            ...collections,
            ...cases,
            ...coatings,
            ...glasses,
            ...mechanisms,
            ...origins,
            ...resistances,
            ...watches
        ]
    }
]
