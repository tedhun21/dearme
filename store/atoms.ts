import { atom } from "recoil";

enum EPublic {
  all,
  friend,
  private,
}

export type ITodo = {
  id: number;
  date: Date;
  body: string;
  done: boolean;
  public: EPublic;
  user: IUser;
};

type IUser = {
  id: number;
  username: string;
};

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
