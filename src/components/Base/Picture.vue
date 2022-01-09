<template>
    <picture
        class="picture"
        :class="{
            'picture--has-overlay' : overlay,
            'picture--auto' : auto || fullWidth,
            'picture--full-width' : fullWidth
        }"
    >
        <img
            class="picture__img"
            :src="src"
            :alt="alt"
            :loading="loading"
            :class="`${src}`"
        >
    </picture>
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                default: '/images/fit/not-image.jpg'
            },
            alt: {
                type: String,
                default: ''
            },
            overlay: {
                type: Boolean,
                default: false
            },
            auto: {
                type: Boolean,
                default: false
            },
            fullWidth: {
                type: Boolean,
                default: false
            },
            loading: {
                type: String,
                default: 'lazy'
            }
        }
    }
</script>

<style lang="postcss">
  .picture {
    position: relative;
    overflow: hidden;
    border-radius: em(8px);

    &:not(&--auto) {
      &::before {
        content: "";
        display: block;
        width: 100%;
        padding-top: calc(var(--picture-height-ratio, 9) / var(--picture-width-ratio, 16) * 100%);
      }

      .picture__img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        opacity: var(--picture-img-opacity, 1);
      }
    }

    &--full-width {
      .picture__img {
        width: 100%;
      }
    }

    &--has-overlay {
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        background-color: var(--picture-overlay-color, var(--color-navy-700));
        width: 100%;
        height: 100%;
        z-index: 3;
      }
    }
  }
</style>
