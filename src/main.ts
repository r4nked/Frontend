import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import bugsnagVue from '@/config/bugsnag'
import i18n from '@/i18n'

import 'normalize.css'
import '@/assets/styles/fonts.css'
import '@/assets/styles/common.css'

const app = createApp(App)

if (bugsnagVue) app.use(bugsnagVue)
app.use(router)
app.use(i18n)

app.mount('#app')
