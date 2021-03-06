<template>
    <AdminLayout>
        <div class="admin-page-coatings-edit ">
            <el-form
                ref="formRef"
                class="admin-page-coatings-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-coatings-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                        width="40"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-coatings-edit__row">
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
                <div class="admin-page-coatings-edit__row">
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
                <el-form-item
                    label="colors"
                >
                    <el-select
                        v-model="form.colors"
                        multiple
                        filterable
                        placeholder="Select"
                    >
                        <el-option
                            v-for="entry in colors?.items"
                            :key="entry.id"
                            :loading="loadingColors"
                            :label="entry.name"
                            :value="entry.id"
                        />
                    </el-select>
                </el-form-item>
                <div class="admin-page-coatings-edit__buttons">
                    <div class="admin-page-coatings-edit__buttons-submit">
                        <el-button type="primary" :loading="isSaving || isCreating" @click="submit">
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
    import { useCoatingsCreate, useCoatingsEdit, useCoatingsGet, useColorsBrowse } from '@/use/useApi'
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

            })
            const { data: coating, fetchData: get } = useCoatingsGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useCoatingsEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useCoatingsCreate()
            const { data: colors, fetchData: getColors, isLoading: loadingColors } = useColorsBrowse()

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

            watch(coating, () => {
                form.id = coating.value.id
                form.name = coating.value.name
                form.code = coating.value.code
                form.colors = coating.value.colors.map(entry => entry.id)
            })

            watch([saved, created], () => {
                router.push({name: 'admin-coatings'})
            })

            getColors()

            return {
                form,
                coating,
                submit,
                isSaving,
                isCreating,
                rules,
                formRef,
                colors,
                loadingColors
            }

        },
    }
</script>

<style lang="postcss">
  .admin-page-coatings-edit {
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
