<template>
    <LayoutDefault hide-search>
        <div class="page-search">
            <div class="page-search__searcher">
                <div class="page-search__input">
                    <el-input v-model="search" />
                </div>
                <div v-if="search && (watches?.size || watches?.size === 0)" class="page-search__searcher-results">
                    {{ $t('search.result', { search, results: watches?.size }) }}
                </div>
            </div>
            <div class="page-search__content container">
                <div class="page-search__filters">
                    <div v-if="collections?.items?.length" class="page-search__filters-section">
                        <div class="title title--h5">
                            Collections
                        </div>
                        <el-checkbox-group
                            v-model="form.collections"
                            @change="onChange"
                        >
                            <div
                                v-for="collection in collections?.items"
                                :key="collection.id"
                            >
                                <el-checkbox
                                    :label="collection.id"
                                >
                                    <div :class="{'link' : hasResults(collection)}">
                                        {{ collection.name }}
                                    </div>
                                </el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                    <div v-for="i in 0" :key="i" class="page-search__filters-section">
                        <div class="title title--h5">
                            Filter {{ i }}
                        </div>
                        <div>
                            <el-checkbox v-for="j in 5" :key="j" v-model="form.discount" :label="`Filter ${j}`" />
                        </div>
                    </div>
                </div>
                <div class="page-search__results">
                    <div v-if=" watches?.items?.length" class="page-search__results-wrapper">
                        <CardBasic
                            v-for="item in watches?.items"
                            :key="item.id"
                            :item="item"
                        />
                    </div>
                    <div class="page-search__results-loading">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
    </LayoutDefault>
</template>

<script>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import { useRoute } from 'vue-router'
    import { reactive, ref, watch } from 'vue'
    import { useCollectionsBrowse, useWatchesFilter } from '@/use/useApi'
    import CardBasic from '@/components/Card/Elegant.vue'
    import useSeo from '@/use/useSeo'

    export default {
        components: {
            LayoutDefault,
            CardBasic
        },
        setup() {
            const route = useRoute()
            const form = reactive({
                collections: []
            })
            const computedCollections = ref([])
            const search = ref(route.query.search)
            const { data: watches, fetchData: getWatches, isLoading } = useWatchesFilter()
            const { data: collections, fetchData: getCollections, isLoading: isLoadingCollections } = useCollectionsBrowse()
            const { setMetas } = useSeo({})

            getCollections()
            const onChange = () => {
                console.log({
                    collections: form.collections,
                    search: search.value,
                    limit: 100
                })
                getWatches({
                    collections: form.collections,
                    search: search.value,
                    limit: 100
                })
            }
            getWatches({
                search: search.value,
                limit: 100
            })

            const hasResults = (category) => {
                console.log(
                    category.id
                )
                return (computedCollections?.value || []).some((cat) => category.id === cat.id) 
            }

            watch(watches, () => {
                computedCollections.value =  watches.value?.items.reduce((acc, item) => {
                    const id = item.collectionId
                    const collection = item.collection
                    if (acc.some(entry => entry.slug === collection.slug)) return acc
                    acc.push({
                        id,
                        ...collection
                    })
                    return acc
                }, [])

            })

            watch(search, () => {
                getWatches({
                    search: search.value,
                    limit: 100
                })
            })




            return {
                search,
                form,
                watches,
                isLoading,
                collections,
                onChange,
                hasResults
            }

        }

    }
</script>

<style lang="postcss">
  .page-search {
    padding: em(16px);

    &__content {
      display: grid;
      grid-gap: em(16px);
      grid-template-columns: em(240px) 4fr;
    }

    &__searcher {
      margin: em(16px);
      padding: em(16px);
      border-radius: 5px;
      background-color: white;
      display: grid;
      grid-gap: em(16px);
    }

    &__filters,
    &__results {
      background-color: white;
      border-radius: 5px;
      padding: em(8px) em(4px);

      &-section {
        padding: em(8px);
        border-bottom: 1px solid rgb(25 25 25 / 10%);
        display: grid;
        grid-gap: em(8px);

        &:last-child {
          border: none;
        }
      }
    }

    &__results-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, em(140px));

      @media (--bp-desktop) {
        justify-content: start;
        grid-template-columns: repeat(auto-fill, em(200px));
      }

      grid-gap: em(24px);
      padding: em(16px);
    }

    &__results-loading {
      display: grid;
      min-height: 60vh;
      grid-gap: em(24px);
      padding: em(16px);
      align-items: center;
      text-align: center;
    }
  }

</style>
