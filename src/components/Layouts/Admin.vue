<template>
    <div class="layout-admin">
        <DefaultHeader clear />
        <div class="layout-admin__heading title--h2">
            {{ $route.meta.title }}
        </div>
        <div class="layout-admin__icon" @click="toggleMenu">
            <div v-if="!active">
                <span class="fa fa-bars"></span>
            </div>
            <div v-if="active">
                <span class="fa fa-times"></span>
            </div>
        </div>
        <div class="layout-admin__default" :class="{'layout-admin--active' : active}">
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
                <div class="layout-admin__body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import useCustomRouter from '@/use/useCustomRouter'
    import DefaultHeader from '@/components/Base/Header.vue'
    import { ref } from 'vue'


    export default {
        name: 'LayoutAdmin',
        components: {
            DefaultHeader,

        },
        setup() {
            const active = ref(false)
            const { getAdminNav } = useCustomRouter()
            const routes = getAdminNav()
            const toggleMenu = () => {
                active.value = !active.value
            }
            return {
                routes,
                active,
                toggleMenu
            }
        }
    }
</script>

<style lang="postcss">
  .layout-admin {
    &__icon {
      position: fixed;
      margin: em(32px);
      top: 0;

      @media (--bp-desktop) {
        display: none;
      }
    }

    &__default {
      padding: em(16px) 0;
      min-height: 100vh;
      display: grid;

      @media (--bp-desktop) {
        grid-template-columns: auto 1fr;
      }
    }

    &--active {
      &.layout-admin__default {
        grid-template-columns: em(64px) 1fr;
      }

      .layout-admin__nav {
        display: block;
      }
    }

    &__nav {
      display: none;
      padding: em(4px);

      @media (--bp-desktop) {
        display: block;
        grid-template-columns: 1fr 1fr;
      }
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
      padding-top: em(16px);
      text-transform: capitalize;
      text-align: center;
    }

    &__body {
      background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(0 0 0/ 5%) 50%, rgb(255 255 255 / 0%) 100%);
      border-radius: em(5px);
      height: 100%;
    }

    &__item {
      margin: 0 auto;
      position: relative;
      display: grid;
      justify-content: center;
      align-items: center;
      color: var(--color-white);
      border-radius: em(4px);
      padding: em(8px);
      height: em(40px);
      width: em(40px);
      opacity: 0.7;
      background-color: var(--color-primary);

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
  }
</style>
