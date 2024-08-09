import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import type { Result } from 'ts-results'
import type { Errors, Stack } from '@/types'
import { errorsToString } from '@/types'
import request from '@/util/request'
import { decode } from '@/util/coding'
import { toString } from 'lodash-es'

export default function useLoadStack() {
  const route = useRoute()

  const stack = ref<Stack | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const id = computed(() => route.params.id as string)
  const matchQuery = computed(() => route.query.m as string | undefined)
  const matches = computed(() => (matchQuery.value ? decode(matchQuery.value) : []))

  console.log(route.query)
  onMounted(() => loadStack(id.value, matchQuery.value))

  async function loadStack(stackID: string, matchQuery?: string) {
    isLoading.value = true
    error.value = null
    stack.value = null

    const path = matchQuery ? `/stacks/${stackID}.json?m=${matchQuery}` : `/stacks/${stackID}`

    try {
      const result: Result<Stack, Errors> = await request({ path })
      if (result.ok) {
        stack.value = result.val
        isLoading.value = false
      } else {
        error.value = errorsToString(result.val)
        isLoading.value = false
      }
    } catch (e: unknown) {
      error.value = toString(e)
      isLoading.value = false
    }
  }

  return { stack, isLoading, error, matches }
}
