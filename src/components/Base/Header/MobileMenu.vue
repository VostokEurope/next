<template>
    <div class="menu-mobile">
        <div class="menu-mobile__close" @click="$emit('close')">
            <span class="fa fa-times"></span>
        </div>
        <div class="menu-mobile__tools">
            <div class="menu-mobile__icons">
                <div v-if="$store.getters['auth/user']?.id" class="text" @click="logout">
                    <span class="fas fa-sign-out-alt"></span>
                </div>
                <div v-else class="text" @click="$router.push({name: 'login'})">
                    <span class="fa fa-user"></span>
                </div>
                <div class="text" @click="goToCart">
                    <span class="fa fa-shopping-cart"></span>
                </div>
            </div>
            <div class="menu-mobile__search">
                <el-input v-model="search" />
                <div class="menu-mobile__search-button" @click="sendSearch">
                    <span class="fa fa-search"></span>
                </div>
            </div>
        </div>
        <div class="menu-mobile__content">
            <div
                v-for="path in paths"
                :key="path.name"
                class="menu-mobile__item"
                :class="{'menu-mobile__item--active ': path.path === $route.path}"
                @click="$router.push({ name: path.name })"
            >
                {{ $t(`router.${path.name}`) }}
            </div>
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/useCustomRouter'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    export default {
        emits: ['close'],
        setup() {
            const { getNavPath } = useCustomRouter()
            const store = useStore()
            const router = useRouter()
            const search = ref('')
            const mobileMenu = ref(false)
            const logout = () => {
                store.dispatch('auth/logout')
            }

            const goToCart = () => {
                console.log('carting')
                mobileMenu.value = false
                router.push({name: 'cart'})
            }

            const sendSearch = () => {
                router.push({name:'search', query: {search: search.value}})
            }

            const toggleMenu = () => {
                mobileMenu.value =  !mobileMenu.value
            }


            return {
                paths: getNavPath(),
                logout,
                search,
                sendSearch,
                mobileMenu,
                toggleMenu,
                goToCart
            }
        }

    }
</script>

<style lang="postcss">
  .menu-mobile {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100vw;
    display: grid;
    justify-content: center;
    align-items: start;
    background-color: white;
    z-index: 1000;
    padding: em(160px) 0;
    opacity: 0.9;

    &__close {
      cursor: pointer;
      position: fixed;
      top: em(24px);
      left: em(24px);
      font-size: 24px;
    }

    &__item {
      cursor: pointer;
      font-weight: 600;

      &--active {
        color: var(--color-primary-dark);
      }
    }

    &__tools {
      display: grid;
    }

    &__icons {
      padding: em(16px);
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(16px);
    }

    &__content {
      display: grid;
      grid-gap: em(16px);
      justify-content: center;
      width: 100%;
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
  }
</style>
