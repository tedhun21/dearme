/* eslint-disable @next/next/no-img-element */
"use client";
// TODO: 헤더 검색 버튼 추가

import "../globals.css";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSearchUsers } from "@/store/api";

import Users from "../ui/search/Users";
import ImageTag from "../ui/search/ImageTag";
import Footer from "../ui/footer";

import InputBase from "@mui/material/InputBase";
import { Divider } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import Find from "@/public/search/Find";
import Tag from "@/public/search/Tag";
import BackIcon from "@/public/signup/BackIcon";
import SearchTitle from "@/public/search/SearchTitle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function Search() {
  // 지우기
  const tags = [
    {
      imageUrl:
        "https://i.pinimg.com/564x/73/95/de/7395dec8eb275253c2245947dda7d622.jpg",
      tagText: "happy",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/73/95/de/7395dec8eb275253c2245947dda7d622.jpg",
      tagText: "happy",
    },
    {
      imageUrl:
        "https://i.pinimg.com/564x/73/95/de/7395dec8eb275253c2245947dda7d622.jpg",
      tagText: "happy",
    },
  ];
  const relatedimages = [
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
    "https://i.pinimg.com/564x/f4/df/b0/f4dfb0c8b7bd8ab89c410b0e97d45f61.jpg",
  ];

  const goals = ["javascript", "javascript deep dive"];

  // 유저 검색
  const [search, setsearch] = useState<string>("");
  const { isLoading, data: searchResult } = useQuery({
    queryKey: ["getSearchResult"],
    queryFn: () => getSearchUsers(search),
    enabled: Boolean(search),
    staleTime: 0,
  });
  const users = searchResult || [];

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 pb-[52px] shadow-lg">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <section className="flex w-full pl-[64px] pt-[36px]">
          <SearchTitle />
        </section>

        <div className="m-5">
          {/* 검색 */}
          <div className="mb-5 flex w-full items-center">
            <div className="flex h-12 w-full items-center rounded-lg border-2 border-default-400 bg-default-100 p-0.5">
              <Find className="ml-5 h-4 w-4 fill-current text-default-400" />
              <InputBase
                sx={{
                  ml: 1,
                  color: "#DED0B6",
                  fontSize: 14,
                  width: "100%",
                }}
                placeholder="User, #Goal and More..."
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
          </div>

          <Divider sx={{ border: "1px solid #EBE3D5", mb: "20px" }} />

          {/* 검색 결과: 계정 */}
          {search.trim() !== "" && (
            <section>
              <div className="mb-3 text-xl font-semibold">User</div>
              {Array.isArray(users) &&
                users.map((user, index) => (
                  <Users
                    key={index}
                    imageUrl={`${BUCKET_URL}${user.photo}`}
                    nickname={user.nickname}
                  />
                ))}
            </section>
          )}

          {/* 검색 결과: 이미지 */}
          <section className="mt-10">
            <div className="mb-3 text-xl font-semibold">Image</div>
            {/* 이미지 태그 */}
            <div className="flex gap-2">
              {Array.isArray(tags) &&
                tags.map((tag, index) => (
                  <ImageTag
                    key={index}
                    imageUrl={tag.imageUrl}
                    tagText={tag.tagText}
                  />
                ))}
            </div>
            {/* 연관 이미지 */}
            {/* TODO 화면 사이즈 -> 이미지 크기 수정 */}
            <div className=" mb-4 flex flex-wrap ">
              {Array.isArray(relatedimages) &&
                relatedimages
                  .slice(0, 3)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="related images"
                      className="flex w-full rounded-[20px] p-2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3"
                    />
                  ))}
            </div>
            {/* view 3 more images */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Divider sx={{ border: "1px solid #EBE3D5", flex: "1" }} />
              {/* TODO cursor-pointer? */}
              {/* TODO useQuery 로직 작성하기 */}
              <button className="cursor-pointer rounded-[20px] bg-default-400 px-4 py-1 text-sm font-normal">
                View 3 more images
                <KeyboardArrowDownRoundedIcon
                  sx={{ width: "20px", height: "24px", strokeWidth: 0.2 }}
                />
              </button>
              <Divider sx={{ border: "1px solid #EBE3D5", flex: "1" }} />
            </div>
          </section>

          {/* 검색 결과: 목표 */}
          <section className="my-10">
            <div className="mb-3 text-xl font-semibold">Goal</div>

            {Array.isArray(goals) &&
              goals.map((goal, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <Tag className="h-10 w-10" />
                  <div className="ml-2 text-sm font-semibold text-default-700">
                    #{goal}
                  </div>
                </div>
              ))}
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}
