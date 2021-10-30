
<template>
    <div class="placeholder-title">
        <div class="placeholder-title__animated"></div>
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
  .placeholder-title {
    width: em(240px);
    height: em(32px);
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
      background-size: 800px 104px;
      height: 100px;
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
