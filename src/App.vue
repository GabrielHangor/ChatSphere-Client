<template>
  <NConfigProvider abstract inline-theme-disabled :theme-overrides="themeOverrides">
    <NNotificationProvider>
      <main><RouterView /></main>
    </NNotificationProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script setup lang="ts">
  import { useOsTheme, darkTheme, NThemeEditor } from 'naive-ui';
  import { computed } from 'vue';
  import { themeOverrides } from '@/styles/themeOverrides';

  // const osThemeRef = useOsTheme();

  // const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
</script>
