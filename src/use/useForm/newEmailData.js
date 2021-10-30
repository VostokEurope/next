import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default ({ config } = {}) => {
    const { t } = useI18n()
    const form = useForm(config)

    const data = reactive({
        email: useField('email',
            yup.string()
                .required(t('form.error.required'))
        ),
        newEmail: useField('newEmail',
            yup.string()
                .required(t('form.error.required'))
        ),
        confirmEmail: useField('confirmEmail',
            yup.string()
                .required(t('form.error.required'))
                .test('passwords-match', t('form.error.emailMatch'), (value) => data.newEmail.value === value )
                .test('passwords-not-match', t('form.error.sameEmail'), (value) => value !== data.email.value)
        )

    })

    const setErrors = (errors) => {
        form.setErrors({
            email: errors?.email,
            newEmail: errors?.email,
            confirmEmail: errors?.repeatEmail,
        })
    }

    return {
        form,
        data,
        setErrors
    }
}
