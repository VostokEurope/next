<template>
    <div class="banner-hero">
        <LayoutScrollable not-scrollable>
            <div
                v-for="(item, i) in items"
                :id="item.name"
                :key="item.id"
                class="banner-hero__entry"
            >
                <img class="banner-hero__image" :src="item.image">
                <div class="banner-hero__overlay">
                    <div
                        class="banner-hero__title"
                        @click="$router.push({ name: 'collection', params: {
                            id: item.slug
                        }})"
                    >
                        {{ item.name }}
                    </div>
                    <div class="banner-hero__arrows">
                        <a :href="`#${items[i-1 < 0 ? items.length - 1 : i-1].name}`">
                            <span class="fa fa-angle-left"></span>
                        </a>
                        <div class="banner-hero__balls">
                            <div v-for="(ball, j) in items.length" :key="ball">
                                <a
                                    class="banner-hero__ball"
                                    :href="`#${items[j].name}`"
                                    :class="{'banner-hero__ball--active': ball-1 === i}"
                                >
                                    <span class="fa fa-circle" />
                                </a>
                            </div>
                        </div>
                        <a :href="`#${items[i+1 > items.length - 1 ? 0 : i+1]?.name}`">
                            <span class="fa fa-angle-right"></span>
                        </a>
                    </div>
                </div>
            </div>
        </LayoutScrollable>
    </div>
</template>

<script>
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'
    import { useCollectionsBrowse } from '@/use/useApi'

    export default {
        components: {
            LayoutScrollable
        },
        setup() {
            const { data: items, fetchData } = useCollectionsBrowse()
            fetchData()

            return {
                items
            }
        }
    }
</script>

<style lang="postcss">
  .banner-hero {
    margin: 0 em(16px);
    color: var(--color-white);

    &__entry {
      height: 80vh;
      width: calc(100vw - em(32px));
      position: relative;
      border-radius: em(5px);
      overflow: hidden;
    }

    &__image {
      border-radius: em(5px);
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 10;
      display: grid;
      justify-content: center;
      align-items: center;
      text-align: center;
      background:
        linear-gradient(
          180deg,
          rgb(0 0 0 / 0%) 0%,
          rgb(0 0 0 / 60%) 50%,
          rgb(0 0 0 / 100%) 100%
        );
    }

    &__title {
      font-size: em(36px);
    }

    &__balls {
      display: grid;
      grid-auto-flow: column;
      grid-gap: em(4px);
    }

    &__ball {
      opacity: 0.3;

      &--active {
        opacity: 1;
      }
    }

    &__arrows {
      margin: 0 auto;
      width: em(500px);
      padding: em(16px) 0;
      align-self: end;
      display: grid;
      justify-content: center;
      grid-template-columns: auto auto auto;
      grid-gap: em(16px);
    }
  }
</style>

