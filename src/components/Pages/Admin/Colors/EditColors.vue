<template>
    <AdminLayout>
        <div class="admin-page-colors-edit ">
            <el-form
                ref="formRef"
                class="admin-page-colors-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-colors-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                        width="40"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-colors-edit__row">
                    <el-form-item
                        label="code"
                        prop="code"
                    >
                        <el-input
                            v-model="form.code"
                            type="text"
                        />
                    </el-form-item>
                </div>
                <div class="admin-page-colors-edit__row">
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
                <div class="admin-page-colors-edit__row">
                    <el-form-item
                        label="color"
                        prop="color"
                    >
                        <el-color-picker v-model="form.color" />
                    </el-form-item>
                </div>
                <div class="admin-page-colors-edit__buttons">
                    <div class="admin-page-colors-edit__buttons-submit">
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
    import { useColorsCreate, useColorsEdit, useColorsGet } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue'
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
                ],
                color: [
                    {
                        required: true,
                        message: t('errors.form.required'),
                        trigger: 'blur',
                    }
                ],
                code: [
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

            })
            const { data: color, fetchData: get } = useColorsGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useColorsEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useColorsCreate()

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

            watch(color, () => {
                form.id = color.value.id
                form.name = color.value.name,
                form.color = color.value.hexadecimal,
                form.code = color.value.code
            })

            watch([saved, created], () => {
                router.push({name: 'admin-colors'})
            })

            return {
                form,
                color,
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
  .admin-page-colors-edit {
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
