import { selector } from "recoil";

import { goalListState, meState, todoListState } from "./atoms";

export const todoListSelector = selector({
  key: "todoListSelector",
  get: ({ get }) => get(todoListState),
  set: ({ set }, newValue) => set(todoListState, newValue),
});

export const meSelector = selector({
  key: "meSelector",
  get: ({ get }) => get(meState),
});

export const goalListSelector = selector({
  key: "goalListSelector",
  get: ({ get }) => get(goalListState),
  set: ({ set }, newValue) => set(goalListState, newValue),
});
