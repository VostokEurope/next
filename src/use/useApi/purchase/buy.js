import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const store = useStore()
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })
    const user = store.getters['auth/user']


    const fetchData = (params = {}) => {
        console.log({params, user})
        const { response, data, error, isLoading, isFinished } = useAxios(`/purchases/buy`, {
            method: 'post',
            data: {
                watches: params.watches.map((watch) => ({
                    id: watch.id,
                    discount: !!watch.appliedDiscount
                })), //discount
                userId: user?.id,
                email: params.email,
                address: params.address,
                name: params.name,
                surname: params.surname,
                phone: params.phone,
                delivery: params.delivery
            }
        }, axios)

        state.response = response
        state.data = data
        state.error = error
        state.isLoading = isLoading

    }

    return {
        ...toRefs(state),
        fetchData
    }
}
