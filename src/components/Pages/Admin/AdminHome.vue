<template>
    <LayoutAdmin>
        <div class="page-admin">
            admin
        </div>
    </LayoutAdmin>
</template>

<script>
    import LayoutAdmin from '@/components/Layouts/Admin.vue'
    import { useCollectionsBrowse } from '@/use/useApi'

    export default {
        components: {
            LayoutAdmin
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
  .page-admin {

  }
</style>
