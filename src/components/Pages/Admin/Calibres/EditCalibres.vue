<template>
    <AdminLayout>
        <div class="admin-page-calibres-edit ">
            <el-form
                ref="formRef"
                class="admin-page-calibres-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-calibres-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                        width="40"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-calibres-edit__row">
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
                <div class="admin-page-calibres-edit__row">
                    <el-form-item
                        label="Origin"
                        prop="originId"
                    >
                        <el-select v-model="form.originId" filterable placeholder="Select">
                            <el-option
                                v-for="item in origins?.items"
                                :key="item.id"
                                :loading="loadingOrigins"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="admin-page-calibres-edit__buttons">
                    <div class="admin-page-calibres-edit__buttons-submit">
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
    import { useCalibresCreate, useCalibresEdit, useCalibresGet, useOriginsBrowse } from '@/use/useApi'
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
                ]
            })
            const route = useRoute()
            const form = reactive({
                id: undefined,
                name: undefined,
                originId: undefined

            })
            const { data: calibre, fetchData: get } = useCalibresGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useCalibresEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useCalibresCreate()
            const { data: origins, fetchData: getOrigins, isLoading: loadingOrigins } = useOriginsBrowse()

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
                router.push({name: 'admin-calibres'})
            })

            getOrigins()


            return {
                form,
                calibre,
                submit,
                isSaving,
                isCreating,
                rules,
                origins,
                loadingOrigins,
                formRef
            }

        },
    }
</script>

<style lang="postcss">
  .admin-page-calibres-edit {
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
