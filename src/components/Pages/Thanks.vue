<template>
    <LayoutDefault>
        <div class="page-thanks container">
            <div class="page-thanks__wrapper">
                <div class="page-thanks__icon">
                    <span class="fa fa-check-circle"></span>
                </div>
                <div class="page-thanks__text text">
                    {{ $t('thanks.text') }}
                </div>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            useSeo()
        }


    }
</script>

<style lang="postcss">
  .page-thanks {
    display: grid;
    justify-content: center;
    grid-gap: em(16px);
    min-height: 40vh;
    align-items: center;
    text-align: center;

    &__wrapper {
      display: grid;
      max-width: 80%;
      grid-gap: em(16px);
      margin: 0 auto;
    }

    &__icon {
      font-size: 32px;
      color: var(--color-success);
    }

    &__text {
      font-size: 24px;
    }
  }
</style>
