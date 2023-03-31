<template>
  <div class="flex justify-between items-center">
    <h2>{{ props.room?.name }}</h2>
    <div>
      <h4>Updated at {{ getFormattedTimeStamp(props.room?.updatedAt!) }}</h4>
      <h4>{{ props.room?.description }}</h4>
    </div>
  </div>
  <div class="flex">
    <h4>Users:</h4>
    <span class="mx-1" v-for="user in room?.users" :key="user.id">{{ user.username }}</span>
  </div>

  <NCard :bordered="false" embedded class="flex-1 overflow-y-auto scrollbar">
    <section>
      <p
        v-for="message in paginatedMessages?.items"
        :key="message.id"
        class="m-3 p-3 rounded-lg w-fit max-w-[80%]"
        :class="loggedInUser?.id === message.user?.id ? 'bg-green-200 ml-auto' : 'bg-slate-200'"
      >
        <span class="font-semibold">{{ message.user?.username }}</span>
        <span class="block">{{ message.text }}</span>
        <span class="text-black text-[12px] text-right block italic">
          {{ getFormattedTimeStamp(message.createdAt) }}
        </span>
      </p>
    </section>
  </NCard>

  <NForm @submit.prevent="sendMessage">
    <NInputGroup>
      <NInput v-model:value.trim="messageInput" placeholder="Type smth here" />
      <NButton type="primary" attr-type="submit" :disabled="!messageInput">Send</NButton>
    </NInputGroup>
  </NForm>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { IChatRoom } from '@/modules/chat/models/chat.models';
  import useChatRoom from '@/modules/chat/composables/useChatRoom';
  import getFormattedTimeStamp from '@/modules/common/utils/getFormattedTimeStamp';
  import { useAuthStore } from '@/stores/auth';

  const props = defineProps({
    room: { type: Object as PropType<IChatRoom> },
  });

  const { paginatedMessages, messageInput, sendMessage } = useChatRoom(props.room);
  const { user: loggedInUser } = useAuthStore();
</script>
