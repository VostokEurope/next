<template>
    <div
        class="card-elegant"
        @click="$router.push({name: 'watch', params: {id: item.slug}})"
    >
        <img
            class="card-elegant__image"
            :src="resolveImage(item?.images[0]?.src)"
        >
        <div class="card-elegant__title text link">
            {{ item.name }}
        </div>
        <div class="card-elegant__price text">
            {{ getPrice(item.price) }}
        </div>
    </div>
</template>

<script>
    import useCurrency from '@/use/useCurrency'
    import { useRouter } from 'vue-router'
    import useImage from '@/use/useImage'

    export default {
        components: {

        },
        props: {
            item: {
                type: Object,
                default: () => {}
            },
        },

        setup() {
            const router = useRouter()
            const { get: getPrice } = useCurrency()
            const { resolveImage } = useImage()

            const goTo = () => {
                router.push(this.to)
            }

            return {
                resolveImage,
                getPrice,
                goTo
            }
        }
    }
</script>p

<style lang="postcss">
  .card-elegant {
    cursor: pointer;
    text-align: center;
    display: grid;
    grid-gap: em(8px);
    font-weight: bold;

    &__image {
      width: em(300px);
      height: auto;
    }

    &__title {
      font-size: 18px;
    }

    &__price {
      font-size: 16px;
      color: var(--color-primary);
    }
  }
</style>
