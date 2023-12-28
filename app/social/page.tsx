"use client";

// TODO: CreatePost 플로팅 버튼 위치 수정
// TODO: Footer

import "../globals.css";
import React, { useState } from "react";
import Header from "../ui/header";
import SocialPost from "../ui/social/SocialPost";
import CreatePost from "../ui/social/CreatePost";
import Footer from "../ui/footer";

interface TabsProps {
  onTabChange: (selectedTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState("all");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="mb-5 flex justify-center">
      <div
        className={` cursor-pointer  ${
          selectedTab === "all" ? "border-b-4 border-black" : "text-default-500"
        } flex-1 transition duration-300 ease-in-out`}
        onClick={() => handleTabChange("all")}
      >
        <div className="mb-2 flex justify-center font-bold">전체</div>
      </div>
      <div
        className={` cursor-pointer  ${
          selectedTab === "friends"
            ? "border-b-4 border-black"
            : "text-default-500"
        } duration-30 flex-1 transition ease-in-out`}
        onClick={() => handleTabChange("friends")}
      >
        <div className="mb-2 flex justify-center font-bold">친구</div>
      </div>
    </div>
  );
};

export default function Social() {
  const handleTabChange = (selectedTab: string) => {};
  return (
    <main className=" flex min-h-screen justify-center">
      <div className=" mb-[90px] flex min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        {/* 탭 -> 전체 / 친구 게시물 */}
        <Tabs onTabChange={handleTabChange} />
        {/* 소셜 포스트 수 만큼 map*/}
        <SocialPost />
        <SocialPost />
        {/* 게시물 작성 버튼 */}
        <div className="fixed bottom-20 right-20">
          <CreatePost />
        </div>
      </div>
      <Footer />
    </main>
  );
}

{
  /* <>
            <article className="absolute flex flex-col">
              <SentimentalQuotes />
              <section className="relative top-[-120px]">
                <CreateDiaryButton />
              </section>
              <section className="relative right-20 flex justify-end">
                <MonthlyDiary />
              </section>
            </article>
            <Footer />
          </> */
}
