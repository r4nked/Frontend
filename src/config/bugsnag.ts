import Bugsnag, { Plugin } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

Bugsnag.start({
  apiKey: '3371ab9e7c12b36cc748120b8e2e4d60',
  releaseStage: process.env.RAILS_ENV,
  enabledReleaseStages: ['production'],
  plugins: [<Plugin> new BugsnagPluginVue()]
})
