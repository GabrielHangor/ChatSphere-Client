import ApiClient from '@/ApiClient';
import type { IGenericGetRes } from '@/modules/common/models/common.models';
import type { TCreateUserReq, TUserList } from '@/modules/user/models/user.models';

import AuthService from './AuthService';

export default class UserService {
  static async createUser(credentials: TCreateUserReq) {
    await ApiClient.post('/users', credentials);
    await AuthService.login({ email: credentials.email, password: credentials.password });
  }

  static async getAllUsers() {
    const { data } = await ApiClient.get<IGenericGetRes<TUserList>>('/users');
    return data;
  }
}
