import ChatService from '@/modules/chat/services/ChatService';
import { ChatEvent, type IChatRoom } from '@/modules/chat/models/chat.models';
import type { IPaginatedRes, TPaginationOptions } from '@/modules/common/models/common.models';
import { ref } from 'vue';

export default function useChatList() {
  const paginatedRooms = ref<IPaginatedRes<IChatRoom[]>>();
  const paginationOptions = ref<TPaginationOptions>({ limit: 10, page: 1 });

  ChatService.subscribeToEvent<IPaginatedRes<IChatRoom[]>>(ChatEvent.PAGINATE_ROOM, (payload) => {
    paginatedRooms.value = payload;
  });

  const handlePaginationUpdate = () => {
    ChatService.sendEvent(ChatEvent.PAGINATE_ROOM, paginationOptions.value);
  };

  handlePaginationUpdate();

  return { paginatedRooms, paginationOptions, handlePaginationUpdate };
}
