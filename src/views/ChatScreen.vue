<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="10"
      :width="400"
      show-trigger="arrow-circle"
      content-style="padding: 24px;"
      bordered
    >
      <ChatList @on-room-select="(room) => (selectedRoom = room)" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;display: flex;flex-direction: column">
      <Transition appear name="fade" mode="out-in">
        <section v-if="selectedRoom" :key="selectedRoom.id" class="flex flex-col h-full">
          <ChatRoom :room="selectedRoom" />
        </section>
        <NResult v-else status="404" title="No chat room selected" class="my-auto" />
      </Transition>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
  import ChatList from '@/modules/chat/components/ChatList.vue';
  import ChatRoom from '@/modules/chat/components/ChatRoom.vue';
  import type { IChatRoom } from '@/modules/chat/models/chat.models';
  import { ref } from 'vue';

  const selectedRoom = ref<IChatRoom>();
</script>
