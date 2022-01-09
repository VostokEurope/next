<template>
    <div class="header">
        <div class="header__promo">
            <div class="header__wrapper">
                <div class="header__claim">
                    {{ $t('header.contact') }}
                </div>
                <div class="header__claim">
                    {{ $t('header.claim.2') }}
                </div>
                <div class="header__user">
                    <div v-if="$store.getters['auth/user']?.id" class="">
                        {{ $store.getters['auth/user']?.name }}, <span class="text link" @click="logout">
                            {{ $t('commons.logout') }}
                        </span>
                    </div>
                    <div v-else class="text link" @click="$router.push({name: 'login'})">
                        {{ $t('header.account') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="header__brand">
            <div class="header__image" @click="$router.push({ name: 'home' })">
                <img src="https://hoprojection.com/wp-content/uploads/2018/05/Vostok_Europe_Hoprojection_Hopro_Hologram-1288x724.png">
            </div>
        </div>
        <div class="header__tool">
            <HeaderMenu />
            <div class="header__search">
                <div>Input</div>
                <div><span class="fa fa-edit"></span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderMenu from '@/components/Base/Header/Menu.vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    export default {
        components: {
            HeaderMenu
        },
        setup() {
            const store = useStore()
            const router = useRouter()
            const logout = () => {
                store.dispatch('auth/logout')
                router.go()
            }

            return {
                logout
            }


        }
    }
</script>

<style lang="postcss">
  .header {
    display: grid;

    &__promo {
      background-color: #ddd;
      padding: em(8px) em(16px);
      display: grid;
      justify-content: center;
    }

    &__search {
      border: 1px solid red;
      display: grid;
      grid-template-columns: 1fr auto;

      & > * {
        border: 1px solid black;
      }
    }

    &__wrapper {
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30vw;
    }

    &__brand {
      height: 52px;
      display: grid;
      justify-content: center;
      align-items: center;
      padding: em(8px);
    }

    &__image {
      cursor: pointer;
      height: 100%;

      img {
        height: em(52px);
        object-fit: cover;
      }
    }

    &__user {
      cursor: pointer;
    }

    &__tool {
      padding: em(8px) em(16px);
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
  }
</style>

