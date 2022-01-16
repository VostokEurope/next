<template>
    <LayoutDefault>
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
                    {{ item.description }}
                </div>

                <div class="page-watch__price">
                    <span class="text" :class="{'text--strike': showDiscount}">
                        {{ getPrice(item.price) }}
                    </span>
                    <span v-if="showDiscount" class="text showDiscount">
                        {{ getPrice(item.price, item.discount) }}
                    </span>
                </div>

                <div v-if="item.discount && !showDiscount" class="" @click="applyDiscount">
                    Apply Discount
                </div>

                {{ item }}
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import ImageSlider from '@/components/Base/ImageSlider.vue'

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
            ImageSlider
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

                /*
                useMeta({
                    title,
                    meta: [
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
                })
                */

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
    grid-template-columns: 1fr 1fr;

    &__content {
      display: grid;
      grid-gap: em(16px);
      justify-content: start;
      align-items: start;
    }

    &__price {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(8px);
      font-weight: bold;
    }
  }
</style>
