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
                        :rules="rulesLogin"
                    >
                        <div class="page-login__row">
                            <div class="page-login__label text">
                                {{ `${$t('commons.email')} or ${$t('commons.phone')}` }}
                            </div>
                            <el-input v-model="formLogin.email" :label="$t('commons.email')" />
                        </div>
                        <div class="page-login__row">
                            <div class="page-login__label text">
                                {{ $t('commons.password.field') }}
                            </div>
                            <el-input
                                v-model="formLogin.password"
                                :label="$t('commons.password.field')"
                                type="password"
                                @change="submitLogin"
                            />
                        </div>
                        <div class="page-login__buttons">
                            <div class="page-login__buttons-submit">
                                <el-button type="primary" :loading="isLoading" @click="submitLogin">
                                    {{ $t('commons.login') }}
                                </el-button>
                            </div>
                            <div class="page-login__buttons-change text">
                                {{ $t('commons.noAccount') }} <span class=" link" @click="toggleLogin"> {{ $t('commons.register') }}
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
                                prop="phone"
                                :label="$t('commons.phone')"
                            >
                                <el-input
                                    v-model="formRegister.phone"
                                    pattern="\d*"
                                    type="tel"
                                />
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
                            <div class="page-login__buttons-change">
                                {{ $t('commons.haveAccount') }} <span class=" link" @click="toggleLogin"> {{ $t('commons.login') }}
                                </span>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
            <div v-else class="page-login__logged text">
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
    import { useLogin, useRegister, useTransferProducts } from '@/use/useApi'
    import { useRouter } from 'vue-router'
    import useSeo from '@/use/useSeo'
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
            const { isFinished, fetchData: transferProducts } = useTransferProducts()
            useSeo()

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

            const rulesLogin = reactive({
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
                transferProducts()
            })

            watch([registered], () => {
                transferProducts()
            })

            watch(isFinished, () => {
                router.push({ name: 'home' })
            })



            return {
                registerRules,
                rulesLogin,
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
    grid-gap: em(32px);

    @media (--bp-desktop) {
      grid-template-columns: 1fr 1fr;
    }

    &__form,
    &__logged {
      display: grid;
      justify-content: center;
      align-items: center;
    }

    &__image {
      order: 2;
    }

    @media (--bp-desktop) {
      &__image {
        order: 0;
      }
    }

    &__row {
      padding-top: em(8px);
      font-size: em(12px);
      display: grid;

      .el-form-item__label {
        --el-form-label-font-size: 12px;

        height: em(32px);
      }
    }

    &__buttons {
      margin-top: em(16px);
      display: grid;
      justify-content: end;
      grid-gap: em(16px);
      grid-template-columns: auto em(120px);
      line-height: 0.8;
      align-items: center;

      &-submit {
        display: grid;
        justify-content: end;
      }

      &-change {
        font-size: 12px;
        line-height: 1;
      }
    }
  }
</style>
