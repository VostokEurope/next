<template>
    <div class="layout-admin">
        <div class="layout-admin__nav">
            <div class="layout-admin__wrapper">
                <div
                    v-for="(option, i) in routes"
                    :key="option.to"
                    class="layout-admin__element"
                >
                    <div
                        class="layout-admin__item"
                        :class="{'layout-admin__item--active': $route.name === option.name}"
                        @click="$router.push({name: option.name})"
                    >
                        <span :class="`fal fa-${option.meta.icon}`" />
                    </div>
                    <div class="layout-admin__item-label">
                        {{ option.meta.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-admin__content">
            <div class="layout-admin__heading title--h1">
                {{ $route.meta.title }}
            </div>
            <div class="layout-admin__body">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/useCustomRouter'


    export default {
        name: 'LayoutAdmin',
        components: {

        },
        setup() {
            const { getAdminNav } = useCustomRouter()
            const routes = getAdminNav()

            return {
                routes
            }
        }
    }
</script>

<style lang="postcss">
  .layout-admin {
    min-height: 100vh;
    display: grid;
    grid-template-columns: em(80px) 1fr;

    @media (--bp-desktop) {
      grid-template-columns: auto 1fr;
    }

    &__nav {
      border-right: 1px solid black;
      padding: em(16px) em(8px);
    }

    &__wrapper {
      display: grid;
      grid-auto-flow: row;
      grid-gap: em(8px);
      justify-content: center;

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__heading {
      padding: em(8px) 0;
      text-transform: uppercase;
    }

    &__body {
      padding: em(16px) 0;
    }

    &__item {
      margin: 0 auto;
      position: relative;
      display: grid;
      justify-content: center;
      align-items: center;
      background-color: black;
      color: white;
      border-radius: em(4px);
      padding: em(8px);
      height: em(40px);
      width: em(40px);
      opacity: 0.7;

      &--active {
        opacity: 1;
      }

      &-label {
        font-size: em(10px);
        padding: em(8px) 0;
        text-align: center;
        color: black;
        text-transform: capitalize;
      }
    }

    &__element {
      display: grid;
      justify-content: center;
      cursor: pointer;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }

    &__content {
      padding: em(16px);
    }
  }
</style>
