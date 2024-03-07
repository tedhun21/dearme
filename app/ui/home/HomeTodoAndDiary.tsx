"use client";

import { settingState } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import HomeTodo from "./HomeTodo";
import HomeDiary from "./HomeDiary";
import { useState } from "react";

export default function HomeTodoAndDiary() {
  const { isDiary } = useRecoilValue(settingState);
  return <div>{!isDiary ? <HomeTodo /> : isDiary && <HomeDiary />}</div>;
}
