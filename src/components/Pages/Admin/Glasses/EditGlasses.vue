<template>
    <AdminLayout>
        <div class="admin-page-glasses-edit ">
            <el-form
                ref="formRef"
                class="admin-page-glasses-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-glasses-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-glasses-edit__row">
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
                <div class="admin-page-glasses-edit__buttons">
                    <div class="admin-page-glasses-edit__buttons-submit">
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
    import { useGlassesCreate, useGlassesEdit, useGlassesGet } from '@/use/useApi'
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
                originId: undefined

            })
            const { data: glass, fetchData: get } = useGlassesGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useGlassesEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useGlassesCreate()

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

            watch(glass, () => {
                form.id = glass.value.id
                form.name = glass.value.name
            })

            watch([saved, created], () => {
                router.push({name: 'admin-glasses'})
            })

            return {
                form,
                glass,
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
  .admin-page-glasses-edit {
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
