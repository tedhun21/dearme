"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Exit from "@/public/diary/Exit";
import DiaryCreateModal from "@/app/ui/diary/DiaryCreateModal";
import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import SleepRecord from "@/app/ui/diary/SleepRecord";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";

export default function Create() {
  const params = useParams();
  const [formattedDate, setFormattedDate] = useState("");

  // 최상단 날짜 표시
  useEffect(() => {
    if (params.date) {
      // URL에서 받은 날짜 파싱
      const [year, month, day] = params.date
        .split("-")
        .map((num) => parseInt(num, 10));

      // Date 객체 생성
      const date = new Date(year, month - 1, day);

      // 요일 배열
      const days = ["일", "월", "화", "수", "목", "금", "토"];

      // 날짜 형식 재구성
      const newFormat = `${date.getFullYear()}. ${
        date.getMonth() + 1
      }. ${date.getDate()}. (${days[date.getDay()]})`;

      setFormattedDate(newFormat);
    }
  }, [params]);

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
          {formattedDate}
          <div>
            <Exit />
          </div>
        </section>
        <section className="flex flex-col gap-4 bg-default-200">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            기분
          </h2>
          <ChooseMood />
          <h3 className="flex justify-center text-sm font-medium text-gray-400">
            오늘 하루는 어땠나요?
          </h3>
        </section>
        <section className="flex flex-col bg-default-200">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            감정태그
          </h2>
          <ChooseEmotionTags />
        </section>
        <section className="flex flex-col bg-default-300">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            함께한 사람
          </h2>
          <ChooseCompanions />
        </section>
        <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
          <DiaryCreateModal />
        </section>
        <section className="flex flex-col bg-default-300">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            수면
          </h2>
          <SleepRecord />
        </section>
        <section className="flex flex-col bg-default-400">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            오늘의 사진
          </h2>
          <UploadPhoto />
        </section>
        <section className="flex flex-col bg-default-800">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
            오늘의 PICK
          </h2>
          <UploadTodayPick />
        </section>
      </article>
    </main>
  );
}
