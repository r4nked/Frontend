<template>
  <div>
    <error :error="error" v-if="error" />
    <loading v-else-if="!loaded" />
    <div v-else>
      <h2 data-cy="rankHeader">{{$t('rank.title', {stack: stack.name})}}.</h2>

      <p>{{$t('rank.prompt')}}</p>

      <choices :matches="matches" :stack="stack" @choose="choose" />

      <remaining :matches="matches" :stack="stack" />
    </div>
  </div>
</template>

<script lang="ts">
  import Component, { mixins } from 'vue-class-component'

  import { isNull } from 'lodash-es'
  import * as coding from '@/utils/coding'
  import LoadStack from '@/mixins/LoadStack'
  import Error from '@/views/Error.vue'
  import Loading from '@/views/Loading.vue'
  import Choices from '@/views/stacks/rank/Choices.vue'
  import Remaining from '@/views/stacks/rank/Remaining.vue'

  @Component({
    components: {
      Remaining, Choices, Loading, Error
    }
  })

  export default class Rank extends mixins(LoadStack) {
    async choose(choice: number): Promise<void> {
      if (isNull(this.stack)) return

      const results = this.matches.concat([choice])
      if (results.length >= this.stack.pairs_order.length) {
        await this.$router.push({
          name: 'StackResults',
          query: { m: coding.encode(results) }
        })
      } else await this.$router.push({ query: { m: coding.encode(results) } })
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    margin-bottom: 100px;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
</style>
