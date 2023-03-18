interface ISuperUser {
  id: string;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  expiresAt: number;
}

export type TCreateUserReq = Pick<ISuperUser, 'username' | 'email' | 'password'>;
export type TAuthUserReq = Pick<ISuperUser, 'email' | 'password'>;
export type TAuthUserRes = Pick<ISuperUser, 'email' | 'username' | 'accessToken' | 'expiresAt'>;
export type TUser = Pick<ISuperUser, 'username' | 'email'>;
export type TUserList = Pick<ISuperUser, 'id' | 'username' | 'email'>[];
