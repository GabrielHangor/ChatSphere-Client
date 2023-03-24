import ApiClient from '@/ApiClient';
import { useAuthStore } from '@/stores/auth';
import type { TAuthUserReq, TAuthUserRes } from '@/modules/user/models/user.models';
import router from '@/router';
import ChatService from '@/modules/chat/services/ChatService';

export default class AuthService {
  public static async login(credentials: TAuthUserReq) {
    const { data: userCredentials } = await ApiClient.post<TAuthUserRes>('/users/login', credentials);
    AuthService.setUserCredentials(userCredentials);
    ChatService.connect(AuthService.getCredentials()?.accessToken || '');
  }

  public static logout() {
    const authStore = useAuthStore();

    authStore.user = null;
    authStore.accessToken = null;
    authStore.expiresAt = null;
    localStorage.removeItem('userCredentials');

    ApiClient.defaults.headers.common = {};

    router.push('/signIn');
  }

  public static restoreUser() {
    const userCredentials = AuthService.getCredentials();

    if (userCredentials) {
      const expirationTime = new Date(userCredentials.expiresAt).getTime();
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        AuthService.setUserCredentials(userCredentials);
        ChatService.connect(userCredentials.accessToken);
      } else {
        AuthService.logout();
        console.error('Access token has expired');
      }
    }
  }

  public static getCredentials() {
    const userCredentials = localStorage.getItem('userCredentials');

    if (!userCredentials) {
      console.error('User credentials not found');
      return;
    }

    const credentials: TAuthUserRes = JSON.parse(userCredentials);

    return credentials;
  }

  private static setUserCredentials({ id, username, email, accessToken, expiresAt }: TAuthUserRes) {
    const authStore = useAuthStore();
    authStore.user = { username, email, id };
    authStore.accessToken = accessToken;
    authStore.expiresAt = expiresAt;

    localStorage.setItem(
      'userCredentials',
      JSON.stringify({ id, accessToken, expiresAt, username, email })
    );
    ApiClient.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  }
}
