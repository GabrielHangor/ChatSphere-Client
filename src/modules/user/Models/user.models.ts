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
