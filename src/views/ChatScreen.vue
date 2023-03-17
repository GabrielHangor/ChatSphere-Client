<template>
  <div class="container">
    <h1>Chat Screen</h1>
    <h2>{{ user }}</h2>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';

  const { user } = useAuthStore();
</script>
