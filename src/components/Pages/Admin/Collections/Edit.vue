<template>
    <FitLayoutDefault>
        <div class="fit-page-training-plans fit-container">
            <FitHeaderPage
                title="Training Plans"
                :breadcrumbs="[{ text: 'Training Plans', to: { name: 'plans' } }]"
                @back="$router.go(-1)"
            />
            <el-card shadow="never">
                <template #header>
                    <div class="fit-page-training-plans__actions">
                        <el-input
                            v-model="search"
                            placeholder="Search"
                            clearable
                            @input="filterTable"
                        />
                        <el-button type="primary" plain :loading="loadingCreate" @click="create">
                            New
                        </el-button>
                    </div>
                </template>
                <el-table
                    v-loading="isLoading"
                    class="fit-page-training-plans__table"
                    :data="plans?.items"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column label="id" prop="id" width="80" />
                    <el-table-column label="Name" prop="title" />
                    <el-table-column label="Tribe" prop="tribe.name" width="140" />
                    <el-table-column label="Type" prop="type" width="80" />
                    <el-table-column label="Published" prop="published" width="100">
                        <template #default>
                            <div class="fit-page-training-plans__row-unpublished">
                                <span style="color: red;" class="fa fa-circle"></span>
                            </div>
                            <div class="fit-page-training-plans__row-published">
                                <span style="color: green;" class="fa fa-circle"></span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="Actions" width="120">
                        <template #default="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="editRow(scope.row)"
                            >
                                <span class="fal fa-pencil"></span>
                            </el-button>
                            <el-button
                                type="text"
                                size="small"
                                :loading="loadingClone"
                                @click="copyRow(scope.row)"
                            >
                                <span v-if="!loadingClone" class="fal fa-copy"></span>
                            </el-button>
                            <el-popconfirm
                                title="Are you sure to delete this?"
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                @confirm="unpublishRow(scope.row)"
                            >
                                <template #reference>
                                    <el-button
                                        type="text"
                                        size="small"
                                        :loading="loadingDelete"
                                    >
                                        <span v-if="!loadingDelete" class="fal fa-trash"></span>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="plans?.pagination?.totalPages > 1" class="fit-page-training-plans__pagination">
                    <el-pagination
                        v-model:currentPage="currentPage"
                        layout="prev, pager, next"
                        :page-count="plans?.pagination?.totalPages"
                        :pager-count="5"
                    />
                </div>
            </el-card>
        </div>
    </FitLayoutDefault>
</template>

<script>
    import FitLayoutDefault from '@/componentsFit/Layouts/Default.vue'
    import FitHeaderPage from '@/componentsFit/Core/HeaderPage.vue'
    import { useRouter } from 'vue-router'
    import { ref, watch } from 'vue'
    import { debounce } from 'lodash'
    import { usePlanBrowse, usePlanClone, usePlanCreate, usePlanDelete } from '@/use/useApi'


    export default {
        components: {
            FitLayoutDefault,
            FitHeaderPage
        },
        setup () {
            const router = useRouter()
            const { fetchData: getPlans, data: plans, isLoading } = usePlanBrowse()
            const { fetchData: removePlan, data: removed, isLoading: loadingDelete  } = usePlanDelete()
            const { fetchData: clonePlan, data: cloned, isLoading: loadingClone  } = usePlanClone()
            const { fetchData: createPlan, data: created, isLoading: loadingCreate  } = usePlanCreate()

            const search = ref('')
            const currentPage = ref(1)

            const tableRowClassName = ({
                row
            }) => {
                const base = 'fit-page-training-plans__row'
                if (!row.published) {
                    return `${base} ${base}--unpublished`
                }
                return `${base}`
            }

            const editRow = (plan) => {
                router.push({ name: 'trainings-plan-edit', params: { plan: plan.id } })
            }
            const copyRow = (plan) => {
                clonePlan({
                    id: plan.id
                })
            }
            const create = (plan) => {
                createPlan()
            }
            const unpublishRow = (plan) => {
                removePlan({
                    id: plan.id
                })
            }

            const filterTable = debounce((value) =>
                getPlans({
                    search: value.toLowerCase()
                }), 500)

            getPlans()


            watch(currentPage, (page) => {
                getPlans({
                    page: page,
                    query: search.value.toLowerCase()
                })
            })

            watch(removed, () => {
                router.go()
            })

            watch(cloned, () => {
                router.push({ name: 'trainings-plan-edit', params: { plan: cloned.value.id } })
            })

            watch(created, () => {
                router.push({ name: 'trainings-plan-edit', params: { plan: created.value.id } })
            })

            return {
                create,
                plans,
                copyRow,
                unpublishRow,
                search,
                editRow,
                filterTable,
                isLoading,
                currentPage,
                tableRowClassName,
                loadingDelete,
                loadingClone,
                loadingCreate
            }
        },
    }
</script>

<style lang="postcss">
  .fit-page-training-plans {
    &__actions {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 24px;
      justify-content: space-between;
    }

    &__table {
      .el-table__row {
        cursor: pointer;
      }
    }

    &__avatar {
      aspect-ratio: 1/1;
      width: 64px;
      border-radius: var(--el-border-radius-base);
    }

    &__pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;
    }

    &__row {
      &-published,
      &-unpublished {
        text-align: center;
      }

      &-published {
        display: block;
      }

      &-unpublished {
        display: none;
      }

      &--unpublished {
        .fit-page-training-plans__row-published {
          display: none;
        }

        .fit-page-training-plans__row-unpublished {
          display: block;
        }
      }
    }
  }
</style>
