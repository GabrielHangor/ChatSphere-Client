import { io, Socket } from 'socket.io-client';
import AuthService from '@/modules/user/services/AuthService';
import { ChatEvent } from '@/modules/chat/models/chat.models';
import type { ServerException } from '@/modules/common/models/common.models';

export default class ChatService {
  private static socket: Socket | undefined;

  public static sendEvent<T>(event: string, payload: T) {
    if (ChatService.socket) ChatService.socket.emit(event, payload);
  }

  public static subscribeToEvent<T>(event: string, callback: (payload: T) => void) {
    if (ChatService.socket) ChatService.socket.on(event, callback);
  }

  public static unsubscribeFromEvent<T>(event: string, callback: (payload: T) => void) {
    if (ChatService.socket) {
      ChatService.socket.off(event, callback);
    }
  }

  public static disconnect() {
    if (ChatService.socket) {
      ChatService.socket.disconnect();
      ChatService.socket = undefined;
    }
  }

  public static connect(accessToken: string) {
    try {
      ChatService.socket = io(import.meta.env.VITE_BASE_SOCKET_URL, {
        extraHeaders: { Authorization: accessToken },
      });
    } catch (error) {
      console.error('Error initializing socket:', error);
    }

    ChatService.subscribeToEvent<ServerException>(ChatEvent.ERROR, (error) => {
      if (error.response?.statusCode === 401) AuthService.logout();
    });
  }
}
