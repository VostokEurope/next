<template>
    <LayoutDefault>
        <div class="page-collection">
            <div v-if="!isLoading" class="page-collection__content container">
                <h1 class="title title--h1 text--bold">
                    {{ collection.name }}
                </h1>
                <div class="page-collection__heading">
                    <div class="page-collection__image">
                        <VoPicture :src="collection.image" />
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
    import { useCollectionGet } from '@/use/useApi'
    import { useRoute } from 'vue-router'
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import SectionShowcase from '@/components/Section/Showcase.vue'
    import VoPicture from '@/components/Base/Picture.vue'

    export default {
        components: {
            LayoutDefault,
            SectionShowcase,
            VoPicture
        },
        setup() {
            const route = useRoute()
            const { data: collection, fetchData, isLoading }  = useCollectionGet()

            fetchData({
                id: route.params.id
            })

            return {
                collection,
                isLoading
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
