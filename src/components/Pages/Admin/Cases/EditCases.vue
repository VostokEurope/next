<template>
    <AdminLayout>
        <div class="admin-page-cases-edit container">
            <el-form
                ref="formRef"
                class="admin-page-cases-edit__form"
                :model="form"
                label-width="120px"
                :rules="rules"
            >
                <div class="admin-page-cases-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-cases-edit__row">
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
                <div class="admin-page-cases-edit__buttons">
                    <div class="admin-page-cases-edit__buttons-submit">
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
    import { useCasesCreate, useCasesEdit, useCasesGet } from '@/use/useApi'
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
            const { data: calibre, fetchData: get } = useCasesGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useCasesEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useCasesCreate()

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

            watch(calibre, () => {
                form.id = calibre.value.id
                form.name = calibre.value.name
                form.originId = calibre.value.originId
            })

            watch([saved, created], () => {
                router.push({name: 'admin-cases'})
            })


            console.log(calibre)

            return {
                form,
                calibre,
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
  .admin-page-cases-edit {
    display: grid;
    justify-content: center;

    &__form {
      display: grid;
    }

    &__buttons {
      margin: 0 auto;
    }
  }
</style>
