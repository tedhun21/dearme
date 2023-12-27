/* eslint-disable @next/next/no-img-element */
"use client";

import "../../globals.css";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import BackArrow from "@/public/diary/BackArrow";
import Find from "@/public/search/Find";
import New from "@/public/diary/New";
import Happy from "@/public/diary/Happy";
import Joyful from "@/public/diary/Joyful";
import Neutral from "@/public/diary/Neutral";
import Sad from "@/public/diary/Sad";
import Unhappy from "@/public/diary/Unhappy";
import Remembered from "@/public/diary/Remembered";
import Triangle from "@/public/social/Triangle";

export default function MonthlyDiary() {
  const params = useParams();
  const month = params.month;
  console.log(month);

  const formatDate = (dateString: any): any => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;

    return `${year}년 ${month}월 `;
  };

  const router = useRouter();

  // 임시 이미지 & 날짜 (지우기)
  const december = [
    {
      imageUrl:
        "https://i.pinimg.com/564x/67/1d/98/671d983412a9986a516c0a4fa6ce9a3a.jpg",
      date: "12.01",
      mood: "happy",
      remember: true,
      title: "새로운 시작, 일기 앱 개발의 설렘",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/4f/cf/d2/4fcfd26c7f5369bf4cc3859a70575ae9.jpg",
      date: "12.02",
      mood: "sad",
      remember: false,
      title: "오늘 헤어졌다.. 어디로 가야하나요 아저씨",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/69/57/05/695705a0c79a43b380de2d97ff3853b0.jpg",
      date: "12.03",
      mood: "happy",
      remember: true,
      title: "귀여워",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/80/7f/b6/807fb6032b16449d1169c8e7fe1cc1a8.jpg",
      date: "12.04",
      mood: "happy",
      remember: true,
      title: "여행을 떠나요",
    },
    {
      imageUrl: "",
      date: "12.05",
      mood: "neutral",
      remember: false,
      title: "멍",
    },
  ];

  // 기분 -> 이모지
  function getEmoji(mood: string) {
    switch (mood) {
      case "happy":
        return <Happy className=" h-5 w-5" />;
      case "joyful":
        return <Joyful className="h-5 w-5" />;
      case "neutral":
        return <Neutral className="h-5 w-5" />;
      case "sad":
        return <Sad className="h-5 w-5" />;
      case "unhappy":
        return <Unhappy className="h-5 w-5" />;
      default:
        return null;
    }
  }
  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <header className="ml-5 mr-5 flex items-center">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full"
            type="button"
            onClick={() => router.back()}
          >
            <BackArrow className="mr-2 h-4 w-4 fill-current text-default-700" />
          </button>
          {/* <h1 className="text-lg font-semibold text-default-700">12월 일기</h1> */}
          <h1 className="text-md  font-semibold">{formatDate(month)}</h1>
        </header>
        {/* 검색 */}
        <section className="flex w-full items-center p-5">
          <div className="h-25 flex w-full items-center rounded-lg border-2 border-default-400 p-0.5">
            <Find className="ml-2 h-4 w-4 fill-current text-default-500" />
            <InputBase
              sx={{
                ml: 1,
                color: "#928c7f",
                fontSize: 14,
                width: "100%",
              }}
              placeholder="검색"
              //   value={search}
            />
          </div>
        </section>
        <Divider
          sx={{
            borderColor: "#EBE3D5",
            height: "1px",
            mx: "20px",
          }}
        />
        <section className="m-5 flex flex-wrap justify-between">
          {december.map((day, index) => (
            <div
              key={index}
              className="group relative m-5 flex flex-col items-center"
            >
              <div className="relative h-[180px] w-[200px] overflow-hidden rounded-2xl">
                {index === december.length - 1 && (
                  <New className="absolute left-0 top-0 z-20 h-6 w-7 group-hover:hidden" />
                )}
                {/* 이미지 */}
                {day.imageUrl ? (
                  <img
                    src={day.imageUrl}
                    alt="day"
                    className="h-[180px] w-[200px] rounded-2xl object-cover group-hover:opacity-20"
                  />
                ) : (
                  <div className="h-[180px] w-[200px] rounded-2xl  bg-default-800 group-hover:opacity-30"></div>
                )}

                {/* 호버링 컨테이너 */}
                <div className="absolute inset-0 z-10 hidden flex-col items-center justify-center group-hover:flex">
                  {/* 아이콘 & 리멤버 */}
                  <div className="absolute left-0 top-0 m-2 flex items-center">
                    {getEmoji(day.mood)}
                    {day.remember && (
                      <Remembered className="ml-1 h-4 w-5 fill-current" />
                    )}
                  </div>
                  {/* 일기 타이틀 */}
                  <span className="text-b p-2 text-center font-semibold">
                    {day.title}
                  </span>
                </div>
              </div>
              <span className="mt-1 text-sm font-normal">{day.date}</span>
            </div>
          ))}
        </section>
        <Divider
          sx={{
            borderColor: "#EBE3D5",
            height: "1px",
            mx: "20px",
          }}
        />
        <div className="mb-5 mt-5 flex justify-center">
          <button
            className="flex items-center border-none font-semibold text-default-700"
            onClick={() => window.scrollTo(0, 0)}
          >
            맨 위로
            <Triangle className="text-default-990 ml-1 h-3 w-3 rotate-180 cursor-pointer fill-current" />
          </button>
        </div>
      </div>
    </main>
  );
}
