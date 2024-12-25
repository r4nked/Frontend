<template>
  <div class="match-pair">
    <div class="first">
      <button
        class="link"
        data-testid="firstChoice"
        type="button"
        @click.prevent="emit('choose', 1)"
      >
        {{ match[0].name }}
      </button>
    </div>
    <div class="both">
      <button
        class="link"
        data-testid="bothChoice"
        type="button"
        @click.prevent="emit('choose', 3)"
      >
        {{ t('rank.equal') }}
      </button>
    </div>
    <div class="second">
      <button
        class="link"
        data-testid="secondChoice"
        type="button"
        @click.prevent="emit('choose', 2)"
      >
        {{ match[1].name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Card, Stack } from '@/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  stack: Stack
  matches: number[]
}>()

const emit = defineEmits<{
  choose: [number]
}>()

const match = computed<[Card, Card]>(() => {
  const indexes = props.stack.pairs_order[props.matches.length]!
  return [props.stack.cards[indexes[0]]!, props.stack.cards[indexes[1]]!]
})
</script>

<style scoped>
.match-pair {
  max-width: calc(var(--body-max-width) / 2);
  padding: var(--space-lg);
  margin: var(--space-lg) auto var(--space-xxl);
  border: 4px solid var(--page-color);

  div {
    cursor: pointer;
  }
}

.first,
.second {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.first {
  text-align: right;
}

.second {
  text-align: left;
}

.both {
  margin: var(--space-xl) 0;
  text-align: center;
}
</style>
