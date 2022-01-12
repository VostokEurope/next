
<template>
    <div v-if="$store.getters['auth/user']?.role?.id === 2" class="debug-tools">
        <div v-for="shortcut in shortcuts" :key="shortcut.name" class="debug-tools__icon" @click="$router.push({ name: shortcut.name })">
            <div>
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
    right: -66px;
    margin-bottom: em(32px);
    z-index: 100;
    display: grid;
    grid-gap: em(8px);
    transition: transform 0.5s ease-in;
    will-change: transform;
    transform: translateX(30px);
    padding: 0 em(60px);

    &:hover {
      transition: transform 0.1s ease-in;
      transform: translateX(0);
    }

    &__icon {
      opacity: 0.9;
      cursor: pointer;
      background-color: var(--color-primary-dark);
      color: var(--color-white);
      padding: em(12px);
      border-radius: 5px 0 0 5px;

      &:hover {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
</style>
