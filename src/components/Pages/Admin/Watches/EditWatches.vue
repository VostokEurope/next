<template>
    <AdminLayout>
        <div class="admin-page-watches-edit">
            <el-form
                ref="formRef"
                class="admin-page-watches-edit__form"
                :model="form"
                :rules="rules"
            >
                <div class="admin-page-watches-edit__form-content">
                    <LayoutScrollable class="admin-page-watches-edit__media">
                        <div v-for="image in form.images" :key="image.id" class="admin-page-watches-edit__media-item">
                            <EditImage :src="image.src" />
                        </div>
                        <div class="admin-page-watches-edit__media-item">
                            <EditImage />
                        </div>
                    </LayoutScrollable>
                    <div class="admin-page-watches-edit__wrapper">
                        <div class="admin-page-watches-edit__base">
                            <div class="title title--h3">
                                Base
                            </div>
                            <el-form-item
                                label="id"
                                prop="id"
                                width="40"
                            >
                                <el-input
                                    v-model="form.id"
                                    type="text"
                                    disabled
                                />
                            </el-form-item>
                            <el-form-item
                                label="slug"
                                prop="slug"
                            >
                                <el-input
                                    v-model="form.slug"
                                    type="text"
                                    disabled
                                />
                            </el-form-item>
                            <el-form-item
                                label="name"
                                prop="name"
                            >
                                <el-input
                                    v-model="form.name"
                                    type="text"
                                />
                            </el-form-item>
                            <el-form-item
                                label="model"
                                prop="model"
                            >
                                <el-input
                                    v-model="form.model"
                                    type="text"
                                />
                            </el-form-item>
                            <el-form-item
                                label="collection"
                                prop="collectionId"
                            >
                                <el-select v-model="form.collectionId" filterable placeholder="Select">
                                    <el-option
                                        v-for="entry in collections?.items"
                                        :key="entry.id"
                                        :loading="loadingCollections"
                                        :label="entry.name"
                                        :value="entry.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="description"
                                prop="description"
                            >
                                <el-input
                                    v-model="form.description"
                                    :rows="10"
                                    type="textarea"
                                    placeholder="Add a description"
                                />
                            </el-form-item>

                            <el-form-item
                                label="Gender"
                                prop="genderId"
                            >
                                <el-radio-group v-model="form.genderId">
                                    <el-radio-button v-for="gender in genders" :key="gender.id" :label="gender.id">
                                        <div class="admin-page-watches-edit__radio">
                                            <span :class="`fa fa-${gender.code}`"></span>
                                            <div>
                                                {{ gender.name }}
                                            </div>
                                        </div>
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="admin-page-watches-edit__business">
                            <div class="admin-page-watches-edit__row">
                                <div class="title title--h3">
                                    Business
                                </div>
                                <el-form-item
                                    label="price (₽)"
                                    prop="price"
                                >
                                    <el-input
                                        v-model="form.price"
                                        :rows="8"
                                        type="number"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="discount (%)"
                                    prop="discount"
                                >
                                    <el-input
                                        v-model="form.discount"
                                        type="number"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="stock"
                                    prop="stock"
                                >
                                    <el-input
                                        v-model="form.stock"
                                        type="number"
                                    />
                                </el-form-item>
                            </div>
                            <div class="admin-page-watches-edit__row">
                                <div class="title title--h3">
                                    Size
                                </div>
                                <el-form-item
                                    label="width (cm)"
                                    prop="width"
                                >
                                    <el-input
                                        v-model="form.width"
                                        type="number"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="height (cm)"
                                    prop="height"
                                >
                                    <el-input
                                        v-model="form.height"
                                        type="number"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="thickness (cm)"
                                    prop="thickness"
                                >
                                    <el-input
                                        v-model="form.thickness"
                                        type="number"
                                    />
                                </el-form-item>
                            </div>
                        </div>

                        <div class="admin-page-watches-edit__single">
                            <div class="admin-page-watches-edit__row">
                                <div class="title title--h3">
                                    Single
                                </div>
                                <el-form-item
                                    label="mechanism"
                                    prop="mechanismId"
                                >
                                    <el-select v-model="form.mechanismId" filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in mechanisms?.items"
                                            :key="entry.id"
                                            :loading="loadingMechanisms"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="case"
                                    prop="caseId"
                                >
                                    <el-select v-model="form.caseId" filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in cases?.items"
                                            :key="entry.id"
                                            :loading="loadingCases"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="coating"
                                    prop="coatingId"
                                >
                                    <el-select v-model="form.coatingId" filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in coatings?.items"
                                            :key="entry.id"
                                            :loading="loadingCoatings"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="glass"
                                    prop="glassId"
                                >
                                    <el-select v-model="form.glassId" filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in glasses?.items"
                                            :key="entry.id"
                                            :loading="loadingGlasses"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="resistance"
                                    prop="resistanceId"
                                >
                                    <el-select v-model="form.resistanceId" filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in resistances?.items"
                                            :key="entry.id"
                                            :loading="loadingResistances"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="admin-page-watches-edit__row">
                                <div class="title title--h3">
                                    Multi
                                </div>
                                <el-form-item
                                    label="calibre"
                                >
                                    <el-select v-model="form.calibres" multiple filterable placeholder="Select">
                                        <el-option
                                            v-for="entry in calibres?.items"
                                            :key="entry.id"
                                            :loading="loadingCalibres"
                                            :label="entry.name"
                                            :value="entry.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="admin-page-watches-edit__properties">
                    <div class="title title--h3">
                        Properties ({{ item?.properties?.length }}/ {{ form?.properties?.length }})
                    </div>
                    <el-table
                        class="admin-page-watches-edit__table"
                        :loading="loadingProperties"
                        :data="form.properties"
                    >
                        <el-table-column label="active" width="80">
                            <template #default="scope">
                                <el-form-item>
                                    <el-checkbox v-model="scope.row.avaiable" />
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="name" prop="name" />
                        <el-table-column label="value" prop="value">
                            <template #default="scope">
                                <el-form-item>
                                    <el-input v-model="scope.row.value" placeholder="value" :disabled="!scope.row.avaiable" />
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
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
    import EditImage from '@/components/Base/Admin/EditImage.vue'
    import LayoutScrollable from '@/components/Layouts/Scrollable.vue'

    import {
        useCalibresBrowse,
        useCasesBrowse,
        useCoatingsBrowse,
        useCollectionsBrowse,
        useGendersBrowse,
        useGlassesBrowse,
        useMechanismsBrowse,
        usePropertiesBrowse,
        useResistancesBrowse,
        useWatchesCreate,
        useWatchesEdit,
        useWatchesGetComplete
    } from '@/use/useApi'
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue-demi'
    import { useI18n } from 'vue-i18n'

    export default {
        components: {
            AdminLayout,
            EditImage,
            LayoutScrollable
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
                mechanismId: [
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
            const { data: item, fetchData: get } = useWatchesGetComplete()
            const { data: saved, fetchData: edit, isLoading: isSaving } = useWatchesEdit()
            const { data: created, fetchData: create, isLoading: isCreating } = useWatchesCreate()
            const { data: mechanisms, fetchData: getMechanisms, isLoading: loadingMechanisms } = useMechanismsBrowse()
            const { data: cases, fetchData: getCases, isLoading: loadingCases } = useCasesBrowse()
            const { data: coatings, fetchData: getCoatings, isLoading: loadingCoatings } = useCoatingsBrowse()
            const { data: glasses, fetchData: getGlasses, isLoading: loadingGlasses } = useGlassesBrowse()
            const { data: resistances, fetchData: getResistances, isLoading: loadingResistances } = useResistancesBrowse()
            const { data: calibres, fetchData: getCalibres, isLoading: loadingCalibres } = useCalibresBrowse()
            const { data: avaiableProperties, fetchData: getProperties, isLoading: loadingProperties } = usePropertiesBrowse()
            const { data: genders, fetchData: getGenders, isLoading: loadingGenders } = useGendersBrowse()
            const { data: collections, fetchData: getCollections, isLoading: loadingCollections } = useCollectionsBrowse()






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
                console.log(item.value)
                const data = item.value
                // base
                form.id = data.id
                form.name = data.name
                form.slug = data.slug
                form.model = data.model
                form.description = data.description
                form.genderId = data.genderId
                form.collectionId = data.collectionId

                //media
                form.images = data.images

                //business
                form.price = data.price
                form.stock = data.stock
                form.promoId = data.promoId
                form.discount = data.discount

                //size
                form.thickness = data.thickness
                form.width = data.width
                form.height = data.height

                //single
                form.mechanismId = data.mechanismId
                form.caseId = data.caseId
                form.coatingId = data.coatingId
                form.glassId = data.glassId
                form.resistanceId = data.resistanceId

                //multi
                form.calibres = data.calibres.map(entry => entry.id)
            })

            watch([saved, created], () => {
                router.push({name: 'admin-watches'})
            })

            watch([avaiableProperties, item], () => {
                const props =  avaiableProperties.value
                const settedProps = item?.value?.properties
                console.log('intento')
                console.log({
                    props,
                    settedProps
                })
                if(avaiableProperties?.value?.length && (item.value?.id || !route.params.id)) {
                    console.log('hola')
                    form.properties = props.map((entry) => {
                        const match =  (settedProps || []).find(prop => entry.id === prop.id)
                        return {
                            ...entry,
                            avaiable: !!match?.id,
                            value: match?.params?.value
                        }
                    })

                }

            })

            getMechanisms()
            getCases()
            getCoatings()
            getGlasses()
            getResistances()
            getCalibres()
            getProperties()
            getGenders()
            getCollections()


            console.log('gender ->',genders)

            return {
                collections,
                form,
                item,
                submit,
                isSaving,
                isCreating,
                rules,
                formRef,
                mechanisms,
                cases,
                coatings,
                glasses,
                genders,
                calibres,
                resistances,
                loadingMechanisms,
                loadingCases,
                loadingCoatings,
                loadingGlasses,
                loadingResistances,
                loadingCalibres,
                loadingProperties,
                loadingGenders,
                loadingCollections
            }

        },
    }
</script>

<style lang="postcss">
  .admin-page-watches-edit {
    display: grid;

    &__form {
      padding: em(16px);
      display: grid;

      &-content {
        display: grid;
      }
    }

    &__media {
      display: grid;
      justify-content: start;
      grid-auto-flow: column;
      grid-gap: em(4px);

      &-item {
        height: em(200px);
        width: em(120px);
      }
    }

    &__properties {
      padding: em(16px) 0;
    }

    &__table {
      margin-top: em(16px);
    }

    &__wrapper {
      padding-top: em(16px);
      display: grid;

      @media (--bp-desktop) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: em(32px);
      }
    }

    &__business {
      display: grid;
      grid-gap: em(16px);
    }

    &__row {
      padding: em(16px) 0;
    }

    &__buttons {
      margin: em(16px) auto;
    }

    &__radio {
      display: grid;
      grid-gap: em(4px);
      justify-content: center;
      align-items: center;
      text-align: center;

      & > * {
        margin: 0 auto;
      }
    }
  }
</style>
