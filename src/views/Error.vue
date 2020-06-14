<template>
  <div>
    <h1 class="error">{{$t('error')}}</h1>
    <p class="error">{{error}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class Error extends Vue {
    @Prop({ type: String, required: true }) error!: string
  }
</script>
