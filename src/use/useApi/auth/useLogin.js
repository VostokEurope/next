import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import useTracking from '@/use/useTracking'
import { reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'

export default () => {
    const store = useStore()

    const { sendLogin } = useTracking()

    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = (params  = {}) => {

        const { response, data, error, isLoading, isFinished } = useAxios('/auth/login', {
            method: 'post',
            data: {
                email: params?.email,
                password: params?.password
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
        store.dispatch('auth/setUser', data?.user)
        sendLogin(data?.user)
    })

    return {
        ...toRefs(state),
        fetchData
    }
}
