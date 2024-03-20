/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Header from "@/app/ui/header";
import ReadDiary from "@/app/ui/diary/ReadDiary";

import SentimentalQuotes from "@/app/ui/diary/Sentimental Quotes";
import CreateDiaryButton from "@/app/ui/diary/CreateDiaryButton";
import MonthlyDiary from "@/app/ui/diary/MonthlyDiary";
import DiaryActionButton from "@/app/ui/diary/DiaryActionButton";

import Footer from "@/app/ui/footer";

import { getDiaryForDay } from "@/store/api";
import TodayPicks from "@/app/ui/diary/TodayPicks";

export default function Diary() {
  const { date } = useParams();

  const { data: diaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date }),
  });
  console.log(diaryData);

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        {diaryData ? (
          <div className="flex h-full flex-col justify-between">
            {/* 일기 데이터가 있을 경우 렌더링 */}
            <div>
              <ReadDiary date={date} diaryData={diaryData} />
              {diaryData.today_picks?.length > 0 && (
                <TodayPicks picks={diaryData.today_picks} />
              )}
            </div>
            <section className="p-5">
              <div className="flex justify-end gap-2">
                <DiaryActionButton
                  date={date}
                  diaryId={diaryData.id as string}
                  actionType="Edit"
                />
                <DiaryActionButton
                  date={date}
                  diaryId={diaryData.id as string}
                  actionType="Delete"
                />
              </div>
            </section>
          </div>
        ) : (
          // 일기 데이터가 없을 경우 렌더링
          <>
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
