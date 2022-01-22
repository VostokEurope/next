<template>
    <LayoutDefault>
        <div class="page-payment">
            Payment
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
  .page-payment {

  }
</style>
