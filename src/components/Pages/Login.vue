<template>
    <LayoutDefault>
        <div class="page-login">
            <div class="page-login__image">
                <VoPicture
                    src="https://soyuztime.ru/uploads/product/600/643/thumbs/30_almaz-6s11-320b262-leather-strap-art-6_1_2021-02-12_18-02-28.webp"
                    full-height
                />
            </div>
            <div class="page-login__form">
                <el-form
                    :model="form"
                    label-width="120px"
                    :rules="rules"
                >
                    <div class="page-login__row">
                        <el-form-item
                            prop="email"
                            label="Email"
                        >
                            <el-input v-model="form.email" />
                        </el-form-item>
                    </div>
                    <div class="page-login__row">
                        <el-form-item
                            label="Password"
                            prop="password"
                        >
                            <el-input
                                v-model="form.password"
                                type="password"
                            />
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" :loading="isLoading" @click="submitForm(formRef)">
                            Send
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import VoPicture from '@/components/Base/Picture.vue'
    import { reactive, ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useLogin } from '@/use/useApi'
    export default {
        components: {
            LayoutDefault,
            VoPicture
        },
        setup() {
            const { t } = useI18n()
            const form = ref({})

            const { data, fetchData: sendLogin, isLoading} = useLogin()
            const rules = reactive({
                email: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: t('errors.form.email'),
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    },
                    {
                        min: 8,
                        message: t('errors.form.min', { length: 8 }),
                        trigger: 'blur',
                    },
                ]
            })

            const submitForm = () => {
                sendLogin({
                    email: form.value.email,
                    password: form.value.password
                })
            }

            watch([data], () => {
                console.log('logged', data)
            })

            return {
                rules,
                form,
                isLoading,
                submitForm,
            }
        }


    }
</script>

<style lang="postcss">
  .page-login {
    padding: em(32px);
    min-height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: em(32px);

    &__form {
      display: grid;
      justify-content: center;
      align-items: center;
    }

    &__row {
      display: grid;
    }
  }
</style>
