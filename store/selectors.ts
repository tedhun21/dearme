import { selector } from "recoil";

import {
  goalListState,
  meState,
  postListState,
  settingState,
  todoListState,
} from "./atoms";

export const todoListSelector = selector({
  key: "todoListSelector",
  get: ({ get }) => get(todoListState),
  set: ({ set }, newValue) => set(todoListState, newValue),
});

export const goalListSelector = selector({
  key: "goalListSelector",
  get: ({ get }) => get(goalListState),
  set: ({ set }, newValue) => set(goalListState, newValue),
});

export const meSelector = selector({
  key: "meSelector",
  get: ({ get }) => get(meState),
});

export const postListSelector = selector({
  key: "postListSelector",
  get: ({ get }) => get(postListState),
  set: ({ set }, newValue) => set(postListState, newValue),
});

export const settingSelector = selector({
  key: "settingSelector",
  get: ({ get }) => get(settingState),
});
