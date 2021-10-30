import '@/assets/css/fonts.css'
import '@/assets/css/reset.css'
import '@/assets/css/variables.css'
import '@/assets/css/styles.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { createI18n } from 'vue-i18n'
import messages from '@/literals'

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages,
})

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app')
