<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    class: 'dark',
    lang: locale,
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
