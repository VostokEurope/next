<template>
    <div class="page-login__register">
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
                    {{ $t('commons.haveAccount') }} <span
                        class=" link"
                        @click="$emit('toggle')"
                    > {{ $t('commons.login') }}
                    </span>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { reactive, ref, watch } from 'vue-demi'
    import { useRegister, useTransferProducts } from '@/use/useApi'
    import { useI18n } from 'vue-i18n'
    export default {
        props: {
            defaultData: {
                type: Object,
                default: () => ({}),
            }
        },
        emits:['toggle', 'registered'],
        setup(props, {emit}) {
            const { t } = useI18n()
            const formRegister = ref({
                ...props.defaultData
            })
            const isLogin = ref(true)
            const { data: registered, fetchData: sendRegister, isLoading: loadingRegister} = useRegister()
            const { isFinished, fetchData: transferProducts } = useTransferProducts()

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

            const submitRegister = () => {
                sendRegister({
                    name: formRegister.value.name,
                    email: formRegister.value.email,
                    password: formRegister.value.password
                })
            }

            watch([registered], () => {
                if (!props.defaultData.name) {
                    transferProducts()
                } else {
                    emit('registered')
                }
            })

            watch(isFinished, () => {
                emit('registered')
            })



            return {
                registerRules,
                formRegister,
                isLogin,
                submitRegister,
                loadingRegister
            }
        }

    }
</script>


<style lang="postcss">
  .form-login {
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

    &__message {
      text-align: center;
      display: grid;
      align-items: center;
      grid-gap: em(4px);
      margin: 0 auto;
      margin-bottom: 16px;
      max-width: em(300px);
      padding: em(16px);
      border-radius: 5px;
      border: 1px solid var(--color-success);
      font-size: 10px;
    }
  }
</style>
