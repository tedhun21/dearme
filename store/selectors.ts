import { selector } from "recoil";

import { meState, postListState, todoListState } from "./atoms";

export const todoListSelector = selector({
  key: "todoListSelector",
  get: ({ get }) => get(todoListState),
  set: ({ set }, newValue) => set(todoListState, newValue),
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
