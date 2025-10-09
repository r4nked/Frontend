import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import i18n from '@/i18n'

import 'normalize.css'
import '@/assets/styles/fonts.css'
import '@/assets/styles/common.css'

const app = createApp(App)

const sentryDSN = import.meta.env.VITE_SENTRY_DSN
if (sentryDSN) {
  Sentry.init({
    app,
    dsn: sentryDSN,
    sendDefaultPii: true,
    integrations: [
      Sentry.vueIntegration({
        tracingOptions: {
          trackComponents: true
        }
      }),
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration()
    ],
    tracesSampleRate: 1.0,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  })
}

app.use(router)
app.use(i18n)

app.mount('#app')
