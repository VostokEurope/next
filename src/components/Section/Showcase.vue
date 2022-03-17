<template>
    <div>
        <div v-if="!loading" class="showcase">
            <div class="showcase__heading">
                <h2 class="title title--h2 text--bold">
                    <span :class="{'link' : toTitle?.name}" @click="goTo">
                        {{ title }}
                    </span>
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
            <div v-if="more" class="showcase__more text" @click="$router.push(more)">
                {{ $t('commons.showall') }}
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
                type: [String, Object],
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
    grid-gap: em(8px);

    &__heading {
      display: grid;
    }

    &__anchor {
      position: absolute;
      bottom: em(100px);
    }

    &__more {
      cursor: pointer;
      font-size: em(16px);
      padding: em(8px) em(16px);
      margin: 0 auto;
      background-color: var(--color-primary);
      border-radius: 5px;
      color: var(--color-white);
    }

    &__description {
      font-size: em(14px);
      padding: em(8px) 0;
    }

    &__items {
      display: grid;
      justify-content: center;
      grid-gap: em(32px);
      padding: em(16px) 0;
      grid-template-columns: repeat(auto-fill, minmax(em(120px), 1fr));

      @media (--bp-desktop) {
        justify-content: start;
        grid-template-columns: repeat(auto-fill, minmax(em(240px), 1fr));
      }
    }
  }
</style>
