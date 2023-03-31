<template>
  <NConfigProvider abstract inline-theme-disabled>
    <NNotificationProvider>
      <main>
        <RouterView v-slot="{ Component, route }">
          <transition appear mode="out-in" name="fade">
            <component :key="route.name" :is="Component" />
          </transition>
        </RouterView>
      </main>
    </NNotificationProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script setup lang="ts">
  import { useOsTheme, darkTheme, NThemeEditor } from 'naive-ui';
  import { computed } from 'vue';

  // const osThemeRef = useOsTheme();

  // const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
</script>
