<template>
  <div>
    <error-view v-if="error" :error="error" />
    <loading v-else-if="isLoading || !stack" />
    <div v-else>
      <h2>{{ t('rank.title', { stack: stack.name }) }}.</h2>

      <p>{{ t('rank.prompt') }}</p>
      <choices :matches="matches" :stack="stack" @choose="choose" />
      <remaining :matches="matches" :stack="stack" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Remaining from '@/views/stacks/rank/Remaining.vue'
import Choices from '@/views/stacks/rank/Choices.vue'
import Loading from '@/views/Loading.vue'
import ErrorView from '@/views/ErrorView.vue'
import { isNull } from 'lodash-es'
import { useRouter } from 'vue-router'
import { encode } from '@/util/coding'
import useLoadStack from '@/hooks/useLoadStack'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const { stack, matches, error, isLoading } = useLoadStack()

async function choose(choice: number) {
  if (isNull(stack.value)) return

  const results = matches.value.concat([choice])
  if (results.length >= stack.value.pairs_order.length) {
    await router.push({
      name: 'StackResults',
      query: { m: encode(results) }
    })
  } else await router.push({ query: { m: encode(results) } })
}
</script>

<style scoped>
h2 {
  margin-bottom: var(--space-xxl);
}

p {
  font-size: var(--font-size-lg);
  font-weight: 500;
  text-align: center;
}
</style>
