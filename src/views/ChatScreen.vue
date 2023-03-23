<template>
  <div class="container">
    <h1>Chat Screen</h1>

    <button @click="logout">Logout</button>

    <h2>Rooms</h2>
    <ul>
      <li v-for="room in rooms" :key="room.id">{{ room.id }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ChatEvent, type IChatRoom } from '@/modules/chat/models/chat.models';
  import ChatService from '@/modules/chat/services/ChatService';
  import type { IPaginatedRes } from '@/modules/common/models/common.models';
  import AuthService from '@/modules/user/services/AuthService';

  import { ref } from 'vue';

  const logout = () => AuthService.logout();

  const rooms = ref<IChatRoom[]>();

  ChatService.subscribeToEvent<IPaginatedRes<IChatRoom[]>>(ChatEvent.GET_ROOMS, (payload) => {
    rooms.value = payload.items;
  });
</script>
