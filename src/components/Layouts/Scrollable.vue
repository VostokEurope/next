<template>
    <div
        class="layout-scrollable-list"
        :class="{
            'layout-scrollable-list--not': notScrollable,
            'layout-scrollable-list--scrollable': !notScrollable
        }"
    >
        <div class="layout-scrollable-list__mask">
            <div ref="slider" class="layout-scrollable-list__scroll">
                <div class="layout-scrollable-list__items">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    export default {
        name: 'LayoutScrollableList',
        props: {
            notScrollable: {
                type: Boolean,
                default: false
            },
        },
        setup () {
            const slider = ref(null)
            let isDown = false
            let startX
            let scrollLeft

            onMounted(() => {
                slider.value.addEventListener('mousedown', (e) => {
                    isDown = true
                    slider.value.classList.add('active')
                    startX = e.pageX - slider.value.offsetLeft
                    scrollLeft = slider.value.scrollLeft
                })

                slider.value.addEventListener('mouseleave', () => {
                    isDown = false
                    slider.value.classList.remove('active')
                })

                slider.value.addEventListener('mouseup', () => {
                    isDown = false
                    slider.value.classList.remove('active')
                })

                slider.value.addEventListener('mousemove', (e) => {
                    if (!isDown) return
                    e.preventDefault()
                    const x = e.pageX - slider.value.offsetLeft
                    const walk = (x - startX) * 3
                    slider.value.scrollLeft = scrollLeft - walk
                })
            })

            return {
                slider
            }
        }
    }
</script>

<style lang="postcss">
  .layout-scrollable-list {
    &__mask {
      overflow: hidden;
    }

    &__scroll {
      padding-bottom: em(40px);
      margin-bottom: em(-20px);
      cursor: grab;

      &.active {
        cursor: grabbing;
      }
    }

    &__items {
      scroll-snap-align: start;
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-auto-columns: auto;
      grid-gap: em(16px);
      min-width: max-content;
    }

    &--not {
      .layout-scrollable-list__scroll {
        cursor: auto;

        &.active {
          cursor: auto;
        }
      }

      .layout-scrollable-list__items {
        grid-gap: 0;
      }
    }

    &--scrollable {
      .layout-scrollable-list__scroll {
        overflow-x: scroll;
        overflow-y: hidden;
      }
    }
  }
</style>
