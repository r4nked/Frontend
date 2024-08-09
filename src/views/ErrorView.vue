<template>
  <div>
    <h1 class="error">{{ t('error') }}</h1>
    <p class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{ error: string }>()
</script>
