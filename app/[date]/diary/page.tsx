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

import EditPost from "@/public/social/EditPost";
import Delete from "@/public/social/Delete";
import Footer from "@/app/ui/footer";

import { getDiaryForDay } from "@/store/api";

export default function Diary() {
  const { date } = useParams();

  const { data: diaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date }),
  });

  console.log("diaryData", diaryData);

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
              <div className="mb-3 flex justify-end">
                <button className="mr-4 h-10  rounded-lg border-2 border-default-400 bg-default-300 pl-2 pr-2 hover:bg-default-400 ">
                  <div className="flex items-center justify-center">
                    <EditPost className="mr-1 h-4 w-4" />
                    <span className="text-sm font-semibold">수정하기</span>
                  </div>
                </button>
                <button className="h-10  rounded-lg border-2 border-black bg-default-800 pl-2 pr-2 hover:bg-default-700">
                  <div className="flex items-center justify-center">
                    <Delete className="mr-1 h-4 w-4 fill-current text-white" />
                    <span className="text-sm font-semibold text-white">
                      삭제하기
                    </span>
                  </div>
                </button>
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
