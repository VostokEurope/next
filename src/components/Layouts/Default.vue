<template>
    <div class="layout-default">
        <DefaultHeader :hide-search="hideSearch" />
        <div class="layout-default__content">
            <slot />
        </div>
        <DefaultFooter />
        <DebugTools />
    </div>
</template>

<script>
    import DefaultFooter from '@/components/Base/Footer.vue'
    import DefaultHeader from '@/components/Base/Header.vue'
    import DebugTools from '@/components/Base/DebugTools.vue'

    export default {
        name: 'Default',
        components: {
            DefaultFooter,
            DefaultHeader,
            DebugTools
        },
        props: {
            hideSearch: {
                type: Boolean,
                default: false
            },
        }
    }
</script>

<style lang="postcss">
  .layout-default {
    min-height: 100vh;
  }
</style>
