<template>
    <div class="layout-default">
        <DefaultHeader :clear="clear" :hide-search="hideSearch" />
        <nav v-if="breadcrumbs && !clear" class="layout-default__breadcrumbs">
            <div class="" @click="$router.push({ name: 'home'})">
                {{ $t('router.home') }}
            </div>
            <slot name="breadcrumbs">
            </slot>
        </nav>

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
            clear: {
                type: Boolean,
                default: false
            },
            hideSearch: {
                type: Boolean,
                default: false
            },
            breadcrumbs: {
                type: Boolean,
                default: false
            },

        }
    }
</script>

<style lang="postcss">
  .layout-default {
    min-height: 100vh;

    &__breadcrumbs {
      padding: em(64px);
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(32px);
      background-color: #f3f3f3;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 9px;

      @media (--bp-desktop) {
        font-size: 12px;
      }

      & > * {
        cursor: pointer;
      }

      .is-active {
        cursor: default;
        opacity: 0.3;
      }
    }
  }
</style>
