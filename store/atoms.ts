import { atom } from "recoil";

enum EPublic {
  all,
  friend,
  private,
}

export interface ITodo {
  id: number;
  date: Date;
  body: string;
  done: boolean;
  public: EPublic;
  user: IUser;
}

interface IUser {
  id: number;
  username: string;
}

interface IPagination {
  page: number;
  pageCount: number;
  total: number;
}

export interface ITodos {
  result: ITodo[];
  pagination: IPagination;
}

export const todoListState = atom<ITodo[]>({
  key: "Todos",
  default: [],
});

export interface IMe {
  id: number;
  email: string;
  username: string;
  nickname: string;
  photo: any;
  background: any;
}

export const meState = atom<IMe>({
  key: "Me",
  default: undefined,
});
