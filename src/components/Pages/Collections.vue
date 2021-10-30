<template>
    <LayoutDefault>
        <div class="page-collections">
            <div class="container">
                <div class="page-collection__heading">
                    <h1 class="title title--h1 text--bold">
                        {{ $t('collections.page.title') }}
                    </h1>
                    <div class="page-collection__description text">
                        {{ $t('collections.page.description') }}
                    </div>
                    <div class="anchor-image">
                        <template
                            v-for="collection in collections"
                            :key="collection?.id"
                        >
                            <a
                                v-if="collection?.watches?.length"
                                class="anchor-image__item"
                                :href="`#collection-${collection?.id}`"
                            >
                                <div class="anchor-image__title">
                                    {{ collection.name }}
                                </div>
                            </a>
                        </template>
                    </div>
                </div>
                <template v-for="collection in collections">
                    <SectionShowcase
                        v-if="collection?.watches?.length"
                        :key="collection.id"
                        :loading="isLoading"
                        :anchor="`collection-${collection?.id}`"
                        :title="collection.name"
                        :items="collection.watches"
                        path="/chasy/"
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

    export default {
        components: {
            LayoutDefault,
            SectionShowcase
        },
        setup() {

            const {data: collections, fetchData, isLoading }  = useCollectionsBrowse()
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
    padding-top: em(16px);
    padding-bottom: em(16px);
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
