<template>
  <p>
    <span id="number-remaining">{{remaining}} </span>

    <i18n tag="span" path="rank.skipToEnd.template">
      <template #seeResults>
        <router-link :to="{name: 'StackResults', query: matchesQuery}" data-cy="earlyResultsLink">
          {{$t('rank.skipToEnd.seeResults')}}
        </router-link>
      </template>
    </i18n>
  </p>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import numeral from 'numeral'
  import { Prop } from 'vue-property-decorator'
  import { Stack } from '@/types'
  import { encode } from '@/utils/coding'

  @Component
  export default class Remaining extends Vue {
    @Prop({ type: Object, required: true }) stack!: Stack

    @Prop({ type: Array, required: true }) matches!: number[]

    get remaining(): string {
      const count = this.stack.pairs_order.length - this.matches.length
      const formatted = numeral(count).format('0,0')
      return <string> this.$tc('rank.remaining', count, { formatted })
    }

    get matchesQuery(): Record<string, string | (string | null)[]> {
      return { m: encode(this.matches) }
    }
  }
</script>

<style lang="scss" scoped>
  #number-remaining {
    font-weight: 300;
  }

  #skip-to-end {
    font-weight: 200;
  }
</style>
