<template>
    <LayoutDefault>
        <div class="page-collections">
            <div class="page-collections__content">
                <div class="page-collections__heading">
                    <h1 class="title title--h1 text--bold">
                        {{ $t('page.collections.title') }}
                    </h1>
                    <div class="page-collections__description text">
                        {{ $t('page.collections.description') }}
                    </div>
                    Privet
                    <div class="anchor-image">
                        <template
                            v-for="collection in collections?.items"
                            :key="collection?.id"
                        >
                            <a
                                v-if="collection?.watches?.length"
                                class="anchor-image__item"
                                :href="`#collection-${collection?.id}`"
                            >
                                <div
                                    class="anchor-image__title"
                                >
                                    {{ collection.name }}
                                </div>
                            </a>
                        </template>
                    </div>
                </div>
                <template v-for="collection in collections?.items">
                    <SectionShowcase
                        v-if="collection?.watches?.length"
                        :key="collection.id"
                        :loading="isLoading"
                        :anchor="`collection-${collection?.id}`"
                        :title="collection.name"
                        :items="collection.watches"
                        :description="collection.description"
                        :to-title="{
                            name: 'collection',
                            params: {
                                id: collection.slug
                            }
                        }"
                        path="watch"
                    />
                </template>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import SectionShowcase from '@/components/Section/Showcase.vue'
    import { useCollectionsBrowse } from '@/use/useApi'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            LayoutDefault,
            SectionShowcase
        },
        setup() {
            const {data: collections, fetchData, isLoading }  = useCollectionsBrowse()

            useSeo({})
            fetchData()


            return {
                collections,
                isLoading
            }

        }

    }
</script>

<style lang="postcss">
  .page-collections {
    padding: em(16px);

    &__content {
      display: grid;
      grid-gap: em(16px);
    }
  }

  .anchor-image {
    display: grid;
    grid-template-columns: repeat(auto-fill, em(100px));
    justify-content: start;
    padding: em(16px) 0;
    grid-gap: em(8px);
    align-items: center;

    &__title {
      font-weight: bold;
    }
  }
</style>
