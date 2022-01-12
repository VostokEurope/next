<template>
    <LayoutAdmin>
        <div class="page-admin">
            <div class="page-admin__title title--h2">
                Sections:
            </div>
            <div class="page-admin__nav ">
                <div
                    v-for="option in options"
                    :key="option.name"
                    class="page-admin__item"
                    @click="$router.push({name: option.name})"
                >
                    <div class="page-admin__wrapper">
                        <div class="page-admin__item-icon">
                            <span :class="option.meta.icon"></span>
                        </div>
                        <div class="page-admin__item-title">
                            {{ option.meta.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>
</template>

<script>
    import LayoutAdmin from '@/components/Layouts/Admin.vue'
    import useCustomRouter from '@/use/useCustomRouter'

    export default {
        components: {
            LayoutAdmin
        },
        setup() {

            const { getAdminNav } = useCustomRouter()
            const options = getAdminNav()


            return {
                options
            }

        }

    }
</script>

<style lang="postcss">
  .page-admin {
    padding: em(16px);

    &__title {
      padding: em(16px) 0;
    }

    &__nav {
      display: grid;
      grid-gap: em(16px);
      grid-template-columns: repeat(auto-fill, minmax(100px, max-content));
      font-size: 12px;
      justify-content: center;

      @media (--bp-desktop) {
        margin: 0 auto;
        grid-template-columns: repeat(auto-fill, minmax(124px, max-content));
        font-size: 16px;
      }
    }

    &__item {
      display: grid;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      text-align: center;
      background-color: #eee;
      text-transform: capitalize;
      height: em(100px);
    }

    &__wrapper {
      padding: em(16px);
      display: grid;
      grid-gap: em(16px);
    }
  }
</style>
