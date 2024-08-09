<template>
  <p id="remaining">
    <span id="number-remaining">{{ t('rank.remaining', { n: remaining }) }}</span>
    {{ ' ' }}
    <i18n-t id="skip-to-end" keypath="rank.skipToEnd.template" tag="span">
      <template #seeResults>
        <router-link :to="{ name: 'StackResults', query: matchesQuery }">
          {{ t('rank.skipToEnd.seeResults') }}
        </router-link>
      </template>
    </i18n-t>
  </p>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { Stack } from '@/types'
import { computed } from 'vue'
import { encode } from '@/util/coding'

const { t } = useI18n()

const props = defineProps<{
  stack: Stack
  matches: number[]
}>()

const remaining = computed(() => props.stack.pairs_order.length - props.matches.length)
const matchesQuery = computed(() => ({ m: encode(props.matches) }))
</script>

<style scoped>
#remaining {
  font-size: var(--font-size-sm);
}

#number-remaining {
  font-weight: 300;
}

#skip-to-end {
  font-weight: 200;
}
</style>
