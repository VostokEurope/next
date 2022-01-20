<template>
    <div v-if=" item?.width || item?.height || item?.thickness" class="watch-size">
        <h2 class="title title--h4 text--bold">
            {{ $t('watch.size') }}
        </h2>
        <div v-if="item?.width && item?.height !== item?.width" class="watch-size__row">
            <span class="fa fa-arrows-alt-h"></span> {{ item?.width }} mm
        </div>
        <div v-if="item?.height && item?.height !== item?.width" class="watch-size__row">
            <span class="fa fa-arrows-alt-v"></span> {{ item?.height }} mm
        </div>
        <div v-if="item?.height && item?.height === item?.width" class="watch-size__row">
            Ø {{ item?.height }} mm
        </div>
        <div v-if="item?.thickness" class="watch-size__row">
            x {{ item?.thickness }} mm
        </div>
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
