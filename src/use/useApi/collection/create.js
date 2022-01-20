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
        const { response, data, error, isLoading, isFinished } = useAxios(`/collection/`, {
            method: 'post',
            data: {
                name: params?.name,
                description:  params?.description,
                image: params?.image,
                relevance: params?.relevance,
                banDiscount: params?.banDiscount,
                published: params?.published,
                subtitle: params?.subtitle
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
