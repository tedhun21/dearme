/* eslint-disable @next/next/no-img-element */
"use client";

// TODO new
// TODO 호버링
// TODO 일기 Link 확인

import "../../globals.css";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import { useQuery } from "@tanstack/react-query";
import { getDiariesForMonth, getSearchDiaries } from "@/store/api";

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

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MonthlyDiary() {
  const params = useParams();
  const month = params.month;

  const router = useRouter();

  // 날짜 형식
  function getDate(dateString: any, day?: boolean) {
    const date = dayjs(dateString);
    if (day) {
      return date.format("DD");
    }
    return date.format("MMM YYYY");
  }

  //  월별 Diary
  const { data: diariesForMonth } = useQuery({
    queryKey: ["getDiariesForMonth"],
    queryFn: () => getDiariesForMonth(month),
  });

  // 검색 input focus
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  // 검색어 상태
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const handleDelete = () => {
    setSearch("");
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search !== "") {
        setDebouncedSearch(search);
      }
      // 검색어가 없을 경우
      else {
        setDebouncedSearch(search);
        return;
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  // Diary 검색
  const { data: searchResult } = useQuery({
    queryKey: ["getSearchResult", debouncedSearch],
    queryFn: () => getSearchDiaries({ search: debouncedSearch, date: month }),
    enabled: Boolean(debouncedSearch),
    staleTime: 0,
  });

  const foundDiaries = searchResult || [];

  // 월별 일기 || 검색 결과
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  useEffect(() => {
    if (foundDiaries.length > 0) {
      const filtered = diariesForMonth.filter((diary: any) =>
        searchResult.includes(diary.id),
      );
      setFilteredDiaries(filtered);
    } else {
      setFilteredDiaries(diariesForMonth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundDiaries]);

  // 기분 -> 이모지
  function getEmoji(mood: string) {
    switch (mood) {
      case "HAPPY":
        return <Happy className=" h-5 w-5" />;
      case "JOYFUL":
        return <Joyful className="h-5 w-5" />;
      case "NEUTRAL":
        return <Neutral className="h-5 w-5" />;
      case "SAD":
        return <Sad className="h-5 w-5" />;
      case "UNHAPPY":
        return <Unhappy className="h-5 w-5" />;
      default:
        return null;
    }
  }
  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {/* 헤더 */}
        <header className="mx-5 flex items-center">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full"
            type="button"
            onClick={() => router.back()}
          >
            <BackArrow className="mr-2 h-4 w-4 fill-current text-default-700" />
          </button>
          <h1 className="text-md  font-semibold">{getDate(month)}</h1>
        </header>

        {/* 검색 */}
        <section className="flex w-full items-center p-5">
          <div className="h-25 flex w-full items-center rounded-lg border-2 border-default-400 p-0.5">
            <Find
              className={`ml-2 h-4 w-4 fill-current ${
                isInputFocused ? "text-default-700" : "text-default-400"
              }`}
            />
            <InputBase
              sx={{
                ml: 1,
                color: "#928c7f",
                fontSize: 14,
                width: "100%",
              }}
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={handleFocus}
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

        {/* 월별 일기 */}
        <section className="m-5 grid grid-cols-2 gap-x-5 gap-y-6 overflow-scroll scrollbar-hide sm:grid-cols-2">
          {Array.isArray(filteredDiaries) &&
            filteredDiaries.map((diary: any) => (
              // 일기 카드 컨테이너 (카드 + 날짜)
              <Link key={diary.id} href={`/${diary.date}/diary`}>
                <div
                  className="group relative flex flex-col"
                  style={{ height: "auto" }}
                >
                  {/* 일기 날짜 & 제목 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 text-xl font-semibold">
                        {getDate(diary.date, true)}
                      </div>
                      <div className="whitespace-pre-wrap text-sm font-medium">
                        {diary.title}
                      </div>
                    </div>
                    <div className="pr-2 text-2xs">
                      {dayjs(diary.date).format("ddd")}
                    </div>
                  </div>

                  {/* 일기 카드 */}
                  {diary.photos ? (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        paddingBottom: "90%",
                      }}
                    >
                      <Image
                        src={`${BUCKET_URL}${diary.photos?.[0].url}`}
                        alt="Diary Photo"
                        sizes="172px"
                        fill
                        priority
                        className="rounded-2xl group-hover:opacity-20"
                      />
                    </div>
                  ) : (
                    <div
                      className=" rounded-2xl border bg-default-800 group-hover:opacity-20"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        paddingBottom: "90%",
                      }}
                    />
                  )}

                  {/* 호버링 컨테이너 */}
                  <div className="absolute inset-0 z-10 hidden flex-col items-center justify-center group-hover:flex">
                    <div className="absolute left-0 top-10 m-2 flex items-center">
                      {getEmoji(diary.mood)}
                      {diary.remember && (
                        <Remembered className="ml-1 h-4 w-5 fill-current" />
                      )}
                    </div>

                    <span className="text-b p-2 text-center font-semibold">
                      {diary.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </section>

        <Divider
          sx={{
            borderColor: "#EBE3D5",
            height: "1px",
            mx: "20px",
          }}
        />
        {/* TOP */}
        <div className="mb-5 mt-5 flex justify-center">
          <button
            className="flex items-center border-none text-sm font-semibold text-default-700"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Triangle className="mr-1 h-3 w-3 rotate-180 cursor-pointer fill-current text-default-990" />
            Top
          </button>
        </div>
      </div>
    </main>
  );
}
