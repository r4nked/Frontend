<template>
  <div>
    <h1>{{$t('loading.title')}}</h1>
    <p>{{$t('loading.description')}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Loading extends Vue {
  }
</script>
