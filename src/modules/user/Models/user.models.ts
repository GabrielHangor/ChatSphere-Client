export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ICreateUserReq {
  username: string;
  email: string;
  password: string;
}

export interface IAuthUserReq {
  email: string
  password: string
}


