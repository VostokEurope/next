import { createRouter, createWebHistory } from 'vue-router'
import  useTracking from '@/use/useTracking'
import chasy from '@/router/chasy'
import collekciya from '@/router/collekciya'
import admin from '@/router/admin'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            menu: true
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    ...chasy,
    ...collekciya,
    ...admin
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
