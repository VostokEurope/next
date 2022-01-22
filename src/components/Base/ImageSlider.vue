<template>
    <div class="image-slider">
        <LayoutScrollable not-scrollable>
            <div
                v-for="image in images"
                :key="image.id"
                class="image-slider__item"
                :style="`transform:translate(-${100 * imageIndex}%)`"
            >
                <img
                    :src="resolveImage(image.src)"
                    :alt="image.alt"
                    :title="image.title"
                >
            </div>
        </LayoutScrollable>
        <div
            v-if="images.length && images.length > 1"
            class="image-slider__navigation"
        >
            <img
                v-for="(image, i) in images"
                :key="image.id"
                class="image-slider__navigation-image"
                :class="{'image-slider__navigation-image--active': i === imageIndex}"
                :src="resolveImage(image.src)"
                :alt="image.alt"
                :title="image.title"
                @click="setIndexImage(i)"
            >
        </div>
    </div>
</template>

<script>
    import useImage from '@/use/useImage'
    import { ref } from 'vue'
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'

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
            const { resolveImage } = useImage()
            const imageIndex = ref(0)
            const setIndexImage = (i) => {
                imageIndex.value = i

            }
            return {
                imageIndex,
                resolveImage,
                setIndexImage
            }
        }

    }
</script>

<style lang="postcss">
  .image-slider {
    position: relative;
    width: 80vw;

    @media (--bp-desktop) {
      width: 40vw;
    }

    .layout-scrollable-list__items {
      padding: 0;
    }

    &__item {
      transition: all 0.3s linear;

      img {
        width: 80vw;

        @media (--bp-desktop) {
          width: 40vw;
        }
      }
    }

    &__navigation {
      grid-gap: em(8px);
      display: grid;
      grid-auto-flow: column;
      justify-content: end;
      margin-top: em(-40px);
      z-index: 3;
      padding: 0 em(16px);

      &-image {
        cursor: pointer;
        width: em(80px);
        box-shadow: 0 19px 38px rgb(0 0 0 / 5%), 0 15px 12px rgb(0 0 0 / 5%);
        opacity: 0.5;

        &--active {
          opacity: 1;
        }
      }
    }
  }
</style>
