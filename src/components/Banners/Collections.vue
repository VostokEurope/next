<template>
    <div class="banner-hero">
        <LayoutScrollable not-scrollable>
            <div
                v-for="(item, i) in collections?.items"
                :id="item.name"
                :key="item.id"
                class="banner-hero__entry"
            >
                <img class="banner-hero__image" :src="item.image">
                <div class="banner-hero__overlay">
                    <div class="banner-hero__overlay-content">
                        <div
                            class="banner-hero__overlay-wrapper"
                            @click="$router.push({ name: 'collection', params: {
                                id: item.slug
                            }})"
                        >
                            <div
                                class="banner-hero__title"
                            >
                                <div>{{ item.name }}</div>
                                <div v-if="item?.subtitle" class="subtitle">
                                    {{ item.subtitle }}
                                </div>
                            </div>
                            <div
                                class="banner-hero__buttons"
                                @click="$router.push({ name: 'collection', params: {
                                    id: item.slug
                                }})"
                            >
                                <div
                                    class="banner-hero__button"
                                >
                                    {{ $t('slider.link') }}
                                </div>
                            </div>
                        </div>
                        <div class="banner-hero__arrows">
                            <a :href="`#${collections?.items[i-1 < 0 ? collections?.items.length - 1 : i-1].name}`">
                                <span class="fa fa-angle-left"></span>
                            </a>
                            <div class="banner-hero__balls">
                                <div v-for="(ball, j) in collections?.items.length" :key="ball">
                                    <a
                                        class="banner-hero__ball"
                                        :href="`#${collections?.items[j].name}`"
                                        :class="{'banner-hero__ball--active': ball-1 === i}"
                                    >
                                        <span class="fa fa-circle" />
                                    </a>
                                </div>
                            </div>
                            <a :href="`#${collections?.items[i+1 > collections?.items.length - 1 ? 0 : i+1]?.name}`">
                                <span class="fa fa-angle-right"></span>
                            </a>
                        </div>
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
            const { data: collections, fetchData } = useCollectionsBrowse()
            fetchData({
                limit: 20
            })

            return {
                collections
            }
        }
    }
</script>

<style lang="postcss">
  .banner-hero {
    margin: 0 em(16px);
    color: var(--color-white);

    &__entry {
      height: 50vh;
      width: calc(100vw - em(32px));
      position: relative;
      border-radius: em(5px);
      overflow: hidden;

      @media (--bp-desktop) {
        height: 60vh;
      }
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
      align-items: end;
      text-align: center;
      background:
        linear-gradient(
          180deg,
          rgb(0 0 0 / 0%) 0%,
          rgb(0 0 0 / 60%) 50%,
          rgb(0 0 0 / 100%) 100%
        );

      &-content {
        display: grid;
        grid-gap: em(16px);
      }

      &-wrapper {
        display: grid;
        grid-gap: em(16px);
        cursor: pointer;
      }
    }

    &__title {
      display: grid;
      font-size: 32px;
      grid-gap: em(8px);

      .subtitle {
        opacity: 0.6;
        font-size: 24px;
      }
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
      padding: em(16px) 0;
      align-self: end;
      display: grid;
      justify-content: center;
      grid-template-columns: auto auto auto;
      grid-gap: em(16px);
    }

    &__buttons {
      cursor: pointer;
      width: 100%;
    }

    &__button {
      cursor: pointer;
      margin: 0 auto;
      border: 1px solid var(--color-white);
      padding: em(16px);
      width: em(200px);
      margin-top: em(20px);
      background: radial-gradient(circle, rgb(255 255 255 / 35%) 0%, rgb(255 255 255 / 0%) 90%);

      &:hover {
        background: radial-gradient(circle, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 0%) 100%);
      }
    }
  }
</style>

