import type { TUser } from '@/modules/user/models/user.models';

export enum ChatEvent {
  ERROR = 'Error',
  MESSAGES = 'messages',
  ADD_MESSAGE = 'addMessage',
  GET_ROOMS = 'rooms',
  CREATE_ROOM = 'createRoom',
  PAGINATE_ROOM = 'paginateRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
}

export interface IChatRoom {
  id?: number;
  name: string;
  description: string;
  users: TUser[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  id?: number;
  text: string;
  user?: TUser;
  room: IChatRoom;
  createdAt?: Date;
  updatedAt?: Date;
}
