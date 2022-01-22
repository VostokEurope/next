<template>
    <div class="collection-slider">
        <LayoutScrollable not-scrollable>
            <div
                v-for="collection in collections?.items"
                :key="collection.id"
                class="collection-slider__item"
                :style="`transform:translate(-${100 * imageIndex}%)`"
            >
                <img
                    :src="resolveImage(collection.image)"
                    :alt="collection.title"
                    :title="collection.title"
                >

                <div
                    class="collection-slider__overlay"
                    @click="$router.push({ name: 'collection', params: {
                        id: collection.slug
                    }})"
                >
                    <div class="collection-slider__overlay-wrapper">
                        <h2
                            class="collection-slider__title"
                        >
                            <div>{{ collection.name }}</div>
                            <div v-if="collection?.subtitle" class="subtitle">
                                {{ collection.subtitle }}
                            </div>
                        </h2>
                        <div
                            class="collection-slider__buttons"
                            @click="$router.push({ name: 'collection', params: {
                                id: collection.slug
                            }})"
                        >
                            <div
                                class="collection-slider__button"
                            >
                                {{ $t('slider.link') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutScrollable>
        <div
            v-if="collections?.items?.length && collections?.items?.length > 1"
            class="collection-slider__navigation"
        >
            <div
                v-for="(collection, i) in collections?.items"
                :key="collection.id"
                class="collection-slider__navigation-image"
                :class="{'collection-slider__navigation-image--active': i === imageIndex}"
                :src="resolveImage(collection.image)"
                :alt="collection.title"
                :title="collection.title"
                @click="setIndexImage(i)"
            >
                <span class="fa fa-circle"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import useImage from '@/use/useImage'
    import { onMounted, ref } from 'vue'
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'
    import { useCollectionsBrowse } from '@/use/useApi'

    export default {
        components: {
            LayoutScrollable,
        },


        props: {
            images: {
                type: Array,
                default: () => ([])
            },
        },


        setup() {
            const { data: collections, fetchData } = useCollectionsBrowse()
            const { resolveImage } = useImage()
            const imageIndex = ref(0)
            const userChange = ref(false)
            const setIndexImage = (i, isAutomatic) => {
                userChange.value = !isAutomatic
                imageIndex.value = i
            }

            const interval = ref(null)

            const nextSlide = () => {
                if (userChange.value) {
                    userChange.value = false
                    return
                }
                let next = imageIndex.value + 1
                if (next > collections.value.items.length - 1) {
                    next = 0
                }
                setIndexImage(next, true)

            }

            fetchData({
                limit: 5
            })

            onMounted(() => {
                interval.value = setInterval(nextSlide, 10 * 1000)
            })

            console.log(collections)

            return {
                collections,
                resolveImage,
                imageIndex,
                setIndexImage
            }
        }


    }
</script>

<style lang="postcss">
  .collection-slider {
    color: var(--color-white);
    position: relative;
    padding: 0;
    margin: 0;

    .layout-scrollable-list__items {
      padding: 0;
      margin: 0;
    }

    &__item {
      transition: all 0.3s linear;
      position: relative;

      img {
        object-fit: cover;
        width: 100vw;
        height: 50vh;

        @media (--bp-desktop) {
          height: 65vh;
        }
      }
    }

    &__navigation {
      width: 100%;
      position: absolute;
      display: grid;
      grid-auto-flow: column;
      justify-content: center;
      grid-gap: em(4px);
      bottom: em(32px);

      &-image {
        cursor: pointer;
        opacity: 0.5;

        &--active {
          opacity: 1;
        }
      }
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: grid;
      align-items: end;
      text-align: center;
      padding-bottom: em(80px);
      background:
        linear-gradient(
          180deg,
          rgb(0 0 0 / 0%) 0%,
          rgb(0 0 0 / 60%) 50%,
          rgb(0 0 0 / 100%) 100%
        );

      &-wrapper {
        display: grid;
        grid-gap: em(48px);
        cursor: pointer;
      }
    }

    &__title {
      display: grid;
      font-size: 32px;

      @media (--bp-desktop) {
        font-size: 58px;
      }

      .subtitle {
        opacity: 0.6;
        font-size: 16px;

        @media (--bp-desktop) {
          font-size: 24px;
        }
      }
    }

    &__buttons {
      cursor: pointer;
    }

    &__button {
      border: 1px solid var(--color-white);
      padding: em(16px);
      width: em(240px);
      margin: 0 auto;
      background: radial-gradient(circle, rgb(255 255 255 / 35%) 0%, rgb(255 255 255 / 0%) 90%);

      &:hover {
        background: radial-gradient(circle, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 0%) 100%);
      }
    }
  }
</style>
