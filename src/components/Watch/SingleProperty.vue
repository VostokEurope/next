<template>
    <div class="single-property">
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>

<style lang="postcss">
  .watch-size {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    grid-gap: em(4px);
  }
</style>
