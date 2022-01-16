<template>
    <!-- Notification -->
    <div class="vostok-app">
        <Router />
        <metainfo>
            <template #title="{ content }">
                {{ content }} - Yay!
            </template>
        </metainfo>
    </div>
    <!-- Waiting --->
</template>

<script>
    import Router from '@/views/Router.vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import axios from '@/clients/axios'
    import pkg from '../package.json'
    import { useRefreshToken } from './use/useApi'
    import { watch } from 'vue'


    export default {
        components: {
            Router
        },
        setup () {
            const store = useStore()
            const router = useRouter()
            const { fetchData: refreshToken, data: refreshData, error: errorRefresh} = useRefreshToken()

            const configureInterceptor = () => {
                axios.interceptors.request.use((config) => {
                    const accessToken = store.getters['auth/accessToken']
                    const version = pkg.version
                    //if (version) config.headers.common['X-Client-Version'] = `${ version }`
                    if (accessToken) config.headers.common.Authorization = `Bearer ${ accessToken }`
                    return config
                }, (error) => Promise.reject(error))

                const responseInterceptor = axios.interceptors.response.use((response) => response, (error) => {
                    if (error.code === "ECONNABORTED") {
                        return axios(error)
                    }
                    if (error.response?.status === 401) {
                        axios.interceptors.response.eject(responseInterceptor)
                        refreshToken()
                    }
                    return Promise.reject(error)
                })
            }


            watch(refreshData, (data) => {
                store.dispatch('auth/login', {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                })
                /* set new header */
                // error.config.headers.Authorization = `Bearer ${ data.access_token }`
                // return axios(error.config)
            })

            watch(errorRefresh, () => {
                store.dispatch('auth/logout')
                router.push({ name: 'login' })
            })

            configureInterceptor()
        }
    }
</script>

<style lang="postcss">
  .vostok-app {
    --el-button-bg-color: var(--color-primary-light);
    --el-button-border-color: var(--color-primary);
    --el-button-hover-bg-color: var(--color-primary);
    --el-button-hover-border-color: var(--color-primary);
    --el-button-active-bg-color: var(--color-primary);
    --el-button-active-border-color: var(--color-primary-dark);
  }
</style>

