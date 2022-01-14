import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs } from 'vue'

export default () => {
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = (params) => {
        const { response, data, error, isLoading, isFinished } = useAxios('/property', {
            method: 'get',
            params: {
                page: params?.page || 1,
                search: params?.search
            }
        }, axios)

        state.response = response
        state.data = data
        state.error = error
        state.isLoading = isLoading
        state.isFinished = isFinished
    }

    return {
        ...toRefs(state),
        fetchData
    }
}
