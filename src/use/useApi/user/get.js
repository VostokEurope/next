import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default () => {
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = (params) => {
        const store = useStore()
        const user = store.getters['auth/user']

        if(user?.id) {
            const { response, data, error, isLoading, isFinished } = useAxios(`/user/`, {
                method: 'get'
            }, axios)

            state.response = response
            state.data = data
            state.error = error
            state.isLoading = isLoading
            state.isFinished = isFinished
        } else {
            console.log('alternative')
            console.log(store.getters['cart/products'])
            state.data = { products: store.getters['cart/products']}
            state.isFinished = true

        }



    }

    return {
        ...toRefs(state),
        fetchData
    }
}