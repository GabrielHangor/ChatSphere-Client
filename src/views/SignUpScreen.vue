<template>
  <div class="container min-h-screen flex flex-col items-center md:justify-center">
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
  import SignUpForm from '@/modules/user/components/SignUpForm.vue';
  import { useAuth } from '@/modules/user/Composables/useAuth';

  const { data } = useAuth();
</script>
