
<template>
    <div class="edit-image">
        <div class="edit-image__content">
            <img class="edit-image__image" :src="src" alt="upload-image">
        </div>
    </div>
</template>

<script>
    import { ref, watch } from 'vue-demi'

    export default {
        components: {

        },
        props: {
            src: {
                type: String,
                default: 'https://sergiev-posad.rcnab.ru/wp-content/themes/cosimo-pro/images/no-image-box.png'
            },
        },
        setup(props) {
            const url = ref(props.src)
            watch(() => props.src, () => {
                url.value = props.src
            })
        }

    }
</script>

<style lang="postcss">
  .edit-image {
    background-color: var(--color-white);
    border-radius: 5px;
    padding: em(16px);

    &__content {
      position: relative;
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
