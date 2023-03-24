import type { TUser } from '@/modules/user/models/user.models';

export interface IChatRoom {
  id: number;
  name: string;
  description: string;
  users: TUser[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ChatEvent {
  ERROR = 'Error',
  MESSAGE = 'message',
  GET_ROOMS = 'rooms',
  CREATE_ROOM = 'createRoom',
  PAGINATE_ROOM = 'paginateRoom',
}

