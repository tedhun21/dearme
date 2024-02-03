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
  priority: number;
}

interface IUser {
  id: number;
  username: string;
}

interface IPagination {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
}

// export interface ITodos {
//   results: ITodo[];
//   pagination: IPagination;
// }

export const todoListState = atom<ITodo[]>({
  key: "Todos",
  default: [],
});

interface IImage {
  id: number;
  url: string;
}

export interface IMe {
  id: number;
  email: string;
  username: string;
  nickname: string;
  photo: IImage;
  background: IImage;
  private: boolean;
}

export const meState = atom<IMe>({
  key: "Me",
  default: undefined,
});

interface IPost {}

interface IPosts {
  results: IPost[];
  pagination: IPagination;
}

export const postListState = atom<IPosts>({
  key: "Posts",
  default: { results: [], pagination: {} },
});
