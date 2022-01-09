<template>
    <LayoutDefault>
        <div v-if="!isLoading" class="page-watch">
            <div v-for="key in Object.keys(watch)" :key="key" class="">
                {{ key }} - {{ watch[key] }}
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import { useWatchGet } from '@/use/useApi'
    import { useRoute } from 'vue-router'

    export default {
        components: {
            LayoutDefault
        },
        setup() {
            const route = useRoute()
            const { data: watch, fetchData: getWatch, isLoading } = useWatchGet()

            getWatch({
                id: route.params.id
            })

            return {
                isLoading,
                watch
            }

        }

    }
</script>

<style lang="postcss">
  .page-watch {
    padding-top: em(16px);
    padding-bottom: em(16px);

    &__content {
      padding: 0 em(32px);
    }
  }
</style>
