import Bugsnag, { type Plugin } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import BugsnagPerformance from '@bugsnag/browser-performance'

const apiKey = '3371ab9e7c12b36cc748120b8e2e4d60'

Bugsnag.start({
  apiKey,
  plugins: [new BugsnagPluginVue() as Plugin],
  releaseStage: import.meta.env.MODE,
  enabledReleaseStages: ['production']
})
BugsnagPerformance.start(apiKey)

const bugsnagVue = Bugsnag.getPlugin('vue')
export default bugsnagVue
