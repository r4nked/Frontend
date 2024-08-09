import { createI18n } from 'vue-i18n'
import messages from '@/i18n/messages'

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages,
  silentFallbackWarn: true,
  legacy: false
})

export default i18n
