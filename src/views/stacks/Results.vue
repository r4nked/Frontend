<template>
  <error :error="error" v-if="error" />
  <loading v-else-if="!loaded" />

  <div v-else>
    <h1 data-cy="resultsHeader">{{$t('results.title', {stack: stack.name})}}</h1>
    <h2 v-if="isShared">{{$t('results.byline', {name: shared})}}</h2>

    <ol data-cy="resultsList">
      <li :key="ranking.name" v-for="ranking in stack.rankings">
        {{ranking.name}}
      </li>
    </ol>

    <p v-if="canShare">
      <a @click.prevent="share" data-cy="shareLink">{{$t('results.share.link')}}</a>
    </p>

    <shared-actions :stack="stack" v-if="isShared" />

    <div data-cy="retestURL" style="display: none;">
      {{retestURL}}
    </div>
  </div>
</template>

<script lang="ts">
  import Component, { mixins } from 'vue-class-component'

  import { isArray, isNull, isUndefined } from 'lodash-es'
  import LoadStack from '@/mixins/LoadStack'
  import Loading from '@/views/Loading.vue'
  import Error from '@/views/Error.vue'
  import SharedActions from '@/views/stacks/results/SharedActions.vue'

  @Component({
    components: { SharedActions, Error, Loading }
  })
  export default class Results extends mixins(LoadStack) {
    get canShare(): boolean {
      return isUndefined(this.$route.query.name)
    }

    get shared(): string | null {
      if (isUndefined(this.$route.query.name)) return null
      if (isArray(this.$route.query.name)) return this.$route.query.name[0]!
      return this.$route.query.name
    }

    get isShared(): boolean {
      return !isNull(this.shared)
    }

    get retestURL(): string {
      return this.$router.resolve({ name: 'StackRank', params: { id: this.stackID } }).href
    }

    share(): void {
      const name = prompt(<string> this.$t('results.share.namePrompt'))
      const route = this.$router.resolve({
        name: 'StackResults',
        params: { id: this.stackID },
        query: { m: this.matchQuery, name }
      })
      const href = `${window.location.origin}${route.href}`
      prompt(<string> this.$t('results.share.copyPrompt'), href)
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 30px;
    font-weight: 300;
  }

  ol {
    counter-reset: li;
    margin: 50px 0;
    padding: 0;

    > li {
      font-size: 48px;
      font-weight: 500;
      line-height: 64px;
      list-style: none;

      &::before {
        content: '#' counter(li);
        counter-increment: li;
        display: inline-block;
        font-weight: 200;
        margin-right: 0.5em;
        text-align: right;
        width: 100px;
      }
    }
  }

  p {
    text-align: center;
  }
</style>
