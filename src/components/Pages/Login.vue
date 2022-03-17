<template>
    <LayoutDefault>
        <div class="page-login">
            <div class="page-login__image">
                <VoPicture
                    :src="resolveImage('info/showcase.jpeg')"
                    full-height
                />
            </div>
            <div v-if="!$store.getters['auth/user']?.id" class="page-login__form">
                <LoginForm
                    v-if="isLogin"
                    @toggle="toggleLogin"
                    @logged="onLogged"
                />
                <RegisterForm
                    v-if="!isLogin"
                    @toggle="toggleLogin"
                    @registered="onRegister"
                />
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
    import LoginForm from '@/components/Form/Login.vue'
    import RegisterForm from '@/components/Form/Register.vue'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import useSeo from '@/use/useSeo'
    import useImage from '@/use/useImage'
    export default {
        components: {
            LayoutDefault,
            VoPicture,
            LoginForm,
            RegisterForm
        },
        setup() {
            const { resolveImage } = useImage()
            const formRegister = ref({})
            const router = useRouter()
            const isLogin = ref(true)

            useSeo()

            const toggleLogin = () => {
                isLogin.value = !isLogin.value
            }

            const onLogged = () => {
                router.push({ name: 'home' })
            }

            const onRegister = () => {
                router.push({ name: 'home' })
            }



            return {
                formRegister,
                isLogin,
                toggleLogin,
                resolveImage,
                onLogged,
                onRegister
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
