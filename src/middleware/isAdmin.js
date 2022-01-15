import store from '@/store'

export default function isAdmin (to, from, next) {
    const user = store.getters['auth/user']
    const isAdmin = user?.role?.id === 2

    if (!isAdmin) return next({ name: 'home' })

    return next()
}
