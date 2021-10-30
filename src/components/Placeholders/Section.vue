
<template>
    <div class="placeholder-section">
        <PlaceHolderTitle />
        <div class="placeholder-section__list">
            <PlaceHolderSquare v-for="i in 10" :key="i" />
        </div>
    </div>
</template>
<script>
    import PlaceHolderTitle from '@/components/Placeholders/Title.vue'
    import PlaceHolderSquare from '@/components/Placeholders/Square.vue'
    export default {
        components: {
            PlaceHolderTitle,
            PlaceHolderSquare
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="postcss">

  .placeholder-section {
    display: grid;
    justify-content: start;
    grid-gap: em(16px);

    &__list {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: em(16px);
    }
  }

</style>
