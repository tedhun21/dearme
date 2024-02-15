/* eslint-disable @next/next/no-img-element */
"use client";

import "../../globals.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import Header from "@/app/ui/header";
import ReadDiary from "@/app/ui/diary/ReadDiary";
import TodayPick from "@/app/ui/diary/TodayPick";
import SentimentalQuotes from "@/app/ui/diary/Sentimental Quotes";
import CreateDiaryButton from "@/app/ui/diary/CreateDiaryButton";
import MonthlyDiary from "@/app/ui/diary/MonthlyDiary";
import { getCookie } from "@/util/tokenCookie";

import EditPost from "@/public/social/EditPost";
import Delete from "@/public/social/Delete";
import Footer from "@/app/ui/footer";

interface DiaryData {
  date: string;
  title: string;
  body: string;
  photos: { url: string }[];
  tags: string[];
  feelings: string;
}

export default function Diary() {
  const params = useParams();
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);

  useEffect(() => {
    // 로그인 여부 확인
    const jwtToken = getCookie("access_token");
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      console.error("로그인이 필요합니다.");
      return;
    }

    // params.date가 변경될 때마다 함수를 실행
    const fetchDiaryData = async () => {
      try {
        // params.date를 이용하여 서버에 GET 요청
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/diaries?date=${params.date}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`, // JWT 토큰을 Authorization 헤더에 추가
            },
          },
        );
        setDiaryData(response.data.results);
      } catch (error) {
        console.error("Failed to fetch diary data:", error);
        setDiaryData([]);
      }
    };

    if (params.date) {
      fetchDiaryData();
    }
  }, [params.date]); // params.date가 변경될 때마다 useEffect를 실행

  // 일기 데이터가 있는지 확인하는 함수
  const hasDiaryData = diaryData !== null;
  console.log(hasDiaryData, diaryData);

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {hasDiaryData ? (
          <>
            <Header />
            {/* 일기 데이터가 있을 경우 렌더링 */}
            <ReadDiary diaryData={diaryData} />
            <TodayPick />
            <section className="p-5">
              <div className="mb-3 flex justify-end ">
                <button className="mr-4 h-10  rounded-lg border-2 border-default-400 bg-default-300 pl-2 pr-2 hover:bg-default-400 ">
                  <div className="flex items-center justify-center">
                    <EditPost className="mr-1 h-4 w-4" />
                    <span className="text-sm font-semibold">수정하기</span>
                  </div>
                </button>
                <button className="h-10  rounded-lg border-2 border-black bg-default-800 pl-2 pr-2 hover:border-default-800">
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
