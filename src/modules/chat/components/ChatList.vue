<template>
  <section class="flex flex-col items-center h-full gap-3">
    <h2>My Chats ({{ paginatedRooms?.meta.totalItems }})</h2>

    <NList clickable bordered hoverable class="flex-1 flex flex-col">
      <NListItem
        v-for="room in paginatedRooms?.items"
        :key="room.id"
        @click="emit('on-room-select', room)"
      >
        {{ room }}
      </NListItem>
      <NButton size="large" class="mt-auto rounded-none" type="primary" block>Create new chat</NButton>
    </NList>
    <NPagination
      size="medium"
      v-model:page="paginationOptions.page"
      v-model:page-size="paginationOptions.limit"
      :page-count="paginatedRooms?.meta.totalPages"
      :show-size-picker="showSizePicker"
      :page-sizes="[5, 10, 20, 30]"
      :on-update-page="handlePaginationUpdate"
      :on-update-page-size="handlePaginationUpdate"
    />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import useChatList from '@/modules/chat/composables/useChatList';
  import type { IChatRoom } from '@/modules/chat/models/chat.models';

  const emit = defineEmits<{ (e: 'on-room-select', room: IChatRoom): void }>();

  const { paginatedRooms, paginationOptions, handlePaginationUpdate } = useChatList();

  const showSizePicker = computed(() => {
    if (paginatedRooms.value) {
      return paginatedRooms.value.meta.totalItems >= 10;
    }

    return false;
  });
</script>
