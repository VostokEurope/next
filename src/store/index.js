import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/modules/auth'
import cart from '@/store/modules/cart'
import discount from '@/store/modules/discount'

const persistedStates = createPersistedState({
    paths: ['auth','cart', 'discount']
})

export default createStore({
    state: {},
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        cart,
        discount
    },
    plugins: [persistedStates]
})
