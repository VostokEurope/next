<template>
    <LayoutDefault>
        <div class="page-cart">
            <div class="page-cart__items">
                <div v-for="product in user?.products" :key="product.id" class="header__cart-list">
                    <div class="page-cart__item text">
                        <img class="page-cart__image" :src="resolveImage(product?.images[0]?.src)" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                        <div>
                            <div class="page-cart__price link" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                                {{ product.name }}
                            </div>
                            <div class="page-cart__price" @click="$router.push({name: 'watch', params: {id: product?.slug}})">
                                {{ getPrice(product.price) }}
                            </div>
                            <div class="page-cart__delete link" @click="deleteCart(product?.id)">
                                {{ $t('cart.delete') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="user?.products?.length"
                class="page-cart__button u-text-align-center"
                @click="$router.push({name:'checkout'})"
            >
                {{ $t('cart.buy') }}
            </div>
            <div v-else class="text u-text-align-center">
                {{ $t('cart.empty') }}
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import useImage from '@/use/useImage'
    import useCurrency from '@/use/useCurrency'
    import { useGetUser, useRemoveProduct } from '@/use/useApi'
    import { watch } from 'vue-demi'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            const store = useStore()
            const router = useRouter()
            const { resolveImage } = useImage()
            const { get: getPrice } = useCurrency()
            const { data: user, fetchData: getUser } = useGetUser()
            const {isFinished, fetchData: deleteItem } = useRemoveProduct()

            const logout = () => {
                store.dispatch('auth/logout')
            }


            const deleteCart = (id) => {
                deleteItem({watchId: id})
            }

            getUser()

            watch(isFinished, () => {
                router.go()
            })

            return {
                logout,
                deleteCart,
                user,
                getPrice,
                resolveImage
            }
        }


    }
</script>

<style lang="postcss">
  .page-cart {
    padding: em(16px);
    display: grid;
    grid-gap: em(32px);

    &__items {
      display: grid;
    }

    &__item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: start;
      grid-gap: em(16px);
    }

    &__delete  {
      color: var(--color-primary-dark);
    }

    &__button {
      cursor: pointer;
      width: em(180px);
      margin: 0 auto;
      padding: em(12px);
      background-color: var(--color-primary);
      color: var(--color-primary-inside);
      border-radius: 5px;
    }
  }
</style>
