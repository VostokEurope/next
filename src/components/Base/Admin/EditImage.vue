
<template>
    <div class="edit-image">
        <input
            ref="image"
            type="file"
            accept="image/*"
            hidden
            @input="uploadingImage"
        >
        <div class="edit-image__content">
            <img
                v-if="!isDeleting && !isLoading"
                class="edit-image__image"
                :src="src"
                alt="upload-image"
                @click="openImage"
            >
            <div v-else>
                loading
            </div>
        </div>
        <div v-if="imageId && !isDeleting" class="text link" @click="removeImage">
            delete {{ imageId }}
        </div>
    </div>
</template>

<script>
    import { ref, watch } from 'vue'
    import { useImageDelete, useImageUpload } from '@/use/useApi'

    export default {
        components: {

        },
        props: {
            src: {
                type: String,
                default: 'data:image/png;base64,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'
            },
            imageId: {
                type: Number,
                default: undefined
            },
            watchId: {
                type: Number,
                default: undefined
            }
        },
        emits: ['add','remove', 'change'],
        setup(props, {emit}) {
            const url = ref(props.src)
            const image = ref(null)
            const openImage = () => {
                image.value.click()
            }

            const { data: stored, fetchData: uploadImage,  isLoading} = useImageUpload()
            const { data: deleted, fetchData: deleteImage, isLoading: isDeleting} = useImageDelete()

            const uploadingImage = (event) => {
                const file = event.target.files.item(0)
                const reader = new FileReader()
                reader.readAsDataURL(file)

                uploadImage({
                    watchId: props.watchId,
                    image: file
                })
            }

            const removeImage = () => {
                deleteImage({
                    id: props.imageId
                })
            }

            watch(() => props.src, () => {
                url.value = props.src
            })

            watch(stored, () => {
                emit('add', stored.value)
                if(props.imageId) {
                    removeImage()
                }
            })

            watch(deleted, () => {
                emit('remove', props.imageId)
            })



            return {
                image,
                openImage,
                uploadingImage,
                isDeleting,
                isLoading,
                removeImage
            }
        }

    }
</script>

<style lang="postcss">
  .edit-image {
    width: auto;
    height: 100%;
    background-color: white;
    border-radius: 5px;

    &__content {
      position: relative;
      width: auto;
      height: 100%;
    }

    &__image {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      object-fit: contain;
    }
  }
</style>
