import { io, Socket } from 'socket.io-client';
import AuthService from '@/modules/user/services/AuthService';
import { ChatEvent } from '@/modules/chat/models/chat.models';
import type { ServerException } from '@/modules/common/models/common.models';
import { socketConfig } from '@/modules/chat/constants/chat.constants';

export default class ChatService {
  private static socket: Socket | undefined;

  public static sendEvent<T>(event: string, payload: T): void {
    if (!ChatService.socket) ChatService.initializeSocket();

    if (ChatService.socket) ChatService.socket.emit(event, payload);
  }

  public static subscribeToEvent<T>(event: string, callback: (payload: T) => void): void {
    if (!ChatService.socket) ChatService.initializeSocket();

    if (ChatService.socket) ChatService.socket.on(event, callback);
  }

  public static unsubscribeFromEvent<T>(event: string, callback: (payload: T) => void): void {
    if (ChatService.socket) {
      ChatService.socket.off(event, callback);
    }
  }

  public static disconnect(): void {
    if (ChatService.socket) {
      ChatService.socket.disconnect();
      ChatService.socket = undefined;
    }
  }

  private static initializeSocket(): void {
    try {
      ChatService.socket = io(socketConfig.socketUrl, {
        extraHeaders: socketConfig.extraHeaders,
      });
    } catch (error) {
      console.error('Error initializing socket:', error);
    }

    ChatService.subscribeToEvent<ServerException>(ChatEvent.ERROR, (error) => {
      if (error.response?.statusCode === 401) AuthService.logout();
    });
  }
}
