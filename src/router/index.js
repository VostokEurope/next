import { createRouter, createWebHistory } from 'vue-router'
import  useTracking from '@/use/useTracking'
import chasy from '@/router/chasy'
import collekciya from '@/router/collekciya'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            menu: true
        },
        component: () => import('@/views/Home.vue')
    },
    ...chasy,
    ...collekciya
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior () {
        return { top: 0 }
    }
})

router.afterEach((to, from) => {
    if (to.path === from.path) return
    const { sendPageView } = useTracking()
    sendPageView(to.path, to)
})

export default router
