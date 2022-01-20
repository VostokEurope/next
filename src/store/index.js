import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/modules/auth'
import cart from '@/store/modules/cart'

const persistedStates = createPersistedState({
    paths: ['auth','cart']
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
        cart
    },
    plugins: [persistedStates]
})
