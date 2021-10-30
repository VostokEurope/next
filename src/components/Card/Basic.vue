<template>
    <div class="card-basic" @click="$router.push(to)">
        <img class="card-basic__image" :src="image">
        <div class="card-basic__overlay">
            <div class="card-basic__price">
                {{ getPrice(price) }}
            </div>
            <div class="card-basic__title">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script>
    import useCurrency from '@/use/useCurrency'

    export default {
        components: {

        },
        props: {
            title: {
                type: String,
                default: ''
            },
            price: {
                type: Number,
                default: 0
            },
            to: {
                type: String,
                default: '/'
            },
            image: {
                type: String,
                default: ''
            }
        },

        setup() {
            const { get: getPrice } = useCurrency()
            const   goTo = () => {
                this.$router.push(this.to)
            }

            return {
                getPrice,
                goTo
            }
        }
    }
</script>p

<style lang="postcss">
  .card-basic {
    display: grid;
    position: relative;
    height: em(200px);
    width: em(140px);
    cursor: pointer;
    box-shadow: 0 0 em(8px) em(5px) rgba(0, 0, 0, 0.1);
    border-radius: em(5px);

    &__image,
    &__overlay {
      border-radius: em(5px);
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 2;
    }

    &__price {
      position: absolute;
      bottom: em(-8px);
      right: 0;
      background-color: var(--color-primary);
      color: var(--color-white);
      padding: em(8px);
      border-radius: 5px;
    }

    &__title {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.5);
      padding: em(8px);
      font-weight: bold;
      right: 0;
      font-size: em(12px);
      border-radius: 5px;
    }

    &__image {
      object-fit: cover;
    }
  }
</style>
