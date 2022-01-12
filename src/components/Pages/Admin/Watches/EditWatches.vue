<template>
    <AdminLayout>
        <div class="admin-page-watches-edit ">
            <el-form
                ref="formRef"
                class="admin-page-watches-edit__form"
                :model="form"
                :rules="rules"
            >
                {{ item }}
                <div class="admin-page-watches-edit__row">
                    <el-form-item
                        prop="id"
                        label="id"
                    >
                        <el-input v-model="form.id" disabled />
                    </el-form-item>
                </div>
                <div class="admin-page-watches-edit__row">
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

                <div class="admin-page-watches-edit__buttons">
                    <div class="admin-page-watches-edit__buttons-submit">
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
    import { useWatchesCreate, useWatchesEdit, useWatchesGet } from '@/use/useApi'
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

            })
            const { data: item, fetchData: get } = useWatchesGet()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useWatchesEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useWatchesCreate()

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

            watch(item, () => {
                form.id = item.value.id
                form.name = item.value.name
            })

            watch([saved, created], () => {
                router.push({name: 'admin-watches'})
            })

            console.log(item)

            return {
                form,
                item,
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
  .admin-page-watches-edit {
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
