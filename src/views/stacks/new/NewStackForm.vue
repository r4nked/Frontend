<template>
  <form method="post" @submit.prevent="create">
    <i18n-t keypath="newStack.header.template" tag="header">
      <template #nameField>
        <field
          v-model="stack.name"
          :errors="errors"
          :maxlength="126"
          :placeholder="placeholder?.name"
          aria-label="Stack name"
          class="inline"
          name="stack[name]"
          required
          type="text"
        />
      </template>
      <template #ranked>
        <p>{{ t('newStack.header.ranked') }}</p>
      </template>
    </i18n-t>

    <main>
      <p>{{ t('newStack.prompt') }}</p>
      <field
        v-model="stack.card_names"
        :error-attributes="['cards']"
        :errors="errors"
        :placeholder="placeholderCardNames"
        aria-label="Stack items"
        name="stack[card_names]"
        required
        type="textarea"
      />

      <div id="actions">
        <input :value="t('newStack.submit')" name="commit" type="submit" />
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </main>
  </form>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Field from '@/components/Field.vue'
import { computed, onMounted, ref } from 'vue'
import type { Errors, Stack } from '@/types'
import stackPlaceholders, { type Example } from '@/data/stackPlaceholders'
import { isNull, sample, shuffle, toString } from 'lodash-es'
import type { Result } from 'ts-results'
import request from '@/util/request'
import { useRouter } from 'vue-router'

interface ScratchStack {
  name?: string

  card_names?: string
}

const { t } = useI18n()
const router = useRouter()

const stack = ref<ScratchStack>({})
const error = ref<string | null>(null)
const errors = ref<Errors>({})
const placeholder = ref<Example | null>(null)

const placeholderCardNames = computed(() => {
  if (isNull(placeholder.value)) return ''
  return placeholder.value.cardNames.join('\n')
})

async function create() {
  try {
    const result: Result<Stack, Errors> = await request({
      method: 'post',
      path: '/stacks.json',
      body: { stack: stack.value }
    })
    if (result.ok) {
      await router.push({ name: 'StackRank', params: { id: result.val.id } })
    } else {
      errors.value = result.val
    }
  } catch (e: unknown) {
    error.value = toString(e)
  }
}

onMounted(() => {
  const example = sample(stackPlaceholders)!
  placeholder.value = {
    name: example.name,
    cardNames: shuffle(example.cardNames)
  }
})
</script>

<style scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  padding: var(--space-md);
  font-size: var(--font-size-lg);
  font-weight: 300;
  line-height: var(--font-size-lg);
  background-color: var(--inset-background-color);

  & > div {
    flex: 1 1 auto;
    max-width: calc((var(--body-min-width) + var(--body-max-width)) / 2);
  }

  & > p {
    flex: 0 0 auto;
  }
}

main {
  padding: var(--space-lg) var(--space-md);
  background-color: var(--inset-background-color);
}

#actions {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--space-md);
  align-items: center;
  justify-content: start;
  margin-top: var(--space-lg);
}

input[type='submit'] {
  cursor: pointer;
}

p.error {
  font-size: var(--font-size-md);
}
</style>
