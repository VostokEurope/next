import store from '@/store'

const _MS_PER_DAY = 1000 * 60 * 60 * 24

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export default function isAdmin (to, from, next) {
    const user = store.getters['auth/user']
    const hasPurchase = user?.hasPurchase
    const diff = dateDiffInDays(new Date(user?.hasPurchase), new Date())

    if (!hasPurchase) return next({ name: 'home' })
    if( diff > 1) return next({ name: 'home' })

    return next()
}
