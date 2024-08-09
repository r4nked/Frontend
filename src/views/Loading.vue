<template>
  <div>
    <h1>{{ t('loading.title') }}</h1>
    <p>{{ t('loading.description') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
