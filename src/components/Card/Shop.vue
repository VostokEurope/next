<template>
    <div class="card-shop">
        <div class="card-shop__icon">
            <span class="fa fa-location"></span>
        </div>
        <div>
            <div class="card-shop__title">
                ФЛАГМАН AVIATORTIME.RU
            </div>
            <div class="card-shop__address">
                Москва, м. Арбатская, Новый Арбат, 15
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {

        },
        props: {

        },

        setup() {

        }
    }
</script>p

<style lang="postcss">
  .card-shop {
    padding: em(16px);
    font-size: 12px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgb(0 174 0 / 10%);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: em(16px);
    align-items: center;

    &__title  {
      font-weight: bold;
    }

    &__icon {
      font-size: 16px;
    }
  }
</style>
