import ApiClient from '@/ApiClient';
import { useAuthStore } from '@/stores/auth';
import type {
  IAuthUserReq,
  IUser,
  ICreateUserReq,
  IAuthUserRes,
} from '@/modules/user/Models/user.models';
import { useRouter } from 'vue-router';

export default class UserService {
  static async createUser(credentials: ICreateUserReq) {
    await ApiClient.post<IUser>('/users', credentials);
    await UserService.login({ email: credentials.email, password: credentials.password });
  }

  static async login(credentials: IAuthUserReq) {
    const { data } = await ApiClient.post<IAuthUserRes>('/users/login', credentials);
    const user = { email: data.email, username: data.username };
    UserService.setUserCredentials(data.accessToken, data.expiresAt, user);
  }

  static async getAllUsers() {
    const { data } = await ApiClient.get('/users');
    return data.items;
  }

  static logout() {
    const authStore = useAuthStore();
    const router = useRouter();

    authStore.user = null;
    authStore.accessToken = null;
    authStore.expiresAt = null;
    localStorage.removeItem('userCredentials');

    ApiClient.defaults.headers.common = {};
    router.push('/');
  }

  static async restoreUser() {
    const userCredentials = localStorage.getItem('userCredentials');

    if (!userCredentials) return;

    const { accessToken, expiresAt, user } = JSON.parse(userCredentials);
    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();

    if (currentTime < expirationTime) {
      UserService.setUserCredentials(accessToken, expiresAt, user);
    } else {
      UserService.logout();
    }
  }

  private static setUserCredentials(accessToken: string, expiresAt: number, user: Partial<IUser>) {
    const authStore = useAuthStore();
    authStore.user = user;
    authStore.accessToken = accessToken;
    authStore.expiresAt = expiresAt;

    localStorage.setItem('userCredentials', JSON.stringify({ accessToken, expiresAt, user }));
    ApiClient.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  }
}

// TODO create a separate auth service and extract some logic in it
