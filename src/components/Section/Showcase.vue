<template>
    <div>
        <div v-if="!loading" class="showcase">
            <div class="showcase__heading">
                <h2 class="title title--h2 text--bold">
                    {{ title }}
                </h2>
                <div v-if="more" :to="more" class="showcase__more">
                    {{ $t('commons.showall') }}
                </div>
                <div v-if="anchor" :id="anchor" class="showcase__anchor">
                </div>
            </div>
            <div class="showcase__items">
                <CardBasic
                    v-for="item in items"
                    :key="item.id"
                    :title="item.name"
                    :price="item.price"
                    :to="path + item.slug"
                    :image="item.images && item.images.length ? item.images[0].src : ''"
                />
            </div>
        </div>
        <PlaceholderSection v-else />
    </div>
</template>

<script>
    import CardBasic from '@/components/Card/Basic.vue'
    import PlaceholderSection from '@/components/Placeholders/Section.vue'

    export default {
        components: {
            CardBasic,
            PlaceholderSection
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            anchor: {
                type: String,
                default: ''
            },
            more: {
                type: String,
                default: ''
            },
            items: {
                type: Array,
                default: () => ([])
            },
            path: {
                type: String,
                default: ''
            },
            loading: {
                type: Boolean,
                default: false
            }
        }

    }
</script>
<style lang="postcss">
  .showcase {
    display: grid;
    padding-bottom: em(48px);

    &__heading {
      display: grid;
    }

    &__anchor {
      position: absolute;
      bottom: em(100px);
    }

    &__more {
      text-decoration: underline;
      cursor: pointer;
      font-size: em(12px);
    }

    &__items {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fill, em(140px));
      grid-gap: em(16px);
      padding: em(8px) 0;

      @media (--bp-desktop) {
        justify-content: start;
      }
    }
  }
</style>
