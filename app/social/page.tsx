"use client";

// TODO: CreatePost 플로팅 버튼 위치 수정
// TODO: Footer

import "../globals.css";
import React, { useState } from "react";
import Header from "../ui/header";
import SocialPost from "../ui/social/SocialPost";
import CreatePost from "../ui/social/CreatePost";
import Footer from "../ui/footer";

// Tab 컴포넌트
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
    <section className="mb-5 flex justify-center">
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
    </section>
  );
};

// SocialPost
interface Comment {
  user: string;
  profile: string;
  comment: string;
  time: string;
}

interface Likes {
  user: string;
  profile: string;
}
export interface Post {
  user: string;
  profile: string;
  goal: string;
  imageUrl: string;
  contents: string;
  time: string;
  likes: Likes[];
  comments: Comment[];
}

export default function Social() {
  // 임시 소셜 포스트 (지우기)
  const posts = [
    {
      user: "do_e",
      profile:
        "https://i.pinimg.com/474x/e0/3b/e0/e03be0d9ea0f716eb57f9dfe3e27c4c6.jpg",
      goal: "#운동",
      imageUrl:
        "https://i.pinimg.com/564x/9c/52/1f/9c521ff45c6c5f591a2b5ad58b4bbade.jpg",
      contents: "고고",
      time: "now",
      likes: [],
      comments: [],
    },
    {
      user: "s_j",
      profile:
        "https://i.pinimg.com/564x/46/72/cb/4672cb3e4ad1d575af68f8dd3490fdfc.jpg",
      goal: "#독서",
      imageUrl:
        "https://i.pinimg.com/564x/66/dc/ca/66dcca5a43bc51a2d669fa4782618c12.jpg",
      contents: "리딩",
      time: "23 minutes ago",
      likes: [
        {
          user: "nic_ky",
          profile:
            "https://i.pinimg.com/564x/9e/89/62/9e89625152f160f260217f6c108a345f.jpg",
        },
      ],
      comments: [
        {
          user: "nic_ky",
          profile:
            "https://i.pinimg.com/564x/9e/89/62/9e89625152f160f260217f6c108a345f.jpg",
          comment: "화이팅~~",
          time: "now",
        },
      ],
    },
    {
      user: "hmin",
      profile:
        "https://i.pinimg.com/564x/f7/c7/b2/f7c7b25bdfcfc7186ac7a51d752f231e.jpg",
      goal: "#프로그래밍",
      imageUrl:
        "https://i.pinimg.com/564x/07/fd/eb/07fdeb7efaabbfaaf8a2e02f4c5ae827.jpg",
      contents: "아늑",
      time: "23 minutes ago",
      likes: [
        {
          user: "nic_ky",
          profile:
            "https://i.pinimg.com/564x/9e/89/62/9e89625152f160f260217f6c108a345f.jpg",
        },
      ],
      comments: [
        {
          user: "nic_ky",
          profile:
            "https://i.pinimg.com/564x/9e/89/62/9e89625152f160f260217f6c108a345f.jpg",
          comment: "화이팅~~",
          time: "now",
        },
      ],
    },
  ];
  const handleTabChange = (selectedTab: string) => {};

  return (
    <main className=" flex min-h-screen justify-center">
      <div className=" mb-[90px] flex min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <Tabs onTabChange={handleTabChange} />

        {/* 소셜 포스트 수 만큼 map*/}
        {posts.map((post, index) => (
          <SocialPost key={index} post={post} />
        ))}

        {/* 게시물 작성 버튼 */}
        <div className="fixed bottom-20 right-20">
          <CreatePost />
        </div>
      </div>
      <Footer />
    </main>
  );
}
