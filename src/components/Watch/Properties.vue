<template>
    <div class="watch-properties text">
        <div v-if="features?.time?.length" class="watch-properties__time">
            <h3 class="watch-properties__time-title">
                {{ $t('watch.features.time') }}
            </h3>
            <li v-for="(property, i) in features?.time" :key="property.id" class="watch-properties__time-item">
                {{ $t(`watch.property.${property.code}`) }} <span v-if="property.value " class="watch-properties__time-value">
                    ({{ property.value }}{{ property?.unity }})
                </span>
                <span v-if="i !== features?.time.length - 1" class="after">
                    ,
                </span>
            </li>
        </div>

        <div v-if="features?.others?.length" class="watch-properties__others">
            <h3 class="watch-properties__others-title">
                {{ $t('watch.features.others') }}
            </h3>
            <li v-for="(property) in features?.others" :key="property.id" class="watch-properties__others-item">
                {{ $t(`watch.property.${property.code}`) }} {{ property.value }}{{ property?.unity }}
            </li>
        </div>

        <div v-if="features?.luminosity?.length" class="watch-properties__luminosity">
            <h3 class="watch-properties__luminosity-title">
                {{ $t('watch.features.luminosity') }}
            </h3>
            <li v-for="(property) in features?.luminosity" :key="property.id" class="watch-properties__luminosity-item">
                {{ $t(`watch.property.${property.code}`) }} {{ property.value }}{{ property?.unity }}
            </li>
        </div>

        <div v-if="features?.features?.length" class="watch-properties__features">
            <h3 class="watch-properties__features-title">
                {{ $t('watch.features.features') }}
            </h3>
            <li v-for="(property) in features?.features" :key="property.id" class="watch-properties__features-item">
                {{ $t(`watch.property.${property.code}`) }} {{ property.value }}{{ property?.unity }}
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            properties: {
                type: Array,
                default: () => ([])
            }
        },
        setup(props) {
            const features = props.properties.reduce((acc, entry) => {
                const type = entry?.type?.code || 'others'
                const current = {
                    ...entry,
                    value: entry?.params?.value,
                    unity: entry?.params?.unity
                }
                if (!acc[type]) {
                    acc[type] = []
                }
                acc[type].push(current)

                return acc
            }, {})

            console.log(features)


            return {
                features
            }
        }
    }
</script>

<style lang="postcss">
  .watch-properties {
    display: grid;
    grid-gap: em(16px);

    &__content {
      display: grid;
      justify-content: start;
      grid-gap: em(8px);
    }

    &__time {
      display: flex;
      flex-wrap: wrap;
      line-height: 1;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: 0 em(8px);
      align-items: bottom;

      &-item {
        position: relative;
        display: inline-block;
        padding-right: em(8px);

        .after {
          position: absolute;
        }
      }

      &-title {
        font-weight: bold;
      }
    }

    &__luminosity,
    &__features,
    &__others {
      display: grid;
      grid-gap: em(4px);

      &-item {
        list-style: none;
        padding-left: em(16px);

        &::before {
          font-size: 7px;
          content: "◉";
          padding-top: em(17px);
          margin-left: em(-26px);
          position: absolute;
        }
      }

      &-title {
        font-weight: bold;
      }
    }
  }
</style>
