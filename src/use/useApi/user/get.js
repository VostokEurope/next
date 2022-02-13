import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import useTracking from '@/use/useTracking'
import { reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'

export default () => {
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const { sendUser } = useTracking()

    const fetchData = () => {
        const store = useStore()
        const user = store.getters['auth/user']

        if(user?.id) {
            sendUser(user)
            const { response, data, error, isLoading, isFinished } = useAxios(`/user/`, {
                method: 'get'
            }, axios)
            state.response = response
            state.data = data
            state.error = error
            state.isLoading = isLoading
            state.isFinished = isFinished
        } else {
            state.data = {
                products: store.getters['cart/products']
            }
            state.isFinished = true
        }
    }

    return {
        ...toRefs(state),
        fetchData
    }
}
