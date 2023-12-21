/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 헤더 넣기
// TODO: 일기 작성 버튼

import "../../globals.css";
import React, { useState } from "react";

import Header from "@/app/ui/header";
import ReadDiary from "@/app/ui/diary/ReadDiary";
import TodayPick from "@/app/ui/diary/TodayPick";

import EditPost from "@/public/social/EditPost";
import Delete from "@/public/social/Delete";

export default function Diary() {
  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        {/* <div className="m-5"></div> */}
        <ReadDiary />
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
      </div>
    </main>
  );
}
