import { io, Socket } from 'socket.io-client';
import AuthService from '@/modules/user/services/AuthService';
import { ChatEvent } from '@/modules/chat/models/chat.models';
import type { ServerException } from '@/modules/common/models/common.models';

export default class ChatService {
  private static socket: Socket | null;

  public static sendEvent<T>(event: ChatEvent, payload: T) {
    ChatService.socket?.emit(event, payload);
  }

  public static subscribeToEvent<T>(event: ChatEvent, callback: (payload: T) => void) {
    ChatService.socket?.on(event, callback);
  }

  public static unsubscribeFromEvent<T>(event: ChatEvent, callback: (payload: T) => void) {
    ChatService.socket?.off(event, callback);
  }

  public static disconnect() {
    ChatService.socket?.disconnect();
    ChatService.socket = null;
  }

  public static connect(accessToken: string) {
    try {
      ChatService.socket = io(import.meta.env.VITE_BASE_SOCKET_URL, {
        extraHeaders: { Authorization: accessToken },
      });
    } catch (error) {
      console.error('Error initializing socket:', error);
      return;
    }

    ChatService.subscribeToEvent<ServerException>(ChatEvent.ERROR, (error) => {
      if (error.response?.statusCode === 401) AuthService.logout();
    });
  }
}
