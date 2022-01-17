<template>
    <LayoutDefault breadcrumbs>
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

                <div class="page-watch__price">
                    <span class="text" :class="{'text--strike': showDiscount}">
                        {{ getPrice(item?.price) }} <span v-if="item?.discount && !showDiscount" class="page-watch__price-gift" @click="applyDiscount">
                            <span class="fas fa-gift"></span>
                        </span>
                    </span>
                    <span v-if="showDiscount" class="text showDiscount">
                        {{ getPrice(item?.price, item?.discount) }}
                    </span>
                </div>

                <div class="page-watch__buttons">
                    <div class="page-watch__button page-watch__button--large">
                        {{ $t('watch.buy') }}
                    </div>
                    <div class="page-watch__button">
                        <span class="fa fa-shopping-cart"></span>
                    </div>
                </div>

                <WatchSize :item="item" />
                <MainProperty :title="$t('watch.mechanism')" :value="item?.mechanisms?.name" />
                <MainProperty :title="$t('watch.case')" :value="item?.case?.name" />
                <MainProperty :title="$t('watch.coating')" :value="item?.coating?.name" />
                <MainProperty :title="$t('watch.glass')" :value="item?.glass?.name" />
                <WatchProperties v-if="item?.properties.length" :properties="item?.properties" />
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import ImageSlider from '@/components/Base/ImageSlider.vue'
    import WatchSize from '@/components/Watch/Size.vue'
    import WatchProperties from '@/components/Watch/Properties.vue'

    import { useWatchesGet } from '@/use/useApi'
    import { useRoute } from 'vue-router'
    import { useMeta } from 'vue-meta'
    import { ref, watch } from 'vue'
    import useImage from '@/use/useImage'
    import useSeo from '@/use/useSeo'
    import useCurrency from '@/use/useCurrency'

    export default {
        components: {
            LayoutDefault,
            ImageSlider,
            WatchProperties,
            WatchSize
        },
        setup() {
            const imageIndex = ref(0)
            const route = useRoute()
            const { resolveImage } = useImage()
            const { url: getUrl, title: getTitle } = useSeo()
            const { meta } = useMeta({
                title: getTitle(route, route?.params?.id),
            })
            const { get: getPrice } = useCurrency()
            const showDiscount = ref(false)


            const setIndexImage = (i) => {
                imageIndex.value = i

            }

            const applyDiscount = () => {
                showDiscount.value = true
            }

            const { data: item, fetchData: getWatch, isLoading } = useWatchesGet()

            getWatch({
                id: route.params.id
            })

            watch(item, () => {
                const title = getTitle(route, item?.value?.name)
                const description = item?.value?.description
                const image = resolveImage(item?.value?.images[0]?.src)
                const url = getUrl(route)


                showDiscount.value = !item?.value?.collection?.banDiscount

                meta.meta = [
                    // Primary Meta Tags
                    { name: 'title', content:  title, },
                    { name: 'description', content: description },
                    // Open Graph / Facebook
                    { property: 'og:type', content: 'shop' },
                    { property: 'og:url', content: url },
                    { property: 'og:title', content:  route.meta.title(route?.params?.id), },
                    { property: 'og:description', content: description},
                    { property: 'og:image', content: image },
                    // Twitter
                    { property: 'twitter:card', content: 'summary_large_image' },
                    { property: 'twitter:url', content: url },
                    { property: 'twitter:title', content: title },
                    { property: 'twitter:description', content: description },
                    { property: 'twitter:image', content: image },
                ]
                console.log(item.value)

            })


            return {
                isLoading,
                item,
                resolveImage,
                imageIndex,
                setIndexImage,
                getPrice,
                showDiscount,
                applyDiscount
            }

        }

    }
</script>

<style lang="postcss">
  .page-watch {
    padding: em(32px);
    display: grid;
    grid-gap: em(32px);

    @media (--bp-desktop) {
      grid-template-columns: 1fr 1fr;
    }

    &__content {
      display: grid;
      grid-gap: em(16px);
      justify-content: start;
      align-items: start;

      @media (--bp-desktop) {
        order: 1;
      }
    }

    &__price {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(8px);
      font-weight: bold;

      &-gift {
        cursor: pointer;
      }
    }

    &__buttons {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(4px);
    }

    &__button {
      cursor: pointer;
      display: grid;
      align-items: center;
      font-weight: 600;
      background-color: var(--color-primary);
      color: var(--color-primary-inside);
      padding: em(12px) em(12px);
      border-radius: 5px;
      font-size: 12px;
    }
  }
</style>
