import { createRouter, createWebHistory } from 'vue-router'
import  useTracking from '@/use/useTracking'
import chasy from '@/router/chasy'
import collekciya from '@/router/collekciya'
import admin from '@/router/admin'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            robots: 'noindex,nofollow'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search.vue'),
        meta: {
            robots: 'noindex,nofollow'
        }
    },
    ...chasy,
    ...collekciya,
    ...admin,
    {
        path: '/delivery',
        name: 'delivery',
        meta: {
            menu: true
        },
        component: () => import('@/views/Contact.vue')
    },
    {
        path: '/guaranty',
        name: 'guaranty',
        meta: {
            menu: true
        },
        component: () => import('@/views/Contact.vue')
    },
    {
        path: '/kontacty',
        name: 'contact',
        meta: {
            menu: true
        },
        component: () => import('@/views/Contact.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/views/Checkout.vue'),
        meta: {
            robots: 'noindex,nofollow'
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart.vue'),
        meta: {
            robots: 'noindex,nofollow'
        }
    },

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
