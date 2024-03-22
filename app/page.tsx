"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/store/api";

import Header from "./ui/header";
import Footer from "./ui/footer";
import CustomCalendar from "./ui/home/CustomCalendar";
import MeGoal from "./ui/me/plans/MeGoal";
import HomeTodoAndDiary from "./ui/home/HomeTodoAndDiary";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingState } from "@/store/atoms";

export default function Home() {
  const [{ isLogin }, setSetting] = useRecoilState(settingState);
  // 내 정보 가져오기
  const { isSuccess, data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
  });

  useEffect(() => {
    if (isSuccess && meData) {
      setSetting((prev: any) => ({ ...prev, isLogin: true }));
    } else if (!meData) {
      setSetting((prev: any) => ({ ...prev, isLogin: false }));
    }
  }, [isSuccess, meData]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <article className="mx-5 pb-24">
          <CustomCalendar />
          <MeGoal route="/" />
          <HomeTodoAndDiary />
        </article>
        <Footer me={meData} />
      </div>
    </main>
  );
}
