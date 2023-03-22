<template>
  <div class="container">
    <h1>Chat Screen</h1>

    <button @click="logout">Logout</button>

    <h2>messages</h2>
    <ul>
      <li v-for="message in messages" :key="message">{{ message }}</li>
    </ul>
    <input v-model="msg" type="text" placeholder="send msg to socket" />
    <button @click="sendMsg">send</button>
  </div>
</template>

<script setup lang="ts">
  import ChatService from '@/modules/chat/services/ChatService';
  import AuthService from '@/modules/user/services/AuthService';

  import { onMounted, ref } from 'vue';

  const logout = () => AuthService.logout();

  const msg = ref('');
  const messages = ref<string[]>([]);

  const sendMsg = () => {
    ChatService.sendMessage('message', msg.value);
  };

  onMounted(() => {
    ChatService.subscribeToEvent('message', (msg) => {
      messages.value.push(msg);
    });
  });
</script>
