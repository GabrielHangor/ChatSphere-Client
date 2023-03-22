import SocketClient from '@/SocketClient';

export default class ChatService {
  public static sendMessage(event: string, message: string): void {
    SocketClient.emit(event, message);
  }

  public static subscribeToEvent(event: string, callback: (msg: string) => void): void {
    SocketClient.on(event, callback);
  }
}
