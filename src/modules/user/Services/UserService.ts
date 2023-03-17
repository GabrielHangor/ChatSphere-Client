import ApiClient from '@/ApiClient';

import type { TCreateUserReq } from '@/modules/user/Models/user.models';

import AuthService from './AuthService';

export default class UserService {
  static async createUser(credentials: TCreateUserReq) {
    await ApiClient.post('/users', credentials);
    await AuthService.login({ email: credentials.email, password: credentials.password });
  }

  static async getAllUsers() {
    const { data } = await ApiClient.get('/users');
    return data.items;
  }
}


