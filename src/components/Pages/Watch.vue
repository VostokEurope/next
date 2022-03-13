<template>
    <LayoutDefault v-if="item?.id" breadcrumbs>
        <template #breadcrumbs>
            /
            <div
                v-if="item?.collection?.name"
                @click="$router.push({name:'collection', params: {id: item?.collection?.slug}})"
            >
                {{ item?.collection?.name }}
            </div>
            /
            <div
                v-if="item?.name"
                class="is-active"
            >
                {{ item?.name }}
            </div>
        </template>

        <div class="page-watch">
            <div
                v-if="item?.editable && $store?.getters['auth/user']?.role?.id === 2"
                class="page-watch__edit"
                @click="$router.push({name: 'admin-watches-edit', params: {id: item?.id} } )"
            >
                <span class="fa fa-edit"></span>
            </div>
            <div class="page-watch__wrapper">
                <ImageSlider
                    v-if="item?.images?.length"
                    :images="item?.images"
                />
                <div class="page-watch__content">
                    <h1 class="title title--h1">
                        {{ item?.name }}
                    </h1>

                    <div class="page-watch__description text">
                        {{ item?.description }}
                    </div>

                    <div>
                        <div class="page-watch__price">
                            <span class="text" :class="{'text--strike': showDiscount}">
                                {{ getPrice(item?.price) }} <span
                                    v-if="item?.discount && !showDiscount && false"
                                    class="page-watch__price-gift"
                                    @click="applyDiscount"
                                >
                                    <span class="link">
                                        получить скидку
                                    </span>
                                </span>
                            </span>
                            <span v-if="showDiscount" class="text showDiscount">
                                {{ getPrice(item?.price, item?.discount) }}
                            </span>
                        </div>

                        <div class="page-watch__buttons">
                            <div class="page-watch__button page-watch__button--large" @click="buy">
                                {{ $t('watch.buy') }}
                            </div>
                            <div class="page-watch__button page-watch__button--secondary" @click="addToCart">
                                <div v-show="!isAdding">
                                    <span class="fa fa-shopping-cart"></span>
                                </div>
                                <div v-show="isAdding" :disabled="isAdding" :class="{ 'page-watch__button--loading' : isAdding }">
                                    <span class="fas fa-spinner"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="page-watch__props">
                        <WatchSize :item="item" />
                        <MainProperty :title="$t('watch.gender.value')" :value="$t(`watch.gender.${item?.gender?.name}`)" />
                        <MainProperty :title="$t('watch.mechanism')" :value="item?.mechanisms?.name" />
                        <MainProperty :title="$t('watch.case')" :value="item?.case?.name" />
                        <MainProperty :title="$t('watch.coating')" :value="item?.coating?.name">
                            <div class="page-watch__balls">
                                <div
                                    v-for="color in item?.coating?.colors"
                                    :key="color.id"
                                    class="page-watch__balls-wrap"
                                >
                                    <span class="page-watch__ball" :style="`background-color:${color.hexadecimal}`"></span>
                                    <span>{{ color.name }}</span>
                                </div>
                            </div>
                        </MainProperty>
                        <MainProperty :title="$t('watch.resistance.value')" :value="`${item?.resistance?.name} ${$t('watch.resistance.unity')}`" />
                        <MainProperty :title="$t('watch.glass')" :value="item?.glass?.name" />
                        <MainProperty :title="$t('watch.dialColor')" :value="item?.color?.name">
                            <span class="page-watch__ball" :style="`background-color:${item?.color?.hexadecimal}`"></span>
                        </MainProperty>
                        <ul v-if="item?.calibres?.length" class="page-watch__calibres">
                            <h2 class="title title--h5 text--bold">
                                {{ $t('watch.calibres') }}
                            </h2>
                            <li v-for="calibre in item?.calibres" :key="calibre.id" class="page-watch__calibres-item text">
                                {{ calibre.name }} <span v-if="!calibre.origin.hide">
                                    {{ calibre.origin.code }}
                                </span>
                            </li>
                        </ul>
                        <ul v-if="item?.bracelets?.length" class="page-watch__calibres">
                            <h2 class="title title--h5 text--bold">
                                {{ $t('watch.bracelets') }}
                            </h2>
                            <span class="page-watch__calibres-item text">
                                {{ item?.bracelets.map(e => e.name).join(', ') }}
                            </span>
                        </ul>
                    </div>
                    <WatchProperties
                        v-if="item?.properties.length"
                        :properties="item?.properties"
                    />
                </div>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import ImageSlider from '@/components/Base/ImageSlider.vue'
    import WatchSize from '@/components/Watch/Size.vue'
    import WatchProperties from '@/components/Watch/Properties.vue'
    import MainProperty from '@/components/Watch/MainProperty.vue'

    import { useAddProduct, useWatchesGet } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { ref, watch } from 'vue'
    import useImage from '@/use/useImage'
    import useSeo from '@/use/useSeo'
    import useCurrency from '@/use/useCurrency'
    import { useStore } from 'vuex'

    export default {
        components: {
            LayoutDefault,
            ImageSlider,
            WatchProperties,
            WatchSize,
            MainProperty
        },
        setup() {
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const { resolveImage } = useImage()

            const { setMetas } = useSeo({
                name: route?.params?.id.toUpperCase()
            })
            const { get: getPrice } = useCurrency()
            const discounts = store.getters['discount/discounts']
            const showDiscount = ref(false)
            const toBuy = ref(false)




            const applyDiscount = () => {
                store.dispatch('discount/add', item?.value.id)
                showDiscount.value = true
            }

            const buy = () => {
                toBuy.value = true
                addProduct({
                    watchId: item?.value?.id,
                    ...item?.value
                })


            }



            const { data: item, fetchData: getWatch, isLoading } = useWatchesGet()
            const { isFinished, fetchData: addProduct,isLoading: isAdding} = useAddProduct()


            const addToCart = ()  =>{
                addProduct({
                    watchId: item?.value?.id,
                    ...item?.value
                })
            }
            getWatch({
                id: route.params.id
            })

            watch(item, () => {
                showDiscount.value = !item?.value?.collection?.banDiscount || discounts.includes(item?.value?.id)
                setMetas({
                    name: item.value.name,
                    description: item.value.description
                })
            })

            watch(isFinished, () => {
                if(toBuy.value) {
                    router.push({name: 'checkout'})
                } else {
                    router.go()
                }

            })


            return {
                isLoading,
                item,
                resolveImage,
                getPrice,
                showDiscount,
                applyDiscount,
                addToCart,
                isAdding,
                buy
            }

        }

    }
</script>

<style lang="postcss">
  .page-watch {
    &__edit {
      display: grid;
      justify-content: end;
      margin: em(16px) em(32px);
    }

    &__wrapper {
      padding: em(32px);
      display: grid;
      grid-gap: em(32px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__content {
      & > * {
        padding: em(12px) 0;
      }
    }

    &__price {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(8px);
      font-weight: bold;
      align-items: center;
      font-size: 18px;
      padding: em(8px) 0;

      &-gift {
        cursor: pointer;
        padding: em(8px) em(8px);
      }
    }

    &__buttons {
      margin: em(8px) 0;
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(12px);
    }

    &__button {
      cursor: pointer;
      display: grid;
      align-items: center;
      font-weight: 600;
      background-color: var(--color-primary);
      color: var(--color-primary-inside);
      padding: em(16px);
      border-radius: 5px;

      &--secondary {
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
        background-color: var(--color-primary-inside);
      }

      &--loading {
        animation: spin 0.7s linear infinite;
      }

      &--large {
        padding: em(16px) em(32px);
        font-size: 16px;
      }
    }

    &__ball {
      display: inline-block;
      width: em(12px);
      height: em(12px);
      border-radius: 50%;
      align-self: center;
    }

    &__balls {
      display: grid;
      grid-auto-flow: column;
      grid-gap: em(8px);

      &-wrap {
        display: grid;
        grid-auto-flow: column;
        justify-content: start;
        grid-gap: em(4px);
        align-items: center;
      }
    }

    &__props {
      display: grid;
      grid-gap: em(8px);
    }

    &__calibres {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      align-items: center;
      grid-gap: em(8px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>
