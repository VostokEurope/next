import { createRouter, createWebHistory } from 'vue-router'
import  useTracking from '@/use/useTracking'
import chasy from '@/router/chasy'
import collekciya from '@/router/collekciya'
import admin from '@/router/admin'
import hasPurchase from '@/middleware/hasPurchase'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'page.home.title',
            description: 'page.home.description',
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            robots: 'noindex,nofollow',
            title: 'page.login.title',
            description: 'page.login.description',
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search.vue'),
        meta: {
            robots: 'noindex,nofollow',
            title: 'page.search.title',
            description: 'page.seach.description',
        }
    },
    ...chasy,
    ...collekciya,
    ...admin,
    {
        path: '/payment',
        name: 'payment',
        meta: {
            menu: true,
            title: 'page.payment.title',
            description: 'page.payment.description',
        },
        component: () => import('@/views/Payment.vue')
    },
    {
        path: '/guaranty',
        name: 'guaranty',
        meta: {
            title: 'page.guaranty.title',
            description: 'page.guaranty.description',
            menu: true
        },
        component: () => import('@/views/Guaranty.vue')
    },
    {
        path: '/kontacty',
        name: 'contact',
        meta: {
            title: 'page.contact.title',
            description: 'page.contact.description',
            menu: true
        },
        component: () => import('@/views/Contact.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/views/Checkout.vue'),
        meta: {
            title: 'page.checkout.title',
            robots: 'noindex,nofollow'
        }
    },
    {
        path: '/checkout/thanks',
        beforeEnter: [hasPurchase],

        name: 'thanks',
        component: () => import('@/views/Thanks.vue'),
        meta: {
            title: 'page.thanks.title',
            robots: 'noindex,nofollow'
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart.vue'),
        meta: {
            title: 'page.cart.title',
            robots: 'noindex,nofollow'
        }
    },
    {
        path: '/legal/privacy',
        name: 'privacy',
        component: () => import('@/views/Privacy.vue'),
        meta: {
            title: 'page.cart.privacy',
            robots: 'noindex,nofollow'
        }
    }, {
        path: '/legal/cookies',
        name: 'cookies',
        component: () => import('@/views/Cookies.vue'),
        meta: {
            title: 'page.cart.cookies',
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
