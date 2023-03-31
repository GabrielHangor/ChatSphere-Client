import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ChatEvent, type IChatRoom, type IMessage } from '@/modules/chat/models/chat.models';
import ChatService from '@/modules/chat/services/ChatService';
import type { IPaginatedRes } from '@/modules/common/models/common.models';

export default function useChatRoom(room: IChatRoom | undefined) {
  if (!room) throw Error('Room is not found');

  const paginatedMessages = ref<IPaginatedRes<IMessage[]>>();
  const messageInput = ref<string | null>(null);

  onMounted(() => {
    ChatService.sendEvent(ChatEvent.JOIN_ROOM, room);
    ChatService.subscribeToEvent<IPaginatedRes<IMessage[]>>(
      ChatEvent.MESSAGES,
      (messages) => (paginatedMessages.value = messages)
    );
  });

  onBeforeUnmount(() => {
    ChatService.sendEvent(ChatEvent.LEAVE_ROOM, room);
    ChatService.unsubscribeFromEvent<IPaginatedRes<IMessage[]>>(
      ChatEvent.MESSAGES,
      (messages) => (paginatedMessages.value = messages)
    );
  });

  const sendMessage = () => {
    if (!messageInput.value) return;

    ChatService.sendEvent<IMessage>(ChatEvent.ADD_MESSAGE, { text: messageInput.value, room });

    messageInput.value = null;
  };

  return { paginatedMessages, messageInput, sendMessage };
}
