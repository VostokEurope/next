<template>
    <LayoutDefault>
        <div class="page-watch">
            {{ $route.params.id }}
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
  .page-watch {
    padding-top: em(16px);
    padding-bottom: em(16px);

    &__content {
      padding: 0 em(32px);
    }
  }
</style>
