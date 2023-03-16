import ApiClient from '@/ApiClient';
import type ICreateUserReq from '@/modules/user/Services/UserService';
import type { IUser } from './../Models/user.models';

export default class UserService {
  static async createUser(user: ICreateUserReq) {
    const createdUser = await ApiClient.post<IUser>('/users', user);
    console.log(createdUser);
  }
}
