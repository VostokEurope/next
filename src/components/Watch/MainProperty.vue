<template>
    <div v-if="title && value" class="watch-main-property">
        <div class="watch-main-property__content">
            <h2 class=" title title--h5 ">
                {{ title }}
            </h2>
            <span v-if="value" class="watch-main-property__value">
                {{ value }}
            </span>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            }
        }
    }
</script>

<style lang="postcss">
  .watch-main-property {
    &__content {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(8px);
    }

    .title {
      font-weight: bold;
    }
  }
</style>
