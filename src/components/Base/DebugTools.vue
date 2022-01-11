
<template>
    <div v-if="$store.getters['auth/user']?.role?.id === 2" class="debug-tools">
        <div v-for="shortcut in shortcuts" :key="shortcut.name" class="debug-tools__icon">
            <div @click="$router.push({ name: shortcut.name })">
                <span :class="shortcut.meta.icon"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/useCustomRouter'

    export default {
        components: {

        },
        props: {
            secondary: {
                type: Boolean,
                default: false
            },
        },
        setup() {
            const { getAdminShortcuts } = useCustomRouter()
            const shortcuts = getAdminShortcuts()

            return {
                shortcuts
            }

        }

    }
</script>

<style lang="postcss">
  .debug-tools {
    position: fixed;
    bottom: 0;
    right: -6px;
    margin-bottom: em(32px);
    z-index: 100;
    display: grid;
    grid-gap: em(8px);

    &__icon {
      background-color: var(--color-black);
      color: var(--color-white);
      padding: em(12px);
      border-radius: 5px 0 0 5px;
    }
  }
</style>
