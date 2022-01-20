import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const store = useStore()
    const products = store.getters['cart/products']

    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = () => {
        if (products?.length) {
            const { response, data, error, isLoading, isFinished } = useAxios(`/cart/transfer`, {
                method: 'post',
                data: {products: (products || []).map(product => product.id)}
            }, axios)

            state.response = response
            state.data = data
            state.error = error
            state.isLoading = isLoading
            state.isFinished = isFinished
            store.dispatch('cart/transfer')
        } else {
            state.isFinished = true
        }

    }

    return {
        ...toRefs(state),
        fetchData
    }
}
