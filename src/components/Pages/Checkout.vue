<template>
    <LayoutDefault clear>
        <div v-if="products.length && !oldAccount && !newAccount" class="page-checkout">
            <el-form
                ref="checkoutForm"
                :model="formCheckout"
                :rules="rules"
                class="page-checkout__content"
            >
                <div class="page-checkout__products">
                    <LayoutScrollable>
                        <CardResume
                            v-for="product in products"
                            :key="product.id"
                            :item="product"
                            @remove="removeItem"
                        />
                    </LayoutScrollable>
                </div>
                <div class="page-checkout__content-wrapper">
                    <div class="page-checkout__user">
                        <div class="title title--h3">
                            {{ $t('checkout.personal') }}
                        </div>
                        <div class="page-checkout__content-row">
                            <div class="page-checkout__row">
                                <el-form-item
                                    prop="name"
                                    :label="$t('commons.name')"
                                >
                                    <el-input v-model="formCheckout.name" />
                                </el-form-item>
                                <el-form-item
                                    prop="surname"
                                    :label="$t('commons.surname')"
                                >
                                    <el-input v-model="formCheckout.surname" />
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
                                <div class="page-checkout__delivery-item" :class="{'page-checkout__delivery-item--active': formCheckout.delivery === 'pickup'}" @click="setDelivery('pickup')">
                                    <div v-show="formCheckout.delivery === 'pickup'">
                                        <span class="fad fa-circle"></span>
                                    </div>
                                    <div v-show="formCheckout.delivery !== 'pickup'">
                                        <span class="fal fa-circle"></span>
                                    </div>
                                    <div>
                                        {{ $t('checkout.delivery.shop') }}
                                    </div>
                                </div>
                                <div class="page-checkout__delivery-item" :class="{'page-checkout__delivery-item--active': formCheckout.delivery === 'delivery'}" @click="setDelivery('delivery')">
                                    <div v-show="formCheckout.delivery === 'delivery'">
                                        <span class="fad fa-circle"></span>
                                    </div>
                                    <div v-show="formCheckout.delivery !== 'delivery'">
                                        <span class="fal fa-circle"></span>
                                    </div>
                                    <div>
                                        {{ $t('checkout.delivery.send') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="formCheckout.delivery === 'delivery'">
                            <el-form-item

                                prop="address"
                                :label="$t('commons.address')"
                            >
                                <el-input v-model="formCheckout.address" />
                            </el-form-item>
                        </div>
                        <div v-else>
                            <CardShop />
                        </div>
                    </div>
                    <div class="page-checkout__privacy container">
                        <div class="text text--primary">
                            *
                        </div>
                        <el-form-item
                            prop="privacy"
                        >
                            <el-checkbox
                                v-model="formCheckout.privacy"
                                required
                                prop="privacy"
                                :label="$t('checkout.privacyAccept')"
                            />
                        </el-form-item>
                    </div>
                </div>


                <div class="page-checkout__buttons">
                    <div class="page-checkout__buttons-submit">
                        <el-form-item>
                            <el-button
                                :loading="isLoading || isBuying"
                                type="primary"
                                @click="submit(checkoutForm)"
                            >
                                {{ $t('checkout.buy') }}
                            </el-button>
                        </el-form-item>
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
        <div v-if="!products.length" class="page-checkout page-checkout--full">
            <div class="page-checkout__content title title--h2 u-text-align-center">
                {{ $t('cart.empty') }}
            </div>
        </div>
        <div v-if="oldAccount" class="page-checkout__login">
            <LoginForm
                not-toggle
                :default-email="formCheckout.email"
                @logged="onLogged"
            />
        </div>
        <div v-if="newAccount" class="page-checkout__login">
            <RegisterForm
                not-toggle
                :default-data="formCheckout"
                @registered="onLogged"
            />
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import CardResume from '@/components/Card/Resume.vue'
    import CardShop from '@/components/Card/Shop.vue'
    import LoginForm from '@/components/Form/Login.vue'
    import RegisterForm from '@/components/Form/Register.vue'

    import useImage from '@/use/useImage'
    import useCurrency from '@/use/useCurrency'
    import useSeo from '@/use/useSeo'

    import { useGetUser, useLogout, usePurchaseBuy, useRemoveProduct } from '@/use/useApi'
    import { reactive, ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'



    export default {
        components: {
            LayoutDefault,
            LayoutScrollable,
            CardResume,
            CardShop,
            LoginForm,
            RegisterForm
        },
        setup() {
            useSeo()
            const store = useStore()
            const router = useRouter()
            const checkoutForm = ref()
            const oldAccount = ref(false)
            const newAccount = ref(false)


            const { resolveImage } = useImage()
            const { get: getPrice } = useCurrency()
            const { data: user, fetchData: getUser, isLoading } = useGetUser()
            const { data: purchase, fetchData: sendPurchase, isLoading: isBuying, error: errorPurchase } = usePurchaseBuy()
            const { fetchData: sendRemove } = useRemoveProduct()
            const { fetchData: sendLogout} = useLogout()

            const total = ref(null)
            const { t } = useI18n()
            const discounts = store.getters['discount/discounts']
            const discount = ref(0)

            const formCheckout = reactive({
                delivery: 'pickup'
            })

            const products = ref([])



            const rules = reactive({
                name: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
                surname: [
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
                        message: t('errors.form.required'),
                        trigger: 'blur',
                        validator: (instance, value) => !!value
                    }
                ],
                phone: [

                    {
                        required: true,
                        validator: (instance, phone) => {
                            const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                            const tempPhone = phone?.replaceAll(' ', '')?.replaceAll('-', '')?.replaceAll('(', '')?.replaceAll(')', '')
                            return phoneRe.test(tempPhone)
                        },
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
                sendLogout()
            }

            const afterValidation = () => {
                sendPurchase({
                    watches: products.value,
                    userId: user?.value?.id,
                    ...formCheckout
                })
            }

            const submit = () => {
                checkoutForm.value.validate().then(afterValidation)


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

            const onLogged = () => {
                oldAccount.value = false
                afterValidation()
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
                formCheckout.name = user?.value?.name
                formCheckout.surname = user?.value?.surname
                formCheckout.email = user?.value?.email
                formCheckout.phone = user?.value?.phone
                formCheckout.address = user?.value?.address
                /*toDebug   */
                formCheckout.name = 'test'
                formCheckout.surname = 'test'
                formCheckout.email ='test@test.com'
                formCheckout.phone = '+34677233356'
                formCheckout.privacy = true
                formCheckout.address = user?.value?.address
                /*endDebug */

            })


            getUser()

            watch(purchase, () => {
                console.log('purchase')
                store.dispatch('auth/setPurchase')
                router.push({
                    name: 'thanks',
                })
            })

            watch(errorPurchase, () => {
                const errorData = errorPurchase?.value?.response
                const code = errorData?.status
                const exists = errorData?.data?.exist
                console.log(errorData)
                if (code === 422) {
                    oldAccount.value = exists
                }
                if (code === 422) {
                    newAccount.value = !exists
                }

            })

            return {
                logout,
                user,
                getPrice,
                resolveImage,
                rules,
                formCheckout,
                submit,
                total,
                isLoading,
                discount,
                removeItem,
                products,
                setDelivery,
                checkoutForm,
                isBuying,
                oldAccount,
                newAccount,
                onLogged
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
      align-items: start;
      justify-content: start;
      grid-gap: 0 em(16px);
      grid-template-columns: 1fr 1fr;

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
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

      &-submit {
        &--disabled {
          opacity: 0.5;
        }
      }
    }

    &__privacy {
      position: relative;

      .text {
        position: absolute;
        top: 0;
        left: em(30px);
      }

      .el-form-item__error {
        position: absolute;
        left: 0 !important;
        top: em(-10px);
      }

      .el-checkbox__label {
        padding-left: 16px;
        white-space: break-spaces;
      }
    }

    &__login {
      padding: em(32px);
      display: grid;
      justify-content: center;
    }
  }
</style>
