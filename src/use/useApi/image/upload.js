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

        const formData = new FormData()
        formData.append('file', params?.image)
        formData.append('watchId', params?.watchId)

        const { response, data, error, isLoading, isFinished } = useAxios('/image', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
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
