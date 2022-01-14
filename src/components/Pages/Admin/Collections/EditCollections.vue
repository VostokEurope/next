<template>
    <AdminLayout>
        <div class="admin-page-collections-edit ">
            <el-form
                ref="formRef"

                :model="form"
                :rules="rules"
                class="admin-page-collections-edit__wrapper"
            >
                <div
                    class="admin-page-collections-edit__form"
                >
                    <div class="admin-page-collections-edit__row">
                        <el-form-item
                            prop="id"
                            label="id"
                            width="40"
                        >
                            <el-input v-model="form.id" disabled />
                        </el-form-item>
                    </div>
                    <div class="admin-page-collections-edit__row">
                        <el-form-item
                            label="name"
                            prop="name"
                        >
                            <el-input
                                v-model="form.name"
                                type="text"
                            />
                        </el-form-item>
                    </div>
                    <div class="admin-page-collections-edit__row">
                        <el-form-item
                            label="slug"
                            prop="slug"
                        >
                            <el-input
                                v-model="form.slug"
                                type="text"
                                disabled
                            />
                        </el-form-item>
                    </div>
                    <div class="admin-page-collections-edit__row">
                        <el-checkbox v-model="form.discount" label="Show discount" />
                    </div>
                    <div class="admin-page-collections-edit__row">
                        <el-form-item
                            label="relevance"
                            prop="relevance"
                        >
                            <el-input
                                v-model="form.relevance"
                                type="number"
                            />
                        </el-form-item>
                    </div>
                    <div class="admin-page-collections-edit__row">
                        <el-form-item
                            label="description"
                            prop="description"
                        >
                            <el-input
                                v-model="form.description"
                                :rows="10"
                                type="textarea"
                                placeholder="Add a description"
                            />
                        </el-form-item>
                    </div>
                </div>
                <div class="admin-page-collections-edit__image">
                    <div class="admin-page-collections-edit__image-edit">
                        <EditImage :src="form.image" />
                    </div>
                    <el-form-item
                        label="image"
                        prop="image"
                    >
                        <el-input
                            v-model="form.image"
                            type="text"
                        />
                    </el-form-item>
                </div>
            </el-form>
            <div class="admin-page-collections-edit__buttons">
                <div class="admin-page-collections-edit__buttons-submit">
                    <el-button type="primary" :loading="isSaving || isCreating" @click="submit">
                        {{ $t('commons.save') }}
                    </el-button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script>
    import AdminLayout from '@/components/Layouts/Admin.vue'
    import EditImage from '@/components/Base/Admin/EditImage.vue'

    import { useCollectionsCreate, useCollectionsEdit, useCollectionsGet } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue-demi'
    import { useI18n } from 'vue-i18n'

    export default {
        components: {
            AdminLayout,
            EditImage
        },
        setup () {
            const { t } = useI18n()
            const router = useRouter()
            const formRef = ref()
            const rules = reactive({
                name: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ]
            })
            const route = useRoute()
            const form = reactive({
                id: undefined,
                name: undefined,
                image: undefined,
                slug: undefined,
                description: undefined,
                discount: undefined,
                relevance: undefined
            })
            const { data: collection, fetchData: get } = useCollectionsGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useCollectionsEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useCollectionsCreate()

            if (route.params.id) {
                get({
                    id: route.params.id
                })
            }


            const submit = () => {
                formRef.value.validate().then(afterValidation)
            }

            const afterValidation = () => {
                const toSend = {
                    ...form,
                    banDiscount:!form.discount
                }
                if (route.params.id) {
                    edit(toSend)
                } else {
                    create(toSend)
                }
            }

            watch(collection, () => {
                form.id = collection.value.id
                form.name = collection.value.name
                form.slug = collection.value.slug
                form.description = collection.value.description
                form.image = collection.value.image
                form.relevance = collection.value.relevance
                form.discount = !collection.value.banDiscount
            })

            watch([saved, created], () => {
                router.push({name: 'admin-collections'})
            })

            return {
                form,
                collection,
                submit,
                isSaving,
                isCreating,
                rules,
                formRef
            }

        },
    }
</script>

<style lang="postcss">
  .admin-page-collections-edit {
    display: grid;

    &__wrapper {
      display: grid;
      grid-gap: em(32px);
      padding: em(32px);

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__form {
      display: grid;
    }

    &__image {
      &-edit {
        overflow: hidden;
        width: 100%;
        height: em(340px);
        border-radius: 5px;
      }
    }

    &__buttons {
      margin: em(16px) auto;
    }
  }
</style>
