<template>
    <LayoutDefault>
        <div class="page-login">
            <div class="page-login__image">
                <VoPicture
                    src="https://soyuztime.ru/uploads/product/600/643/thumbs/30_almaz-6s11-320b262-leather-strap-art-6_1_2021-02-12_18-02-28.webp"
                    full-height
                />
            </div>
            <div v-if="!$store.getters['auth/user']?.id" class="page-login__form">
                <div v-if="isLogin" class="page-login__login">
                    <el-form
                        :model="formLogin"
                        label-width="120px"
                        :rules="rules"
                    >
                        <div class="page-login__row">
                            <el-form-item
                                prop="email"
                                :label="$t('commons.email')"
                            >
                                <el-input v-model="formLogin.email" />
                            </el-form-item>
                        </div>
                        <div class="page-login__row">
                            <el-form-item
                                :label="$t('commons.password.field')"
                                prop="password"
                            >
                                <el-input
                                    v-model="formLogin.password"
                                    type="password"
                                />
                            </el-form-item>
                        </div>
                        <div class="page-login__buttons">
                            <div class="page-login__buttons-submit">
                                <el-button type="primary" :loading="isLoading" @click="submitLogin">
                                    {{ $t('commons.login') }}
                                </el-button>
                            </div>
                            <div class="page-login__buttons-change text">
                                {{ $t('commons.noAccount') }}<span class=" link" @click="toggleLogin"> {{ $t('commons.register') }}
                                </span>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div v-if="!isLogin" class="page-login__register">
                    <el-form
                        :model="formRegister"
                        label-width="200px"
                        :rules="registerRules"
                    >
                        <div class="page-login__row">
                            <el-form-item
                                prop="name"
                                :label="$t('commons.name')"
                            >
                                <el-input v-model="formRegister.name" />
                            </el-form-item>
                        </div>
                        <div class="page-login__row">
                            <el-form-item
                                prop="email"
                                :label="$t('commons.email')"
                            >
                                <el-input v-model="formRegister.email" />
                            </el-form-item>
                        </div>
                        <div class="page-login__row">
                            <el-form-item
                                :label="$t('commons.password.field')"
                                prop="password"
                            >
                                <el-input
                                    v-model="formRegister.password"
                                    type="password"
                                />
                            </el-form-item>
                        </div>
                        <div class="page-login__row">
                            <el-form-item
                                :label="$t('commons.password.confirm')"
                                prop="confirm"
                            >
                                <el-input
                                    v-model="formRegister.confirm"
                                    type="password"
                                />
                            </el-form-item>
                        </div>
                        <div class="page-login__buttons">
                            <div class="page-login__buttons-submit">
                                <el-button type="primary" :loading="loadingRegister" @click="submitRegister">
                                    {{ $t('commons.register') }}
                                </el-button>
                            </div>
                            <div class="page-login__buttons-change text">
                                {{ $t('commons.haveAccount') }} <span class=" link" @click="toggleLogin"> {{ $t('commons.login') }}
                                </span>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="page-login__logged text">
                {{ $t('commons.logged', { name: $store.getters['auth/user']?.name}) }}
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import VoPicture from '@/components/Base/Picture.vue'
    import { reactive, ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useLogin, useRegister } from '@/use/useApi'
    import { useRouter } from 'vue-router'
    export default {
        components: {
            LayoutDefault,
            VoPicture
        },
        setup() {
            const { t } = useI18n()
            const formLogin = ref({})
            const formRegister = ref({})
            const router = useRouter()
            const isLogin = ref(true)
            const { data, fetchData: sendLogin, isLoading} = useLogin()
            const { data: registered, fetchData: sendRegister, isLoading: loadingRegister} = useRegister()

            const registerRules = reactive({
                name: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
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

                ],
                confirm: [
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

            const toggleLogin = () => {
                isLogin.value = !isLogin.value
            }

            const submitLogin = () => {
                sendLogin({
                    email: formLogin.value.email,
                    password: formLogin.value.password
                })
            }

            const submitRegister = () => {
                sendRegister({
                    name: formRegister.value.name,
                    email: formRegister.value.email,
                    password: formRegister.value.password
                })
            }

            watch([data], () => {
                console.log('logged', data)
                router.push({ name: 'home' })
            })

            watch([registered], () => {
                console.log('registered', registered)
                router.push({ name: 'home' })

            })

            return {
                registerRules,
                rules,
                formLogin,
                formRegister,
                isLoading,
                isLogin,
                submitLogin,
                submitRegister,
                toggleLogin,
                loadingRegister
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

    &__form,
    &__logged {
      display: grid;
      justify-content: center;
      align-items: center;
    }

    &__row {
      display: grid;
    }

    &__buttons {
      display: grid;
      justify-content: end;
      grid-gap: em(8px) 0;

      &-submit {
        display: grid;
        justify-content: end;
      }

      &-change {
        display: flex;
        grid-gap: em(4px);
      }
    }
  }
</style>
