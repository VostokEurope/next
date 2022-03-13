<template>
    <div class="form-login__login">
        <div v-if="defaultEmail" class="form-login__message text">
            <div> <span class="fa fa-info-circle"></span></div>
            <div> {{ $t('checkout.email.exist') }}</div>
        </div>
        <el-form
            :model="formLogin"
            :rules="rulesLogin"
        >
            <div class="form-login__row">
                <div class="form-login__label text">
                    {{ `${$t('commons.email')} or ${$t('commons.phone')}` }}
                </div>
                <el-input
                    v-model="formLogin.email"
                    :disabled="!!defaultEmail"
                    :label="$t('commons.email')"
                />
            </div>
            <div class="form-login__row">
                <div class="form-login__label text">
                    {{ $t('commons.password.field') }}
                </div>
                <el-input
                    v-model="formLogin.password"
                    :label="$t('commons.password.field')"
                    type="password"
                />
            </div>
            <div class="form-login__buttons">
                <div class="form-login__buttons-submit">
                    <el-button type="primary" :loading="loading" @click="submit">
                        {{ $t('commons.login') }}
                    </el-button>
                </div>
                <div v-if="!defaultEmail" class="form-login__buttons-change text">
                    {{ $t('commons.noAccount') }} <span class=" link" @click="$emit('toggle')"> {{ $t('commons.register') }}
                    </span>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { reactive, ref, watch } from 'vue-demi'
    import { useLogin, useTransferProducts } from '@/use/useApi'
    import { useI18n } from 'vue-i18n'
    export default {
        props: {
            defaultEmail: {
                type: String,
                default: '',
            }
        },
        emits:['toggle', 'logged'],
        setup(props, {emit}) {

            const { data, fetchData: sendLogin, isLoading: loading} = useLogin()
            const { t } = useI18n()
            const { isFinished, fetchData: transferProducts } = useTransferProducts()

            const submit = () => {
                sendLogin({
                    email: formLogin.value.email,
                    password: formLogin.value.password
                })
            }

            const formLogin = ref({
                email: props.defaultEmail
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

            watch([data], () => {
                transferProducts()
            })
            watch(isFinished, () => {
                emit('logged')
            })

            return {
                rulesLogin,
                formLogin,
                loading,
                submit
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
