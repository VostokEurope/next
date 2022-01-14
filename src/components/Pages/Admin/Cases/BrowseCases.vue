<template>
    <AdminLayout>
        <div class="admin-page-cases ">
            <el-card shadow="never">
                <template #header>
                    <div class="admin-page-cases__actions">
                        <el-input
                            v-model="search"
                            placeholder="Search"
                            clearable
                        />
                        <el-button type="primary" plain @click="create">
                            New
                        </el-button>
                    </div>
                </template>
                <el-table
                    v-loading="isLoading"
                    class="admin-page-cases__table"
                    :data="data?.items"
                >
                    <el-table-column label="id" prop="id" width="40" />
                    <el-table-column label="name" prop="name" />
                    <el-table-column label="code" prop="code" />
                    <el-table-column />
                    <el-table-column fixed="right" label="Actions">
                        <template #default="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="editRow(scope.row)"
                            >
                                <span class="fal fa-pencil"></span>
                            </el-button>
                            <el-popconfirm
                                title="Are you sure to delete this?"
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                @confirm="removeEntry(scope.row)"
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
                <div v-if="data?.pages > 1" class="admin-page-cases__pagination">
                    <el-pagination
                        v-model:currentPage="currentPage"
                        layout="prev, pager, next"
                        :page-count="data?.pages"
                        :pager-count="5"
                    />
                </div>
            </el-card>
        </div>
    </AdminLayout>
</template>

<script>
    import AdminLayout from '@/components/Layouts/Admin.vue'
    import { ref, watch } from 'vue'
    import { useCasesBrowse, useCasesDelete } from '@/use/useApi'
    import { useRouter } from 'vue-router'
    const basePath = 'admin-cases'


    export default {
        components: {
            AdminLayout
        },
        setup () {
            const search = ref('')
            const currentPage = ref(1)
            const router = useRouter()


            const {data, fetchData: getItems, isLoading }  = useCasesBrowse()
            const {data: deleted, fetchData: deleteItem, isLoading: loadingDelete } = useCasesDelete()

            const editRow = (row) => {
                router.push({
                    name:`${basePath}-edit`,
                    params: {
                        id: row.id
                    }
                })
            }
            const removeEntry = (row) => {
                deleteItem({
                    id: row.id
                })
            }

            const create = () => {
                router.push({name:`${basePath}-new`,})
            }
            const filterTable = () => {

            }

            const onSearch = () => {
                getItems({
                    page: currentPage.value,
                    search: search.value
                })
            }

            onSearch()

            watch([search, currentPage], () => {
                onSearch()
            })

            watch([deleted], () => {
                router.go()
            })

            return {
                isLoading,
                search,
                data,
                currentPage,
                editRow,
                removeEntry,
                create,
                filterTable,
                loadingDelete
            }
        },
    }
</script>

<style lang="postcss">
  .admin-page-cases {
    &__actions {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 24px;
      justify-content: space-between;
    }

    &__pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;
    }
  }
</style>
