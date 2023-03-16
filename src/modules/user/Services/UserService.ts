import ApiClient from '@/ApiClient';
import type { IAuthUserReq, IUser, ICreateUserReq } from '@/modules/user/Models/user.models';

export default class UserService {
  static async createUser(user: ICreateUserReq) {
    console.log('trying to create user...probably unsuccessfull');
    const createdUser = await ApiClient.post<IUser>('/users', user);
    console.log('user created');
  }

  static async signIn(user: IAuthUserReq) {
    const loggedInUser = await ApiClient.post('/users/login', user);
  }
}
