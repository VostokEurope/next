<template>
    <div class="header">
        <div v-show="!clear" v-if="false" class="header__promo">
            <div class="header__wrapper">
                <div class="header__wrapper-email">
                    <a :href="$t('header.claim.1.value')">
                        {{ $t('header.claim.1.label') }}
                    </a>
                </div>
                <div class="header__wrapper-phone link">
                    <a :href="$t('header.claim.2.value')">
                        {{ $t('header.claim.2.label') }}
                    </a>
                </div>
                <div class="header__wrapper-user">
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
            <HeaderMenu v-show="!clear" class="header__menu" />
            <div v-show="!clear" class="header__bars" @click="toggleMenu">
                <span class="fa fa-bars"></span>
            </div>
            <div class="header__image" @click="$router.push({ name: 'home' })">
                <img src="https://hoprojection.com/wp-content/uploads/2018/05/Vostok_Europe_Hoprojection_Hopro_Hologram-1288x724.png">
            </div>
            <div class="header__tools">
                <div v-if="!hideSearch" v-show="!clear" class="header__search">
                    <el-input v-model="search" />
                    <div class="header__search-button" @click="sendSearch">
                        <span class="fa fa-search"></span>
                    </div>
                </div>
                <div>
                    <div v-if="$store.getters['auth/user']?.id" class="text" @click="logout">
                        <span class="fas fa-sign-out-alt"></span>
                    </div>
                    <div v-else class="text" @click="$router.push({name: 'login'})">
                        <span class="fa fa-user"></span>
                    </div>
                </div>
                <div class="text">
                    <span class="fa fa-shopping-cart"></span>
                </div>
            </div>
        </div>
        <MobileMenu v-if="mobileMenu" @close="toggleMenu" />
    </div>
</template>

<script>
    import HeaderMenu from '@/components/Base/Header/Menu.vue'
    import MobileMenu from '@/components/Base/Header/MobileMenu.vue'

    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    export default {
        components: {
            HeaderMenu,
            MobileMenu
        },
        props: {
            clear: {
                type: Boolean,
                default: false
            },
            hideSearch: {
                type: Boolean,
                default: false
            },
        },
        setup() {
            const store = useStore()
            const router = useRouter()
            const search = ref('')
            const mobileMenu = ref(false)
            const logout = () => {
                store.dispatch('auth/logout')
            }

            const sendSearch = () => {
                router.push({name:'search', query: {search: search.value}})
            }

            const toggleMenu = () => {
                console.log(mobileMenu.value)
                mobileMenu.value =  !mobileMenu.value
            }

            return {
                logout,
                search,
                sendSearch,
                mobileMenu,
                toggleMenu
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
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 1fr auto;
      padding: em(8px);

      &-button {
        display: grid;
        justify-content: center;
        align-items: center;
        color: var(--color-white);
        background-color: black;
        width: 100%;
        height: 100%;
        padding: em(8px);
        border-radius: 0 5px 5px 0;
      }
    }

    &__wrapper {
      padding: 0 em(16px);
      width: 100vw;
      display: grid;
      justify-content: start;
      align-items: center;
      font-size: 12px;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: right;

      &-user,
      &-phone,
      &-email {
        cursor: pointer;
      }

      &-phone {
        text-align: center;
      }

      &-user {
        text-align: right;
      }

      &-email {
        text-align: left;
      }
    }

    &__contact {
      text-align: left;
    }

    &__brand {
      position: relative;
      display: grid;
      height: em(64px);
      justify-content: center;
      align-items: center;
      padding: em(16px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 2fr 1fr;
      }
    }

    &__image {
      cursor: pointer;
      height: 100%;
      margin: 0 auto;

      img {
        height: em(52px);
        object-fit: cover;
      }
    }

    &__tools {
      padding: 0 em(8px);
      display: none;
      grid-auto-flow: column;
      align-items: center;
      justify-content: end;
      grid-gap: em(16px);

      @media (--bp-desktop) {
        display: grid;
      }
    }

    &__menu {
      display: none;

      @media (--bp-desktop) {
        display: grid;
      }
    }

    &__bars {
      position: absolute;
      top: em(28px);
      left: em(32px);
      display: grid;
      cursor: pointer;

      @media (--bp-desktop) {
        display: none;
      }
    }
  }
</style>

