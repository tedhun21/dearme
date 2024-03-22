"use client";

import { settingState } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import HomeTodo from "./HomeTodo";
import HomeDiary from "./HomeDiary";

export default function HomeTodoAndDiary() {
  const { isDiary } = useRecoilValue(settingState);
  return <div>{!isDiary ? <HomeTodo /> : isDiary && <HomeDiary />}</div>;
}
