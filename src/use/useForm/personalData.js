import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default ({ config } = {}) => {
    const { t } = useI18n()
    const form = useForm(config)

    const data = reactive({
        name: useField('name',
            yup.string()
                .required(t('form.error.required'))),
        lastname: useField('lastname',
            yup.string()
                .nullable()
        ),
        gender: useField('gender',
            yup.string()
                .nullable()
        ),

        birthday: useField('birthday',
            yup.date()
                .nullable()
        ),
        height: useField('height',
            yup.string()
                .notRequired().nullable()
        ),
        weight: useField('weight',
            yup.string()
                .notRequired().nullable()
        ),

    })

    const setErrors = (errors) => {
        form.setErrors({
            name: errors?.name,
        })
    }

    return {
        form,
        data,
        setErrors
    }
}
