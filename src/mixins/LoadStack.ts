import Vue from 'vue'
import Component from 'vue-class-component'
import { Result } from 'ts-results'
import {
  isArray, isEmpty, isNull, isUndefined
} from 'lodash-es'
import { Watch } from 'vue-property-decorator'
import { Errors, Stack } from '@/types'
import request from '@/utils/request'
import * as coding from '@/utils/coding'

@Component
export default class LoadStack extends Vue {
  stack: Stack | null = null

  error: Error | null = null

  notFound = false

  get loaded(): boolean {
    return !isNull(this.stack)
  }

  get matches(): number[] {
    if (isNull(this.matchQuery)) return []
    return coding.decode(this.matchQuery)
  }

  get matchQuery(): string | null {
    if (isUndefined(this.$route.query.m)) return null
    if (isEmpty(this.$route.query.m)) return null
    if (isArray(this.$route.query.m)) return this.$route.query.m[0]!
    return this.$route.query.m
  }

  get stackID(): string {
    return this.$route.params.id
  }

  mounted(): void {
    this.onRouteChanged()
  }

  @Watch('$route')
  async onRouteChanged(): Promise<void> {
    const path = isNull(this.matchQuery)
      ? `/stacks/${this.stackID}.json`
      : `/stacks/${this.stackID}.json?m=${this.matchQuery}`

    try {
      const result: Result<Stack, Errors> = await request({ path })
      if (result.ok) this.stack = result.val
      else this.error = new Error('Invalid HTTP response: 422')
    } catch (error) {
      this.error = error
    }
  }
}
