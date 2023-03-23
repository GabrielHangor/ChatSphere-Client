import AuthService from '@/modules/user/services/AuthService';

export const socketConfig = {
  socketUrl: 'http://localhost:3000',
  extraHeaders: {
    Authorization: AuthService.getCredentials()?.accessToken || '',
  },
};
