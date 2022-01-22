<template>
    <LayoutDefault>
        <div class="page-guaranty">
            Guaranty
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            useSeo()
        }


    }
</script>

<style lang="postcss">
  .page-guaranty {

  }
</style>
