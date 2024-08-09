<template>
  <error-view v-if="error" :error="error" />
  <loading v-else-if="isLoading || !stack" />

  <div v-else>
    <h1>{{ t('results.title', { stack: stack.name }) }}</h1>
    <h2 v-if="isShared">{{ t('results.byline', { name: shared }) }}</h2>

    <ol>
      <li v-for="ranking in stack.rankings" :key="ranking.name">
        {{ ranking.name }}
      </li>
    </ol>

    <p v-if="canShare">
      <button class="link" type="button" @click.prevent="share">
        {{ t('results.share.link') }}
      </button>
    </p>

    <shared-actions v-if="isShared" :stack="stack" />

    <div style="display: none">
      {{ retestURL }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import useLoadStack from '@/hooks/useLoadStack'
import SharedActions from '@/views/stacks/results/SharedActions.vue'
import ErrorView from '@/views/ErrorView.vue'
import Loading from '@/views/Loading.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { isArray, isNull, isUndefined } from 'lodash-es'
import { encode } from '@/util/coding'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { stack, error, isLoading, matches } = useLoadStack()

const canShare = computed(() => isUndefined(route.query.name))
const shared = computed<string | null>(() => {
  if (isUndefined(route.query.name)) return null
  if (isArray(route.query.name)) return route.query.name[0]!
  return route.query.name
})
const isShared = computed(() => !isNull(shared.value))
const retestURL = computed(
  () => router.resolve({ name: 'StackRank', params: { id: stack.value?.id } }).href
)

function share() {
  const name = prompt(t('results.share.namePrompt'))
  if (isNull(name)) return

  const route = router.resolve({
    name: 'StackResults',
    params: { id: stack.value?.id },
    query: { m: encode(matches.value), name }
  })
  const href = `${window.location.origin}${route.href}`
  prompt(t('results.share.copyPrompt'), href)
}
</script>

<style scoped>
h2 {
  font-size: var(--font-size-lg);
  font-weight: 300;
}

ol {
  margin: var(--space-xxl) 0;
  padding: 0;
  counter-reset: li;

  & > li {
    font-size: var(--font-size-xl);
    font-weight: 500;
    line-height: var(--font-size-xl);
    list-style: none;

    &::before {
      font-weight: 200;
      display: inline-block;
      width: var(--space-xl);
      margin-right: 1.5em;
      content: '#' counter(li);
      counter-increment: li;
      text-align: right;
    }
  }
}

p {
  text-align: center;
}
</style>
