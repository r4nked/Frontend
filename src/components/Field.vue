<template>
  <div :class="['field-error-group', { inline }]" :data-testid="`fieldGroup-${attribute}`">
    <template v-if="type === 'textarea'">
      <textarea
        ref="input"
        v-model.trim="internalValue"
        :aria-label="label"
        :name="name"
        :placeholder="placeholder"
        v-bind="attrs"
      />
    </template>

    <input
      v-else-if="type == 'number'"
      ref="input"
      v-model.number="internalNumberValue"
      :aria-label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      v-bind="attrs"
    />

    <input
      v-else
      ref="input"
      v-model.trim="internalValue"
      :aria-label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      v-bind="attrs"
    />

    <p
      v-for="(error, index) in errorStrings"
      :key="index"
      class="field-error"
      data-testid="fieldErrors"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs } from 'vue'
import type { Errors, ValidationError } from '@/types'
import { omit } from 'lodash-es'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    value?: string | number | null
    errors?: Errors
    type: string
    placeholder?: string
    label?: string
    name: string
    inline?: boolean
    errorAttributes?: string[]
  }>(),
  {
    value: null,
    errors: () => ({}),
    inline: false,
    placeholder: undefined,
    label: undefined,
    errorAttributes: () => []
  }
)

const attrs = useAttrs()

const internalValue = ref('')
const internalNumberValue = ref<number | undefined>(undefined)
const input = ref<HTMLInputElement | HTMLTextAreaElement | undefined>(undefined)

const attribute = computed(() => {
  const [, , first, rest] = props.name.match(/^(\w+)(?:\[(\w+)]((?:\[\w+])*))?$/)!
  return (first ?? '') + (rest ?? '')
})
const allErrorAttributes = computed(() => [attribute.value, ...props.errorAttributes])
const fieldErrors = computed<ValidationError[]>(() =>
  allErrorAttributes.value.reduce(
    (errors, attr) => [...errors, ...(props.errors[attr] ?? [])],
    new Array<ValidationError>()
  )
)
const errorStrings = computed(() =>
  fieldErrors.value.map((e) => t(`validationError.${e.error}`, omit(e, 'error')))
)
</script>

<style scoped>
.field-error-group {
  position: relative;

  &.inline {
    display: inline-block;
  }

  .field-error {
    font-size: var(--font-size-sm);
    color: var(--error-color);
  }
}

input,
textarea {
  box-sizing: border-box;
  display: block;
  width: 100%;
}

textarea {
  width: 100%;
  max-width: 480px;
  height: calc(var(--font-size-md) * 20);
}
</style>
