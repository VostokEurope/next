
const state = () => ({
    discounts: []
})

const getters = {
    discounts: state => state.discounts
}

const mutations = {
    ADD (state, id) {
        console.log('hola', id)
        console.log('boolean', !state.discounts.some(entry => {
            console.log(entry)
            return entry !== id
        }))
        if(!state.discounts.some(entry => {
            console.log(entry)
            return entry === id
        })) {
            console.log({
                id
            })
            state.discounts.push(id)
        }
    },

    REMOVE (state, id) {
        state.products = state.products.filter(p => p.id !== id)
    }
}

const actions = {
    add ({ commit }, id) {
        commit('ADD', id)
    },
    remove ({ commit }, id) {
        commit('REMOVE', id)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
