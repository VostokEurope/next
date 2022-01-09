<template>
    <div class="header">
        <div class="header__promo">
            <div class="header__wrapper">
                <div class="header__claim">
                    {{ $t('header.contact') }}
                </div>
                <div class="header__claim">
                    {{ $t('header.claim.2') }}
                </div>
                <div class="header__claim">
                    {{ $t('header.claim.3') }}
                </div>
            </div>
        </div>
        <div class="header__brand">
            <div class="header__image">
                <img src="https://hoprojection.com/wp-content/uploads/2018/05/Vostok_Europe_Hoprojection_Hopro_Hologram-1288x724.png">
            </div>
        </div>
        <div class="header__tool">
            <HeaderMenu />
            <div class="">
                search
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderMenu from '@/components/Base/Header/Menu.vue'
    export default {
        components: {
            HeaderMenu
        },
        setup() {

        }
    }
</script>

<style lang="postcss">
  .header {
    display: grid;

    &__promo {
      background-color: #ddd;
      padding: em(8px) em(16px);
      display: grid;
      justify-content: center;
    }

    &__wrapper {
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30vw;
    }

    &__brand {
      height: 52px;
      display: grid;
      justify-content: center;
      align-items: center;
      padding: em(8px);
    }

    &__image {
      height: 100%;

      img {
        height: em(52px);
        object-fit: cover;
      }
    }

    &__tool {
      padding: em(8px) em(16px);
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
  }
</style>

