<template>
    <LayoutDefault>
        <div class="page-home">
            <BannerCollections />
            <div class="page-home__content">
                <SectionShowcase
                    :title="$t('home.news')"
                    :items="news"
                    more="true"
                    path="watch"
                />
                <SectionShowcase
                    :title="$t('home.highlighted')"
                    :items="news"
                    path="watch"
                />
                <SectionShowcase
                    :title="$t('home.offers')"
                    :items="news"
                    path="watch"
                />
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import BannerCollections from '@/components/Banners/Collections.vue'
    import SectionShowcase from '@/components/Section/Showcase.vue'

    import { useWatchNews } from '@/use/useApi'
    export default {
        components: {
            LayoutDefault,
            BannerCollections,
            SectionShowcase
        },
        setup() {
            const {
                data: news,
                fetchData,
                isLoading: newsLoading
            } = useWatchNews()
            fetchData()

            return {
                news,
                newsLoading
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
