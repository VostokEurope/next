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
    },
    SET_USER (state, payload) {
        state.user = payload
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
