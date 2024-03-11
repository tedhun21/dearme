/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Header from "@/app/ui/header";
import ReadDiary from "@/app/ui/diary/ReadDiary";
import TodayPick from "@/app/ui/diary/TodayPick";
import SentimentalQuotes from "@/app/ui/diary/Sentimental Quotes";
import CreateDiaryButton from "@/app/ui/diary/CreateDiaryButton";
import MonthlyDiary from "@/app/ui/diary/MonthlyDiary";
import DiaryActionButton from "@/app/ui/diary/DiaryActionButton";

import Footer from "@/app/ui/footer";

import { getDiaryForDay } from "@/store/api";

export default function Diary() {
  const { date } = useParams();

  const { data: diaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date }),
  });

  const diaryId = diaryData?.id;

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {diaryData ? (
          <>
            <Header />
            {/* 일기 데이터가 있을 경우 렌더링 */}
            <ReadDiary date={date} diaryData={diaryData} />
            <TodayPick diaryData={diaryData} />
            <section className="p-5">
              <div className="mb-3 flex justify-end gap-2">
                <DiaryActionButton
                  date={date}
                  diaryId={diaryId as string}
                  actionType="Edit"
                />
                <DiaryActionButton
                  date={date}
                  diaryId={diaryId as string}
                  actionType="Delete"
                />
              </div>
            </section>
          </>
        ) : (
          // 일기 데이터가 없을 경우 렌더링
          <>
            <Header />
            <article className="absolute flex flex-col">
              <SentimentalQuotes />
              <section className="relative top-[-120px]">
                <CreateDiaryButton currentPage="Diary" />
              </section>
              <section className="relative right-20 flex justify-end">
                <MonthlyDiary />
              </section>
            </article>
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
