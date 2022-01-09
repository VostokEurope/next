import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { reactive, toRefs, watch } from 'vue'

export default () => {
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = (params) => {
        const { response, data, error, isLoading, isFinished } = useAxios(`/bracelet/${params?.id}`, {
            method: 'patch',
            data: {
                name: params?.name,
                image: params?.image
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
