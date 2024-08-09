<template>
  <i18n-t keypath="faq.template" tag="p">
    <template #sourceLink>
      <a href="https://github.com/r4nked">{{ t('faq.sourceLink') }}</a>
    </template>
  </i18n-t>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
p {
  font-size: var(--font-size-md);
  margin-top: var(--space-xxl);
}
</style>
