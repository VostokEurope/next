import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default () => {
    const store = useStore()
    const user = store.getters['auth/user']

    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = (params) => {


        if(user?.id) {
            const { response, data, error, isLoading, isFinished } = useAxios(`/cart/${params.watchId}`, {
                method: 'delete'
            }, axios)

            state.response = response
            state.data = data
            state.error = error
            state.isLoading = isLoading
            state.isFinished = isFinished
        } else {
            store.dispatch('cart/remove', params.watchId)
            state.isFinished = true
        }
    }

    return {
        ...toRefs(state),
        fetchData
    }
}
