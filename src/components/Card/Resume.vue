<template>
    <div
        class="card-resume"
        :style="`opacity:${opacity}`"
    >
        <div class="card-resume__media">
            <img class="card-resume__image" :src="resolveImage(item?.images[0]?.src)">
        </div>
        <div class="card-resume__body text">
            <div class="card-resume__wrapper">
                <div v-if="item.appliedDiscount" class="card-resume__price">
                    <span class="text--bold">
                        {{ getPrice(item?.price - item.appliedDiscount) }}
                    </span>
                    <span class="text--small text--strike">
                        {{ getPrice(item?.price) }}
                    </span>
                </div>
                <div v-else class="text--bold">
                    {{ getPrice(item?.price) }}
                </div>
                <div class="text--small">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div>
            <div class="card-resume__close" @click="remove(item.id)">
                <span class="fa fa-times"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import useCurrency from '@/use/useCurrency'
    import useImage from '@/use/useImage'
    import { ref } from 'vue-demi'

    export default {
        components: {

        },
        props: {
            item: {
                type: Object,
                default: () => {}
            },
        },
        emits: ['remove'],
        setup(props, { emit }) {
            const opacity = ref(1)
            const { get: getPrice } = useCurrency()
            const { resolveImage } = useImage()

            const remove = (id) => {
                emit('remove', id)
            }

            return {
                resolveImage,
                getPrice,
                remove,
                opacity
            }
        }
    }
</script>p

<style lang="postcss">
  .card-resume {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr auto;
    border-radius: em(8px);
    padding: em(16px);
    grid-gap: em(8px);
    box-shadow: 2px 2px 0 0 rgb(254 205 211 / 10%), 0 0 2px 2px rgb(254 205 211 / 10%);

    &__body {
      display: grid;
      align-items: center;
      justify-content: center;
    }

    &__wrapper {
      display: grid;
    }

    &__media {
      width: em(60px);
    }

    &__close {
      cursor: pointer;
    }

    &__price {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 8px;
      align-items: center;
    }
  }
</style>
