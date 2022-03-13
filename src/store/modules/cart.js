
const state = () => ({
    products: []
})

const getters = {
    products: state => state.products
}

const mutations = {
    ADD_PRODUCT (state, product) {
        if(!state.products.find(p => p.id === product.id)?.id) {
            state.products.push(product)
        }
    },

    REMOVE_PRODUCT (state, id) {
        state.products = state.products.filter(p => p.id !== id)
    },

    TRANSFER_PRODUCTS (state) {
        if(!state.products.length) return
        state.products = []
    }
}

const actions = {
    add ({ commit }, product) {
        commit('ADD_PRODUCT', product)
    },
    remove ({ commit }, id) {
        commit('REMOVE_PRODUCT', id)
    },
    transfer ({ commit }, id) {
        commit('TRANSFER_PRODUCTS', id)
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
