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

    const fetchData = () => {
        const { response, data, error, isLoading, isFinished } = useAxios('/auth/logout', { method: 'post' }, axios)

        state.response = response
        state.data = data
        state.error = error
        state.isLoading = isLoading
        state.isFinished = isFinished
    }

    watch(() => state.isFinished, () => {
        store.dispatch('auth/logout')
    })


    return {
        ...toRefs(state),
        fetchData
    }
}
