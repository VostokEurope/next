<template>
    <LayoutDefault>
        <div class="page-home">
            <BannerCollections />
            <div class="page-home__content">
                <SectionShowcase
                    :title="$t('home.news')"
                    :items="news"
                    path="watch"
                />
                <SectionShowcase
                    :title="$t('home.highlighted')"
                    :items="favorites"
                    path="watch"
                />
                <!--
                <SectionShowcase
                    :title="$t('home.offers')"
                    :items="news"
                    path="watch"
                />
                -->
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import BannerCollections from '@/components/Banners/CollectionsSlider.vue'
    import SectionShowcase from '@/components/Section/Showcase.vue'

    import { useWatchesFavorites, useWatchesNews } from '@/use/useApi'
    import useSeo from '@/use/useSeo'
    export default {
        components: {
            LayoutDefault,
            BannerCollections,
            SectionShowcase
        },
        setup() {
            useSeo()
            const { data: news,  fetchData,  isLoading: newsLoading } = useWatchesNews()
            const { data: favorites, fetchData: getFavorites,  isLoading: loadingFavorites } = useWatchesFavorites()

            fetchData()
            getFavorites()

            return {
                favorites,
                news,
                newsLoading,
                loadingFavorites
            }
        }

    }
</script>

<style lang="postcss">
  .page-home {
    padding-top: em(16px);
    padding-bottom: em(16px);

    &__content {
      padding: 0 em(32px);
    }
  }

</style>
