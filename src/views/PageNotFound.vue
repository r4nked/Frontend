<template>
  <div>
    <h1>{{$t('notFound.title')}}</h1>
    <i18n tag="p" path="notFound.goHome.template">
      <template #link>
        {{$t('notFound.goHome.link')}}
      </template>
    </i18n>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class FAQ extends Vue {
  }
</script>

<style scoped lang="scss">
  h1 {
    font-size: 36px;
    font-weight: 200;
  }
</style>
