import ApiClient from '@/ApiClient';
import { useAuthStore } from '@/stores/auth';
import type {
  IAuthUserReq,
  IUser,
  ICreateUserReq,
  IAuthUserRes,
} from '@/modules/user/Models/user.models';

export default class UserService {
  static async createUser(credentials: ICreateUserReq) {
    await ApiClient.post<IUser>('/users', credentials);
    await UserService.login({ email: credentials.email, password: credentials.password });
  }

  static async login(credentials: IAuthUserReq) {
    const { data } = await ApiClient.post<IAuthUserRes>('/users/login', credentials);
    const authStore = useAuthStore();

    authStore.user = { email: data.email, username: data.username };
    authStore.accessToken = data.accessToken;
    authStore.expiresIn = data.expiresIn;
  }
}
