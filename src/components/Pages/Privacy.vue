<template>
    <LayoutDefault>
        <div class="page-privacy page-html text">
            <!-- HTML HERE -->
            Privacy
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import useSeo from '@/use/useSeo'
    import useImage from '@/use/useImage'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            const { resolveImage } = useImage()

            useSeo()

            return {
                resolveImage
            }
        }


    }
</script>

<style lang="postcss">
  .page-privacy {
    iframe {
      width: 100vw;
      height: em(400px);
      border: none;
    }
  }
</style>
