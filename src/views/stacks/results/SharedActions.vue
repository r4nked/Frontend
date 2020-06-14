<template>
  <p>
    <router-link :to="{name: 'StackRank', params: {id: stack.id}}">
      {{$t('results.actions.startRanking', {stack: stack.name})}}
    </router-link>
    <span class="dot">&middot;</span>
    <router-link :to="{name: 'NewStack'}">
      {{$t('results.actions.newStack')}}
    </router-link>
  </p>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { Stack } from '@/types'

  @Component
  export default class SharedActions extends Vue {
    @Prop({ type: Object, required: true }) stack!: Stack
  }
</script>

<style scoped lang="scss">
  span.dot {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>
