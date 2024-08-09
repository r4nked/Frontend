<template>
  <p>
    <router-link :to="{ name: 'StackRank', params: { id: stack.id } }">
      {{ t('results.actions.startRanking', { stack: stack.name }) }}
    </router-link>
    <span class="dot">&middot;</span>
    <router-link :to="{ name: 'NewStack' }">
      {{ t('results.actions.newStack') }}
    </router-link>
  </p>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { Stack } from '@/types'

const { t } = useI18n()

defineProps<{ stack: Stack }>()
</script>

<style scoped>
span.dot {
  margin-right: 1em;
  margin-left: 1em;
}
</style>
