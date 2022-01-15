<template>
    <div class="menu">
        <div
            v-for="path in paths"
            :key="path.name"
            class="menu__item"
            :class="{'menu__item--active ': path.path === $route.path}"
            @click="$router.push({ name: path.name })"
        >
            {{ $t(`router.${path.name}`) }}
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/useCustomRouter'
    export default {

        setup() {
            const { getNavPath } = useCustomRouter()

            return {
                paths: getNavPath()
            }
        }

    }
</script>

<style lang="postcss">
  .menu {
    display: grid;
    grid-auto-flow: column;
    grid-gap: em(16px);
    justify-content: start;

    &__item {
      cursor: pointer;
      font-weight: 600;

      &--active {
        color: var(--color-primary-dark);
      }

      &:hover {
        color: var(--color-primary);
      }
    }

    &__wrapper {
      position: absolute;
      display: grid;
      justify-content: center;
      width: 100%;
    }

    &__asterisk {
      width: em(12px);
    }
  }
</style>
