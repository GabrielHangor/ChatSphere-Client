<template>
  <div class="container">
    <h1>Chat Screen</h1>
    <ul>
      <li v-for="user in userList?.items" :key="user.id">{{ user }}</li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
  import useAsync from '@/modules/common/composables/useAsync';
  import AuthService from '@/modules/user/services/AuthService';
  import UserService from '@/modules/user/services/UserService';
  import { onMounted } from 'vue';

  const { data: userList, error, isLoading, fetch } = useAsync(UserService.getAllUsers);

  const logout = () => {
    AuthService.logout();
  };

  onMounted(() => fetch());
</script>
