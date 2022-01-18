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

    const fetchData = (params = {}) => {
        console.log(params)
        const { response, data, error, isLoading, isFinished } = useAxios(`/watch/${params?.id}`, {
            method: 'patch',
            data: {
                calibresIds: params.calibres,
                braceletsIds: params.bracelets,
                caseId: params.caseId,
                collectionId: params.collectionId,
                coatingId: params.coatingId,
                resistanceId: params.resistanceId,
                description: params.description,
                discount: params.discount,
                genderId: params.genderId,
                glassId: params.glassId,
                height: params.height,
                mechanismId: params.mechanismId,
                model: params.model,
                name: params.name,
                price: params.price,
                properties: params.properties
                    .filter((entry) => entry.avaiable)
                    .map(entry => ({
                        id: entry.id,
                        value: entry.value,
                        unity: entry.unity
                    })),
                stock: params.stock,
                thickness: params.thickness,
                width: params.width,
                published: params.published,
                dialColorId: params.dialColorId

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
