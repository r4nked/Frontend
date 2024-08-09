<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <h2>{{ t('home.description') }}</h2>

    <new-stack-form />
    <f-a-q />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import NewStackForm from '@/views/stacks/new/NewStackForm.vue'
import FAQ from '@/views/FAQ.vue'

const { t } = useI18n()
</script>

<style scoped>
h2 {
  font-size: var(--font-size-md);
  font-weight: normal;
  margin: 0 0 var(--space-xxl);
  padding: 0;
}
</style>
