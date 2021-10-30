<template>
    <LayoutDefault>
        <div class="page-collection">
            collection - {{ $route.params.id }}
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'

    export default {
        components: {
            LayoutDefault
        },
        setup() {

        }

    }
</script>

<style lang="postcss">
  .page-collection {
    padding-top: em(16px);
    padding-bottom: em(16px);
  }
</style>
