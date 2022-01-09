import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/modules/auth'

const persistedStates = createPersistedState({
    paths: ['auth']
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
        auth
    },
    plugins: [persistedStates]
})
