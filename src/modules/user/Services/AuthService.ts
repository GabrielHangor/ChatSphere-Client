import ApiClient from '@/ApiClient';
import { useAuthStore } from '@/stores/auth';
import type { TAuthUserReq, TAuthUserRes } from '@/modules/user/models/user.models';
import router from '@/router';

export default class AuthService {
  static async login(credentials: TAuthUserReq) {
    const { data: userCredentials } = await ApiClient.post<TAuthUserRes>('/users/login', credentials);
    AuthService.setUserCredentials(userCredentials);
  }

  static logout() {
    const authStore = useAuthStore();

    authStore.user = null;
    authStore.accessToken = null;
    authStore.expiresAt = null;
    localStorage.removeItem('userCredentials');

    ApiClient.defaults.headers.common = {};

    router.push('/signIn');
  }

  static restoreUser() {
    const userCredentials = localStorage.getItem('userCredentials');

    if (!userCredentials) return;

    const { accessToken, expiresAt, email, username } = JSON.parse(userCredentials);
    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();

    if (currentTime < expirationTime) {
      AuthService.setUserCredentials({ accessToken, expiresAt, username, email });
    } else {
      AuthService.logout();
      throw Error('Access token has expired');
    }
  }

  private static setUserCredentials({ username, email, accessToken, expiresAt }: TAuthUserRes) {
    const authStore = useAuthStore();
    authStore.user = { username, email };
    authStore.accessToken = accessToken;
    authStore.expiresAt = expiresAt;

    localStorage.setItem('userCredentials', JSON.stringify({ accessToken, expiresAt, username, email }));
    ApiClient.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  }
}
