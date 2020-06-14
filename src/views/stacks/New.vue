<template>
  <div>
    <h1>{{$t('home.title')}}</h1>
    <h2>{{$t('home.description')}}</h2>

    <new-stack-form />

    <faq />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Field from '@/components/Field.vue'
  import FAQ from '@/views/FAQ.vue'
  import Form from '@/views/stacks/new/Form.vue'

  @Component({
    components: { NewStackForm: Form, Field, faq: FAQ }
  })
  export default class New extends Vue {
  }
</script>

<style scoped lang="scss">
  h2 {
    font-size: 14px;
    font-weight: normal;
    margin: 0 0 50px;
    padding: 0;
  }
</style>
