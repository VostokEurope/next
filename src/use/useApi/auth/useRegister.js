import axios from '@/clients/axios'
import { useAxios } from '@/use/useAxios'
import { Device } from '@capacitor/device'
import { reactive, toRefs } from 'vue'

export default () => {
    const state = reactive({
        response: undefined,
        data: undefined,
        error: undefined,
        isLoading: undefined,
        isFinished: undefined
    })

    const fetchData = async ({ data: formData } = {}) => {
        const device = await Device.getInfo()
        const { response, data, error, isLoading, isFinished } = useAxios('/api/v2/app/register', {
            method: 'post',
            data: {
                name: formData?.name,
                last_name: formData?.lastname,
                email: formData?.email,
                password: formData?.password,
                password_confirmation: formData?.confirmPassword,
                device
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
