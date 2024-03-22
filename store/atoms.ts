import { atom } from "recoil";
import dayjs, { Dayjs } from "dayjs";
// import { recoilPersist } from "recoil-persist";

// RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// const localStorage =
//   typeof window !== "undefined" ? window.localStorage : undefined;

// const { persistAtom } = recoilPersist({
//   key: "recoil-persist",
//   storage: localStorage,
//   converter: JSON,
// });

enum EPublic {
  ALL,
  FRIEND,
  PRIVATE,
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
  nickname: string;
}

interface IPagination {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
}

export const todoListState = atom<ITodo[]>({
  key: "Todos",
  default: [],
});

export const filter = atom<string>({
  key: "filter",
  default: "",
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
  friendCount: number;
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

interface IGoal {
  id: number;
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  createdAt: Dayjs;
  isPublic: boolean;
}

export const goalListState = atom<IGoal[]>({
  key: "Goals",
  default: [],
});

export interface ISetting {
  isLogin: false;
  isDiary: boolean;
  date: Dayjs;
  todogoalTitle: string;
  todogoalDate: Dayjs;
}

export const settingState = atom<ISetting>({
  key: "Settings",
  default: {
    isLogin: false,
    isDiary: false,
    date: dayjs(),
    todogoalTitle: "Todo",
    todogoalDate: dayjs(),
  },
});

export interface IProcess {
  is100: boolean;
  doReset: boolean;
}

export const processState = atom<IProcess>({
  key: "Process",
  default: { is100: false, doReset: false },
});

enum ECompanion {
  FAMILY,
  FRIEND,
  LOVER,
  ACQUAINTANCE,
  ALONE,
}

enum EMood {
  JOYFUL,
  HAPPY,
  NEUTRAL,
  UNHAPPY,
  SAD,
}
export interface IDiary {
  id: number;
  date: string;
  title: string;
  body: string;
  startSleep: string;
  endSleep: string;
  feelings: string;
  companions: ECompanion;
  photos: IImage[];
  mood: EMood;
  remember: boolean;
  weatherId: string;
  weather: string;
  todayPickTitle: string;
  todayPickContributors: string;
  todayPickDate: string;
  todayPickImage: string;
  todayPickId: number;
  createdAt: string;
  updatedAt: string;
}

export const diaryListState = atom({
  key: "Diaries",
  default: [],
});

export interface IFriend {
  id: number;
  username: string;
  nickname: string;
  photo?: IImage;
}
