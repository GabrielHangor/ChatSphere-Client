import { io } from 'socket.io-client';
import AuthService from '@/modules/user/services/AuthService';

const userCredentials = AuthService.getCredentials();
const SocketClient = io('http://localhost:3000', {
  extraHeaders: { Authorization: userCredentials?.accessToken || '' },
});

SocketClient.on('Error', (error) => {
  if (error.response?.statusCode === 401) AuthService.logout();
});

export default SocketClient;
