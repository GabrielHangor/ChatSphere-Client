<template>
  <div class="container">
    <h1>Chat Screen</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import UserService from '@/modules/user/Services/UserService';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';

  const users = ref();

  const fetchUsers = async () => {
    users.value = await UserService.getAllUsers();
  };

  onMounted(() => fetchUsers());
</script>
