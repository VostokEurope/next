import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default ({ config } = {}) => {
    const { t } = useI18n()
    const form = useForm(config)

    const data = reactive({
        password: useField('password',
            yup.string()
                .required(t('form.error.required'))
                .min(8, t('form.error.minLength', 8))
        ),
        newPassword: useField('newPassword',
            yup.string()
                .required(t('form.error.required'))
                .min(8, t('form.error.minLength', 8))
        ),
        confirmPassword: useField('confirmPassword',
            yup.string()
                .required(t('form.error.required'))
                .test('passwords-match', t('form.error.passwordMatch'), (value) => data.newPassword.value === value)
        )

    })

    const setErrors = (errors) => {
        form.setErrors({
            password: errors?.password,
            newPassword: errors?.newPassword,
            confirmPassword: errors?.confirmPassword,
        })
    }

    return {
        form,
        data,
        setErrors
    }
}
