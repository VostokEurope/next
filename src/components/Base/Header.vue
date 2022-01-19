<template>
    <div class="header">
        <div class="header__brand">
            <div></div>
            <div v-show="!clear" class="header__bars" @click="toggleMenu">
                <span class="fa fa-bars"></span>
            </div>
            <div class="header__image" @click="$router.push({ name: 'home' })">
                <img src="/logo.png" alt="Vostok Europe Shop">
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
                <div class="header__cart">
                    <el-popover :width="240" trigger="click">
                        <template #reference>
                            <div class="text">
                                <span class="fa fa-shopping-cart"></span>
                                <div v-if="user?.products?.length" class="header__cart-notification">
                                    {{ user?.products.length }}
                                </div>
                            </div>
                        </template>
                        <div v-for="product in user?.products" :key="product.id" class="header__cart-list">
                            <div class="header__cart-item text">
                                <img class="header__cart-image" :src="resolveImage(product?.images[0]?.src)" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                                <div>
                                    <div class="header__cart-price link" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                                        {{ product.name }}
                                    </div>
                                    <div class="header__cart-price" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                                        {{ getPrice(product.price) }}
                                    </div>
                                    <div class="header__cart-delete link" @click="deleteCart(product?.id)">
                                        {{ $t('cart.delete') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!user?.products?.length" class="text u-text-align-cente">
                            No tienes nada en el carrito
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>

        <HeaderMenu v-show="!clear" class="header__menu" />
        <MobileMenu v-if="mobileMenu" @close="toggleMenu" />
    </div>
</template>

<script>
    import HeaderMenu from '@/components/Base/Header/Menu.vue'
    import MobileMenu from '@/components/Base/Header/MobileMenu.vue'

    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { ref, watch } from 'vue'
    import { useGetUser, useRemoveProduct } from '@/use/useApi'
    import useImage from '@/use/useImage'
    import useCurrency from '@/use/useCurrency'
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
            const { resolveImage } = useImage()
            const { get: getPrice } = useCurrency()
            const { data: user, fetchData: getUser } = useGetUser()
            const {isFinished, fetchData: deleteItem } = useRemoveProduct()

            const logout = () => {
                store.dispatch('auth/logout')
            }

            const sendSearch = () => {
                router.push({name:'search', query: {search: search.value}})
            }

            const toggleMenu = () => {
                mobileMenu.value =  !mobileMenu.value
            }

            const deleteCart = (id) => {
                deleteItem({watchId: id})
            }

            getUser()
            console.log(user)

            watch(isFinished, () => {
                router.go()
            })

            return {
                logout,
                search,
                sendSearch,
                mobileMenu,
                toggleMenu,
                deleteCart,
                user,
                getPrice,
                resolveImage
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

    &__cart {
      position: relative;
      cursor: pointer;

      &-notification {
        position: absolute;
        font-weight: bold;
        font-size: 9px;
        background-color: var(--color-primary-dark);
        border-radius: 50%;
        color: var(--color-white);
        display: grid;
        width: 16px;
        height: 16px;
        align-items: center;
        justify-content: center;
        bottom: em(-6px);
        left: em(24px);
      }

      &-item {
        display: grid;
        grid-auto-flow: column;
        justify-content: start;
        cursor: pointer;
        align-items: center;
        grid-gap: em(16px);
      }

      &-image {
        height: em(100px);
      }

      &-list {
        display: grid;
        justify-content: center;
      }

      &-delete {
        font-size: 10px;
        color: var(--color-primary);
      }
    }

    &__wrapper {
      padding: 0 em(16px);
      width: 100vw;
      display: grid;
      justify-content: start;
      align-items: center;
      font-size: 12px;
      grid-template-columns: 1fr 2fr 1fr;
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
      height: em(140px);
      justify-content: center;
      align-items: center;
      padding: em(16px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    &__image {
      position: relative;
      display: grid;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      margin: 0 auto;
      font-size: 16px;
      font-weight: bold;

      .title {
        font-weight: bold;
        position: absolute;
        bottom: -2px;
        left: 16px;
        line-height: 1;
        font-size: 12px;
      }

      img {
        height: 110px;
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
        align-items: center;
        justify-content: center;
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

