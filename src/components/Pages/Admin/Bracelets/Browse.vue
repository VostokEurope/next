<template>
    <AdminLayout>
        <div class="admin-page-bracelets container">
            <el-card shadow="never">
                <template #header>
                    <div class="admin-page-bracelets__actions">
                        <el-input
                            v-model="search"
                            placeholder="Search"
                            clearable
                            @input="filterTable"
                        />
                        <el-button type="primary" plain @click="create">
                            New
                        </el-button>
                    </div>
                </template>
                <el-table
                    v-loading="isLoading"
                    class="admin-page-bracelets__table"
                    :data="data?.items"
                >
                    <el-table-column label="id" prop="id" width="80" />
                    <el-table-column label="name" prop="name" width="200" />
                    <el-table-column label="image" prop="image" />
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
                <div v-if="data?.pages > 1" class="admin-page-bracelets__pagination">
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
    import { ref, watch } from 'vue-demi'
    import { useBraceletsBrowse, useBraceletsDelete } from '@/use/useApi'
    import { useRouter } from 'vue-router'
    const basePath = 'admin-bracelets'


    export default {
        components: {
            AdminLayout
        },
        setup () {
            const search = ref('')
            const currentPage = ref(1)
            const router = useRouter()


            const {data, fetchData: getItems, isLoading }  = useBraceletsBrowse()
            const {data: deleted, fetchData: deleteItem, isLoading: loadingDelete } = useBraceletsDelete()
            const {fetchData: cloneItem, isLoading: loadingClone }  = useBraceletsBrowse()

            const editRow = (row) => {
                router.push({
                    name:`${basePath}-edit`,
                    params: {
                        id: row.id
                    }
                })
            }
            const copyRow = () => {}
            const removeEntry = (row) => {
                deleteItem({
                    id: row.id
                })
            }

            const create = () => {
                router.push({name:`${basePath}-new`,})
            }
            const filterTable = () => {}

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

            watch(deleted, () => {
                router.go()
            })

            console.log(data)

            return {
                isLoading,
                search,
                data,
                currentPage,
                editRow,
                copyRow,
                removeEntry,
                create,
                filterTable,
                loadingClone,
                loadingDelete
            }
        },
    }
</script>

<style lang="postcss">
  .admin-page-bracelets {
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
  }
</style>
