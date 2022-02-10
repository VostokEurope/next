<template>
    <LayoutDefault clear>
        <div v-if="products.length" class="page-checkout">
            <el-form
                :model="formCheckout"
                :rules="checkoutRules"
                class="page-checkout__content"
            >
                <div class="page-checkout__products">
                    <LayoutScrollable>
                        <CardResume v-for="product in products" :key="product.id" :item="product" @remove="removeItem" />
                    </LayoutScrollable>
                </div>
                <div class="page-checkout__content-wrapper">
                    <div class="page-checkout__user">
                        <div class="title title--h3">
                            {{ $t('checkout.personal') }}
                        </div>
                        <div
                            :model="formCheckout"
                            label-width="200px"
                            :rules="checkoutRules"
                        >
                            <div class="page-checkout__row">
                                <el-form-item
                                    prop="name"
                                    :label="$t('commons.name')"
                                >
                                    <el-input v-model="formCheckout.name" />
                                </el-form-item>
                                <el-form-item
                                    prop="email"
                                    :label="$t('commons.email')"
                                >
                                    <el-input v-model="formCheckout.email" />
                                </el-form-item>
                                <el-form-item
                                    prop="phone"
                                    :label="$t('commons.phone')"
                                >
                                    <el-input
                                        v-model="formCheckout.phone"
                                        pattern="\d*"
                                        type="tel"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="page-checkout__payment">
                        <div class="title title--h3">
                            {{ $t('checkout.payment') }}
                        </div>
                        <div class="page-checkout__delivery ">
                            <div class="page-checkout__delivery-items">
                                <div class="page-checkout__delivery-item" :class="{'page-checkout__delivery-item--active': !formCheckout.delivery}" @click="setDelivery(false)">
                                    <div v-show="!formCheckout.delivery">
                                        <span class="fad fa-circle"></span>
                                    </div>
                                    <div v-show="formCheckout.delivery">
                                        <span class="fal fa-circle"></span>
                                    </div>
                                    <div>
                                        {{ $t('checkout.delivery.shop') }}
                                    </div>
                                </div>
                                <div class="page-checkout__delivery-item" :class="{'page-checkout__delivery-item--active': formCheckout.delivery}" @click="setDelivery(true)">
                                    <div v-show="formCheckout.delivery">
                                        <span class="fad fa-circle"></span>
                                    </div>
                                    <div v-show="!formCheckout.delivery">
                                        <span class="fal fa-circle"></span>
                                    </div>
                                    <div>
                                        {{ $t('checkout.delivery.send') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <el-form-item
                                v-if="formCheckout.delivery"
                                prop="address"
                                :label="$t('commons.address')"
                            >
                                <el-input v-model="formCheckout.address" />
                            </el-form-item>
                        </div>
                    </div>
                    <div class="page-checkout__privacy container">
                        <div class="text text--primary">
                            *
                        </div>
                        <el-checkbox
                            v-model="formCheckout.privacy"
                            required
                            prop="privacy"
                            :label="$t('checkout.privacyAccept')"
                        />
                    </div>
                </div>


                <div class="page-checkout__buttons">
                    <div class="page-checkout__buttons-submit">
                        <el-button :loading="isLoading" type="submit" @click="submitChekcout">
                            {{ $t('checkout.buy') }}
                        </el-button>
                    </div>
                </div>
            </el-form>
            <div class="page-checkout__resume">
                <div class="page-checkout__resume-content">
                    <div class="title title--h3">
                        {{ $t('checkout.resume') }}
                    </div>
                    <div v-for="product in products" :key="product.id" class="page-checkout__item  text">
                        <div class="page-checkout__item-watch">
                            <div class="page-checkout__name text--bold">
                                {{ product.name }}:
                            </div>
                        </div>
                        <div class="page-checkout__item-price">
                            <div v-if="product.appliedDiscount">
                                {{ getPrice(product?.price - product.appliedDiscount) }}
                                <span class="text text--small text--strike">
                                    {{ getPrice(product?.price) }}
                                </span>
                            </div>
                            <div v-else>
                                {{ getPrice(product?.price) }}
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div v-if="discount" class="page-checkout__item">
                        <div>{{ $t('checkout.discount') }}</div>
                        <div class="text--bold u-color-success">
                            -{{ getPrice(discount) }}
                        </div>
                    </div>
                    <div class="page-checkout__item">
                        <div>{{ $t('checkout.total') }}</div>
                        <div class="text--bold ">
                            {{ getPrice(total - discount) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="page-checkout page-checkout--full">
            <div class="page-checkout__content title title--h2 u-text-align-center">
                {{ $t('cart.empty') }}
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import CardResume from '@/components/Card/Resume.vue'

    import { useStore } from 'vuex'
    import useImage from '@/use/useImage'
    import useCurrency from '@/use/useCurrency'
    import { useGetUser, useRemoveProduct } from '@/use/useApi'
    import { reactive, ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            LayoutDefault,
            LayoutScrollable,
            CardResume
        },
        setup() {
            useSeo()
            const store = useStore()
            const { resolveImage } = useImage()
            const { get: getPrice } = useCurrency()
            const { data: user, fetchData: getUser, isLoading } = useGetUser()
            const { fetchData: sendRemove } = useRemoveProduct()
            const total = ref(null)
            const { t } = useI18n()
            const discounts = store.getters['discount/discounts']

            const discount = ref(0)
            const formCheckout = reactive({
            })
            const products = ref([])

            const checkoutRules = reactive({
                name: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
                address: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
                privacy: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
                phone: [
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
                ]
            })
            const logout = () => {
                store.dispatch('auth/logout')
            }

            const submitChekcout = () => {

            }

            const removeItem = (id) => {
                products.value = products.value.filter(item => item.id !== id)
                sendRemove({
                    watchId: id
                })

                getBreakDown()
            }

            const setDelivery = (state) => {
                formCheckout.delivery = state
            }

            const getBreakDown = () => {
                total.value = products.value.reduce((acc, item) => {
                    acc += item.price
                    return acc
                }, 0)

                discount.value = products.value.reduce((acc, entry) => {
                    const discountPercent = discounts.includes(entry.id) ? entry.discount : 0
                    acc += entry.price - (entry.price - (entry.price) * (discountPercent / 100))
                    entry.appliedDiscount = entry.price - (entry.price - (entry.price) * (discountPercent / 100))
                    return acc
                }, 0)
            }

            watch(user, () => {
                products.value = user?.value?.products
                if (products?.value?.length) {
                    getBreakDown()
                }
            })


            getUser()



            return {
                logout,
                user,
                getPrice,
                resolveImage,
                checkoutRules,
                formCheckout,
                submitChekcout,
                total,
                isLoading,
                discount,
                removeItem,
                products,
                setDelivery
            }
        }



    }
</script>

<style lang="postcss">
  .page-checkout {
    padding: em(16px);
    display: grid;
    grid-gap: em(16px);

    @media (--bp-desktop) {
      grid-template-columns: 3fr 1fr;
    }

    &--full {
      grid-template-columns: 1fr;
      align-items: center;
      min-height: 60vh;
    }

    &__content {
      background-color: white;
      padding: em(16px);
    }

    &__products {
      grid-column: 1 / span 5;
    }

    &__resume {
      .title {
        padding: em(8px) 0;
      }

      &-content {
        border-radius: em(5px);
        padding: em(16px);
        background-color: white;
      }

      hr {
        opacity: 0.1;
        margin: em(16px);
      }
    }

    &__delivery {
      padding: em(16px) 0;

      &-items {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-gap: em(24px);
      }

      &-item {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        padding: em(16px);
        border: 1px solid black;
        grid-gap: em(8px);
        border-radius: em(4px);
        opacity: 0.4;

        &--active {
          opacity: 1;
        }
      }
    }

    &__payment,
    &__user {
      display: grid;
      justify-content: start;
      padding: em(16px);
    }

    &__row {
      display: grid;
      grid-auto-flow: column;
      align-items: start;
      justify-content: start;
      grid-gap: em(16px);
    }

    &__product {
      display: grid;
    }

    &__item {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: em(4px) em(16px);
    }

    &__buttons {
      justify-self: center;
      align-self: center;
      place-self: center;
      display: grid;
      width: 100%;
      justify-content: center;
      margin: 0 auto;
      padding-top: em(32px);

      @media (--bp-desktop) {
        grid-column: 1 / 12;
      }
    }

    &__privacy {
      position: relative;

      .text {
        position: absolute;
        top: 0;
        left: em(30px);
      }
    }
  }
</style>
