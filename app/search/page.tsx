/* eslint-disable @next/next/no-img-element */
"use client";
// TODO: 헤더 검색 버튼 추가

import "../globals.css";
import React, { useState } from "react";
import Header from "../ui/header";
import BackButton from "../ui/backbutton";

import InputBase from "@mui/material/InputBase";

import Find from "@/public/search/Find";
import Tag from "@/public/search/Tag";

export default function Search() {
  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <div className="m-5">
          {/* 검색 */}
          <div className="mb-5 flex w-full items-center">
            <div className="h-25 w-full items-center rounded-lg border-2 border-default-400 p-0.5">
              <InputBase
                sx={{
                  ml: 1,
                  color: "#928c7f",
                  fontSize: 14,
                  width: "100%",
                }}
                placeholder="계정 및 #목표 검색"
                //   value={search}
              />
            </div>
            <Find className="ml-2 h-4 w-4 fill-current" />
          </div>

          {/* 검색 결과: 계정 / 목표 */}
          <section>
            <div className="mb-3 text-sm font-semibold">계정</div>
            <div className="flex items-center">
              <img
                src="https://i.pinimg.com/736x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg"
                alt="User Image"
                className="h-10  w-10 rounded-full"
              />
              {/* <div className=" ml-2 flex flex-col "> */}
              <div className="ml-2 text-sm font-semibold text-default-700">
                do_e
              </div>
              {/* <div className="font-meidum  text-xs text-default-700">
                  친구
                </div> */}
              {/* </div> */}
            </div>
          </section>

          {/* 지우기 */}
          <div className="mb-10"></div>

          <section>
            <div className="mb-3 text-sm font-semibold">목표</div>
            <div className="flex items-center">
              <Tag className="h-10 w-10" />

              <div className="ml-2 text-sm font-semibold text-default-700">
                #프로그래밍
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
