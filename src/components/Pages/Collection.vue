<template>
    <LayoutDefault breadcrumbs>
        <template #breadcrumbs>
            /
            <div
                @click="$router.push({name:'collections'})"
            >
                {{ $t('router.collections') }}
            </div>
            /
            <div
                v-if="collection?.name"
                class="is-active"
            >
                {{ collection?.name }}
            </div>
        </template>
        <div class="page-collection">
            <div v-if="!isLoading" class="page-collection__content ">
                <h1 class="title title--h1 text--bold">
                    {{ collection.name }}
                </h1>
                <div class="page-collection__heading">
                    <div class="page-collection__image">
                        <VoPicture :src="resolveImage(collection.image)" />
                    </div>
                    <div class="page-collection__description text">
                        {{ collection.description }}
                    </div>
                </div>
                <SectionShowcase
                    v-if="collection.watches.length"
                    class="page-collection__items"
                    :title="$t('commons.business.watches')"
                    :items="collection.watches"
                    path="watch"
                />
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import { useCollectionsGet } from '@/use/useApi'
    import { useRoute } from 'vue-router'
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import SectionShowcase from '@/components/Section/Showcase.vue'
    import VoPicture from '@/components/Base/Picture.vue'
    import useSeo from '@/use/useSeo'
    import { watch } from 'vue'
    import useImage from '@/use/useImage'

    export default {
        components: {
            LayoutDefault,
            SectionShowcase,
            VoPicture
        },
        setup() {
            const { resolveImage } = useImage()
            const route = useRoute()
            const { data: collection, fetchData, isLoading }  = useCollectionsGet()
            const {setMetas} = useSeo()

            fetchData({
                id: route.params.id
            })

            watch(collection, () => {
                setMetas({
                    item: collection.value.name,
                    description: collection.value.description
                })
            })

            return {
                collection,
                isLoading,
                resolveImage
            }
        }

    }
</script>

<style lang="postcss">
  .page-collection {
    display: grid;
    padding: em(16px);

    &__content {
      display: grid;
      grid-gap: em(16px);
    }

    &__heading {
      display: grid;
      grid-gap: em(32px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
</style>
