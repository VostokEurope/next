<template>
    <LayoutDefault clear>
        <div class="page-checkout">
            <el-form
                :model="formCheckout"
                :rules="checkoutRules"
                class="page-checkout__content"
            >
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
                    <el-form-item
                        prop="address"
                        :label="$t('commons.address')"
                    >
                        <el-input v-model="formCheckout.address" />
                    </el-form-item>
                </div>
                <div class="page-checkout__buttons">
                    <div class="page-checkout__buttons-submit">
                        <el-button type="primary" :loading="isLoading" @click="submitChekcout">
                            {{ $t('checkout.buy') }}
                        </el-button>
                    </div>
                </div>
            </el-form>
            <div class="page-checkout__resume">
                <div class="title title--h3">
                    {{ $t('checkout.resume') }}
                </div>
                <div v-for="product in user?.products" :key="product.id" class="page-checkout__item  text">
                    <div class="page-checkout__item-watch">
                        <div class="page-checkout__name text--bold">
                            {{ product.name }}:
                        </div>
                    </div>
                    <div class="page-checkout__item-price">
                        {{ getPrice(product?.price) }}
                    </div>
                </div>
                <div class="page-checkout__item">
                    <div>{{ $t('checkout.total') }}</div>
                    <div class="text--bold">
                        {{ getPrice(total) }}
                    </div>
                </div>
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
    import { reactive, ref, watch } from 'vue-demi'
    import { useI18n } from 'vue-i18n'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            const store = useStore()
            const { resolveImage } = useImage()
            const { get: getPrice } = useCurrency()
            const { data: user, fetchData: getUser,  isLoading } = useGetUser()
            const total = ref(null)
            const { t } = useI18n()
            const formCheckout = reactive({

            })

            const checkoutRules = reactive({
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
                ]
            })
            const logout = () => {
                store.dispatch('auth/logout')
            }

            const submitChekcout = () => {

            }

            getUser()

            watch(user, () => {
                total.value = user.value.products.reduce((acc, item) => {
                    acc += item.price
                    return acc
                }, 0)

            })


            return {
                logout,
                user,
                getPrice,
                resolveImage,
                checkoutRules,
                formCheckout,
                submitChekcout,
                total,
                isLoading
            }
        }



    }
</script>

<style lang="postcss">
  .page-checkout {
    padding: em(16px);
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: em(16px);

    &__content,
    &__resume {
      border-radius: em(5px);
      background-color: white;
      padding: em(16px);
    }

    &__content {
      display: grid;
      grid-gap: em(8px);
    }

    &__payment,
    &__user {
      display: grid;
    }

    &__row {
      display: grid;
      grid-template-columns: repeat(auto-fill, em(200px));
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

    &__resume {
      .title {
        padding: em(8px) 0;
      }
    }
  }
</style>
