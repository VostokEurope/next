import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs, watch } from 'vue'
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

    const fetchData = ({ data: formData } = {}) => {
        const { response, data, error, isLoading, isFinished } = useAxios('/api/v2/app/login', {
            method: 'post',
            data: {
                username: formData?.email,
                password: formData?.password
            }
        }, axios)

        state.response = response
        state.data = data
        state.error = error
        state.isLoading = isLoading
        state.isFinished = isFinished
    }

    watch(() => state.data, (data) => {
        store.dispatch('auth/login', {
            accessToken: data.access_token,
            refreshToken: data.refresh_token
        })
        store.dispatch('auth/setUser', data?.user_info?.user)
        store.dispatch('auth/setTribe', data?.user_info?.tribe)
    })

    return {
        ...toRefs(state),
        fetchData
    }
}
