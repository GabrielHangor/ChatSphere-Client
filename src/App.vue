<template>
  <h1>Hello</h1>
  <h2>message</h2>
  <input type="text" v-model="message" />
  <ul>
    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
  </ul>
  <button @click="sendMessage">Send</button>

  <h2>message2</h2>
  <input type="text" v-model="message2" />
  <ul>
    <li v-for="(message2, index) in messages2" :key="index">{{ message2 }}</li>
  </ul>
  <button @click="sendMessage2">Send</button>
</template>

<script setup lang="ts">
  import { io } from 'socket.io-client';
  import { ref } from 'vue';

  const socket = io('http://localhost:3000');

  const message = ref('');
  const messages = ref(['']);

  const message2 = ref('');
  const messages2 = ref(['']);

  const sendMessage = () => {
    socket.emit('message', { message: message.value, id: socket.id, number: 10 });
  };

  const sendMessage2 = () => {
    socket.emit('message2', { message: message2.value, id: socket.id, number: 10 });
  };

  const updateMessageList = (message: string) => {
    messages.value.push(message);
  };

  socket.on('message', updateMessageList);

  const updateMessageList2 = (message: string) => {
    messages2.value.push(message);
  };

  socket.on('message2', updateMessageList2);
</script>
