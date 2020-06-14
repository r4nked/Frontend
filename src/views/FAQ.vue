<template>
  <i18n tag="p" path="faq.template">
    <template #sourceLink>
      <a href="https://github.com/r4nked">{{$t('faq.sourceLink')}}</a>
    </template>
  </i18n>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class FAQ extends Vue {
  }
</script>

<style scoped lang="scss">
  p {
    font-size: 13px;
    margin-top: 50px;
  }
</style>
