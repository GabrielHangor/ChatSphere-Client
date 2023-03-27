import ApiClient from '@/ApiClient';
import type { IPaginatedRes } from '@/modules/common/models/common.models';
import type { TCreateUserReq, TUserList } from '@/modules/user/models/user.models';
import AuthService from './AuthService';

export default class UserService {
  public static async createUser(credentials: TCreateUserReq) {
    await ApiClient.post('/users', credentials);
    await AuthService.login({ email: credentials.email, password: credentials.password });
  }

  public static async getAllUsers() {
    const { data } = await ApiClient.get<IPaginatedRes<TUserList>>('/users');
    return data;
  }

  public static async getUsersByName(username: string) {
    const { data } = await ApiClient.get<TUserList>(`/users/${username}`);
    return data;
  }
}
