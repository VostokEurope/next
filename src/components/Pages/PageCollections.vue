<template>
    <LayoutDefault>
        <div class="page-collections">
            <div class="page-collections__content">
                <div class="page-collections__heading">
                    <h1 class="title title--h1 text--bold">
                        {{ $t('collections.page.title') }}
                    </h1>
                    <div class="page-collections__description text">
                        {{ $t('collections.page.description') }}
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
    import { useMeta } from 'vue-meta'
    import useSeo from '@/use/useSeo'
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n'

    export default {
        components: {
            LayoutDefault,
            SectionShowcase
        },
        setup() {
            const route = useRoute()
            const {data: collections, fetchData, isLoading }  = useCollectionsBrowse()
            const { url: getUrl } = useSeo()
            const { t } = useI18n()
            const title = t('collections.page.title')
            const description =t('collections.page.description')
            const url = getUrl(route)
            useMeta({
                title: t('collections.page.title'),
                description : t('collections.page.description'),
                meta: [
                    // Primary Meta Tags
                    { name: 'title', content:  title, },
                    { name: 'description', content: description },
                    // Open Graph / Facebook
                    { property: 'og:type', content: 'shop' },
                    { property: 'og:url', content: url },
                    { property: 'og:title', content:  title, },
                    { property: 'og:description', content: description},
                    // Twitter
                    { property: 'twitter:card', content: 'summary_large_image' },
                    { property: 'twitter:url', content: url },
                    { property: 'twitter:title', content: title },
                    { property: 'twitter:description', content: description },
                ]
            })
            fetchData()


            return {
                collections,
                isLoading,
                title
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
