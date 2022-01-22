<template>
    <AdminLayout>
        <div class="admin-page-origins-edit ">
            <el-form
                ref="formRef"
                class="admin-page-origins-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-origins-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                        width="40"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-origins-edit__row">
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
                <div class="admin-page-origins-edit__row">
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
                <div class="admin-page-origins-edit__row">
                    <el-checkbox v-model="form.hide" label="hidden" />
                </div>
                <div class="admin-page-origins-edit__buttons">
                    <div class="admin-page-origins-edit__buttons-submit">
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
    import { useOriginsCreate, useOriginsEdit, useOriginsGet } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            AdminLayout
        },
        setup () {
            useSeo({})
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
                code: undefined,
                hide: false

            })
            const { data: origin, fetchData: get } = useOriginsGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useOriginsEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useOriginsCreate()

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

            watch(origin, () => {
                form.id = origin.value.id
                form.name = origin.value.name
                form.code = origin.value.code
                form.hide = origin.value.hide
            })

            watch([saved, created], () => {
                router.push({name: 'admin-origins'})
            })

            return {
                form,
                origin,
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
  .admin-page-origins-edit {
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
