<template>
  <NConfigProvider inline-theme-disabled :theme-overrides="themeOverrides">
    <NLayout>
      <NLayoutHeader></NLayoutHeader>
      <NLayoutContent class="container">
        <RouterView />
      </NLayoutContent>
    </NLayout>

    <NGlobalStyle />
  </NConfigProvider>
</template>

<script setup lang="ts">
  import {
    NConfigProvider,
    NGlobalStyle,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    useOsTheme,
    darkTheme,
  } from 'naive-ui';
  import { computed } from 'vue';
  import { themeOverrides } from '@/styles/themeOverrides';

  // const osThemeRef = useOsTheme();

  // const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
</script>
