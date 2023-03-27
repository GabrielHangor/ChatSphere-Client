<template>
  <section class="flex flex-col items-center h-full gap-3">
    <h2>My Chats ({{ paginatedRooms?.meta.totalItems }})</h2>

    <NList
      v-if="paginatedRooms?.items.length"
      clickable
      bordered
      hoverable
      class="flex-1 flex flex-col w-full"
    >
      <NListItem
        v-for="room in paginatedRooms?.items"
        :key="room.id"
        @click="emit('on-room-select', room)"
      >
        {{ room.name }} ID:{{ room.id }}
      </NListItem>
    </NList>
    <NResult v-else status="404" title="No chats so far" class="my-auto">
      <template #footer>Create one or get invited</template>
    </NResult>
    <NButton size="large" class="mt-auto" type="primary" block @click="showCreateRoomModal = true">
      Create new chat
    </NButton>
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
    <NModal v-model:show="showCreateRoomModal" :trap-focus="false">
      <CreateRoomForm @on-room-create="showCreateRoomModal = false" />
    </NModal>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import useChatList from '@/modules/chat/composables/useChatList';
  import type { IChatRoom } from '@/modules/chat/models/chat.models';
  import CreateRoomForm from '@/modules/chat/components/CreateRoomForm.vue';

  const emit = defineEmits<{ (e: 'on-room-select', room: IChatRoom): void }>();

  const { paginatedRooms, paginationOptions, handlePaginationUpdate } = useChatList();

  const showSizePicker = computed(() => {
    if (paginatedRooms.value) {
      return paginatedRooms.value.meta.totalItems >= 10;
    }

    return false;
  });

  const showCreateRoomModal = ref(false);
</script>
