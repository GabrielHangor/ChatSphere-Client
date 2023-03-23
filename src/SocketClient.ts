import { io } from 'socket.io-client';
import AuthService from '@/modules/user/services/AuthService';
import { ChatEvent } from './modules/chat/models/chat.models';

const userCredentials = AuthService.getCredentials();
const SocketClient = io('http://localhost:3000', {
  extraHeaders: { Authorization: userCredentials?.accessToken || '' },
});

SocketClient.on(ChatEvent.ERROR, (error) => {
  if (error.response?.statusCode === 401) AuthService.logout();
});

console.log('io client initialized');

export default SocketClient;
