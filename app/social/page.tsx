"use client";
import "../globals.css";
import React, { useState } from "react";
import Header from "../ui/header";
import SocialPost from "../ui/social/SocialPost";

// 전체 & 친구 탭
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
          selectedTab === "all" ? "border-b-4 border-black" : ""
        } flex-1 transition duration-300 ease-in-out`}
        onClick={() => handleTabChange("all")}
      >
        <div className="mb-2 flex justify-center font-bold">전체</div>
      </div>
      <div
        className={` cursor-pointer  ${
          selectedTab === "friends" ? "border-b-4 border-black" : ""
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
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        {/* 탭 -> 전체 / 친구 게시물 */}
        <Tabs onTabChange={handleTabChange} />
        {/* 소셜 포스트 수 만큼 */}
        <SocialPost />
        <SocialPost />
      </div>
    </main>
  );
}
