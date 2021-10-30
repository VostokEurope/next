
<template>
    <div class="placeholder-square">
        <div class="placeholder-square__animated"></div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="postcss">
  .placeholder-square {
    width: em(160px);
    height: em(200px);
    border-radius: 5px;
    overflow: hidden;

    &__animated {
      animation-duration: 1.25s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: shimmer;
      animation-timing-function: linear;
      background: darkgray;
      background: linear-gradient(to right, #eee 10%, #ddd 18%, #eee 33%);
      background-size: 800px 200px;
      height: em(200px);
      position: relative;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }

</style>
