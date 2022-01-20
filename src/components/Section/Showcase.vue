<template>
    <div>
        <div v-if="!loading" class="showcase">
            <div class="showcase__heading">
                <h2 class="title title--h2 text--bold" @click="goTo">
                    {{ title }}
                </h2>

                <div v-if="anchor" :id="anchor" class="showcase__anchor">
                </div>
            </div>
            <div v-if="description" class="showcase__description text">
                {{ description }}
            </div>
            <div class="showcase__items">
                <CardElegant
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                />
            </div>
            <div v-if="more" :to="more" class="showcase__more">
                ...{{ $t('commons.showall') }}
            </div>
        </div>
        <PlaceholderSection v-else />
    </div>
</template>

<script>
    import CardElegant from '@/components/Card/Elegant.vue'
    import PlaceholderSection from '@/components/Placeholders/Section.vue'
    import { useRouter } from 'vue-router'

    export default {
        components: {
            CardElegant,
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
            description: {
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
            },
            toTitle: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props) {
            const router = useRouter()
            const goTo = () => {
                if (props?.toTitle.name) {
                    router.push(props.toTitle)
                }
            }

            return {
                goTo
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
      font-size: em(16px);
      padding: em(8px) 0;
    }

    &__description {
      cursor: pointer;
      font-size: em(14px);
      padding: em(8px) 0;
    }

    &__items {
      display: grid;
      justify-content: center;
      grid-gap: em(32px);
      padding: em(16px) 0;
      grid-template-columns: repeat(auto-fill, em(136px));

      @media (--bp-desktop) {
        justify-content: start;
        grid-template-columns: repeat(auto-fill, em(240px));
      }
    }
  }
</style>
