<template>
    <LayoutDefault>
        <div class="page-contact text">
            <div class="page-contact__row page-contact__row--reverse">
                <img :src="resolveImage('info/showcase.jpeg')">
                <div class="page-contact__texts">
                    <div>
                        <div>
                            Наш онлайн-магазин vostok-europe.shop является официальным дилером марки Vostok Europe. На сайте представлен широкий ассортимент моделей часов Восток-Европа из таких популярных коллекций, как «Анчар», «Луноход-2», «Газ-14 Лимузин», «Экспедиция Северный полюс-1», «Ракета N1», «Энергия», «Экраноплан», «Мрия» и др. Женские часы представлены коллекцией «Ундина».
                        </div>
                    </div>
                    <div>
                        <h1 class="title title--h2 ">
                            Как с нами связаться?
                        </h1>
                        <div>
                            Мы готовы ответить на все интересующие вас вопросы по часам Vostok Europe, а также оформить заказ или забронировать понравившуюся вам модель по телефону или электронной почте. Наши консультанты будут рады ответить на ваши звонки и письма!
                        </div>
                        <div class="page-contact__info">
                            <div>
                                <div>
                                    <span class="fa fa-phone-alt"></span><a class="text text--bold " href="tel:+79623007491">
                                        +7 (926) 300-74-91
                                    </a>
                                </div><div>
                                    с <span class="text">
                                        10:00 до 21:00
                                    </span> по Москве
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span class="fa fa-envelope"></span>
                                    <a class="text text--bold" href="mailto:zakaz@vostok-europe.shop">
                                        zakaz@vostok-europe.shop
                                    </a>
                                </div>
                                <div>
                                    24 часа в сутки
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page-contact__row">
                <div class="page-contact__texts">
                    <div>
                        <h2 class="title title--h2 ">
                            Наш часовой салон в Москве
                        </h2>

                        <div>
                            <a href="https://yandex.ru/maps/org/aviatortime_ru/1927044845/?ll=37.592420%2C55.752141&mode=search&sll=37.592420%2C55.752141&sspn=0.020514%2C0.008144&text=aviator%20time%20ru&z=16" target="_blank" class="italic link">
                                Москва, м. Арбатская, Новый Арбат, 15
                            </a>
                            <div class="italic">
                                Ежедневно с 10:00 до 21:00
                            </div>
                        </div>

                        <p>
                            С представленными на сайте моделями часов можно ознакомиться лично, посетив наш часовой салон на Новом Арбате, 15. В часовом салоне вы сможете детально рассмотреть интересующую вас модель, сравнить ее с другими моделями, а также задать любые вопросы, связанные с часами, нашим опытным консультантам.
                        </p>
                    </div>
                    <div>
                        <h2 class="title title--h2 ">
                            Как нас найти?
                        </h2>
                        <p>
                            Ориентир — третья книжка-высотка, если ехать из области (и вторая книжка-высотка, если идти из центра) от метро Арбатская. Слева от магазина находятся «Black Star Burger» и «Dr. Head» (наушники, микрофоны), справа — «Pentahotel» и «ФОНБЕТ». Перед магазином расположена большая парковка, всегда есть свободные парковочные места.
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <img :src="resolveImage('info/shop.jpg')">
                        <h2 class="title ">
                            «ФЛАГМАН AVIATORTIME.RU Часы России, Швейцарии…»
                        </h2>
                    </div>
                </div>
            </div>
            <div class="page-contact__row--complete">
                <h2 class="title title--h2 ">
                    Как добраться?
                </h2>
                <div>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/-/CCU5eLX63D"
                    ></iframe>
                </div>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import useSeo from '@/use/useSeo'
    import useImage from '@/use/useImage'

    export default {
        components: {
            LayoutDefault,
        },
        setup() {
            useSeo()
            const { resolveImage } = useImage()

            return {
                resolveImage
            }
        }


    }
</script>

<style lang="postcss">
  .page-contact {
    padding: em(32px);
    display: grid;
    grid-gap: em(16px);

    &__row {
      display: grid;
      grid-gap: 64px;
      justify-content: center;

      @media (--bp-desktop) {
        grid-template-columns: 2fr 1fr;
      }

      &--reverse {
        @media (--bp-desktop) {
          grid-template-columns: 1fr 2fr;
        }
      }

      &--complete {
        display: grid;
        justify-content: center;
        grid-gap: em(24px);
      }
    }

    &__texts {
      display: grid;
      align-content: start;
      grid-gap: 32px;
    }

    &__info {
      padding: em(8px) 0;
      font-size: 16px;
      display: grid;
      grid-gap: em(16px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .italic {
      font-style: italic;
      font-size: 14px;
      opacity: 0.7;
      padding-bottom: em(12px);
    }

    .title {
      padding: em(8px) 0;
    }

    iframe {
      width: 100vw;
      height: em(400px);
      border: none;
    }
  }
</style>
