import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from '@/store/modules/user'

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
        user
    },
    plugins: [persistedStates]
})
