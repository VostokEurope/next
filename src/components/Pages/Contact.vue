<template>
    <LayoutDefault>
        <div class="page-contact">
            Contact
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
            const { setMetas } = useSeo({})

            return {

            }
        }


    }
</script>

<style lang="postcss">
  .page-contact {

  }
</style>
