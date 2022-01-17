<template>
    <div class="watch-main-property">
        <h2 class="watch-main-property__content title title--h5 ">
            {{ title }}
            <span class="watch-main-property__value">
                {{ value }}
            </span>
        </h2>
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

    &__value {
      font-weight: bold;
    }
  }
</style>
