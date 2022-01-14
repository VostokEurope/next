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
        console.log(params)
        /*

        calibres: (4) [{…}, {…}, {…}, {…}]
caseId: 1
coatingId: 1
collectionId: 5
description: "Часы, выпущенные ограниченным тиражом всего в 500 экземпляров к 100-летнему юбилею Закона о радиорубке. Дизайн часов вдохновлен судовыми часами  «Восток — Радиорубка», которые уже несколько десятилей и вплоть до сегодняшнего дня используются на российских военно-морских судах."
discount: 10
genderId: 1
glassId: 1
height: 250
id: 1
images: (3) [{…}, {…}, {…}]
mechanismId: 1
model: "2426/225A270"
name: "2426/225A270"
price: 25260
promoId: null
properties: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
resistanceId: 1
slug: "2426-225A270"
stock: 3
thickness: 250
width: 250

        */
        const { response, data, error, isLoading, isFinished } = useAxios(`/watch/${params?.id}`, {
            method: 'patch',
            data: {
                calibresIds: params.calibres,
                caseId: params.caseId,
                collectionId: params.collectionId,
                description: params.description,
                discount: params.discount,
                genderId: params.genderId,
                glassId: params.glassId,
                height: params.height,
                mechanismId: params.mechanismId,
                images:  params.images.map(entry => entry.id),
                model: params.model,
                name: params.name,
                price: params.price,
                properties: params.properties
                    .filter((entry) => entry.avaiable)
                    .map(entry => ({
                        id: entry.id,
                        value: entry.value
                    })),
                resistanceId: params.reistanceId,
                stock: params.stock,
                thickness: params.thickness,
                width: params.width
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
