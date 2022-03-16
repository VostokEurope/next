import axios from '@/clients/axios'

const state = () => ({
    user: {},
    accessToken: '',
    refreshToken: ''
})

const getters = {
    user: state => state.user,
    loggedIn: state => !!state.accessToken,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken
}

const mutations = {
    SET_TOKENS (state, { accessToken, refreshToken }) {
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        axios.defaults.headers.common.Authorization = `Bearer ${ state.accessToken }`
    },
    CLEAR_TOKENS (state) {
        state.accessToken = null
        state.refreshToken = null
        state.user = {}
        axios.defaults.headers.common.Authorization = null
        var cookies = document.cookie.split(";")

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i]
            var eqPos = cookie.indexOf("=")
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
    },
    SET_USER (state, payload) {
        state.user = payload
    },
    SET_PURCHASE (state, payload) {
        if(state.user && state.user.id) {
            state.user.hasPurchase = payload
        }
    }
}

const actions = {
    login ({ commit }, payload) {
        commit('SET_TOKENS', payload)
    },
    logout ({ commit }) {
        commit('CLEAR_TOKENS')
    },
    setUser ({ commit }, payload) {
        commit('SET_USER', payload)
    },
    setPurchase ({ commit }) {
        commit('SET_PURCHASE', new Date())
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
