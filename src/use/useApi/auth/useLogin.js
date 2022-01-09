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

    const fetchData = (params  = {}) => {
        console.log(params)
        console.log('padentro')
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
    })

    return {
        ...toRefs(state),
        fetchData
    }
}
