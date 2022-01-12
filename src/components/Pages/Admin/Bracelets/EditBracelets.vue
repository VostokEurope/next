<template>
    <AdminLayout>
        <div class="admin-page-bracelets-edit ">
            <el-form
                ref="formRef"
                class="admin-page-bracelets-edit__form"
                :model="form"
                label-width="120px"
                :rules="rules"
            >
                <div class="admin-page-bracelets-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-bracelets-edit__row">
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
                <div class="admin-page-bracelets-edit__row">
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
                <div class="admin-page-bracelets-edit__buttons">
                    <div class="admin-page-bracelets-edit__buttons-submit">
                        <el-button type="primary" :loading="isSaving || isCreating" @click="submit">
                            {{ $t('commons.save') }}
                        </el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </AdminLayout>
</template>

<script>
    import AdminLayout from '@/components/Layouts/Admin.vue'
    import { useBraceletsCreate, useBraceletsEdit, useBraceletsGet } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue-demi'
    import { useI18n } from 'vue-i18n'

    export default {
        components: {
            AdminLayout
        },
        setup () {
            const { t } = useI18n()
            const router = useRouter()
            const formRef = ref(null)
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
                image: undefined

            })
            const { data: bracelet, fetchData: get } = useBraceletsGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useBraceletsEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useBraceletsCreate()
            if (route.params.id) {
                get({
                    id: route.params.id
                })
            }

            const submit = () => {
                formRef.value.validate().then(afterValidation)
            }

            const afterValidation = () => {
                if (route.params.id) {
                    edit(form)
                } else {
                    create(form)
                }
            }

            watch(bracelet, () => {
                console.log(bracelet.value)
                form.id = bracelet.value.id
                form.name = bracelet.value.name
                form.image = bracelet.value.image
            })

            watch([saved, created], () => {
                router.push({name: 'admin-bracelets'})
            })

            return {
                form,
                bracelet,
                submit,
                isSaving,
                isCreating,
                formRef,
                rules
            }

        },
    }
</script>

<style lang="postcss">
  .admin-page-bracelets-edit {
    display: grid;
    justify-content: center;

    &__form {
      display: grid;
    }

    &__buttons {
      margin: em(16px) auto;
    }
  }
</style>
