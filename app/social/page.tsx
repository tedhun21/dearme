/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// TODO: 무한스크롤
// TODO: CreatePost 플로팅 버튼 위치 수정
// TODO: commentSettings (public, friends, off)

import "../globals.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../ui/header";
import Tabs from "../ui/social/Tabs";
import SocialPost from "../ui/social/SocialPost";
import CreatePost from "../ui/social/CreatePost";
import Footer from "../ui/footer";

// post type
export interface Photo {
  id: number;
  url: string;
}

export interface User {
  id: number;
  nickname: string | null;
  photo: Photo | null;
}

export interface Goal {
  id: number;
  body: string;
}

export interface Comment {
  createdAt: string;
  id: number;
  body: string;
  updatedAt: string;
  publishedAt: string;
  user: User;
}

export interface Like {
  id: number;
  nickname: string;
  photo: Photo;
}

export interface Post {
  id: number;
  photo: Photo;
  body: string;
  createdAt: string;
  public: boolean;
  commentSettings: "PUBLIC" | "FRIENDS" | "OFF";
  user: User;
  goal: Goal;
  comments: Comment[];
  likes: Like[];
}

export default function Social() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 선택된 탭 -> 쿼리
  const [selectedTab, setSelectedTab] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fetchPosts = async (tab: string) => {
    let url = `${API_URL}/posts`;
    // console.log(url);

    // TODO token 수정 (토큰 없으면)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1NTU0ODE0LCJleHAiOjE3MDgxNDY4MTR9.u6-E04b9QUVquZp63cnsZiTEUk_MfZuQB5ttYal8OYw";

    let headers = {};

    if (tab === "all") {
      url += "?public=true";
    } else {
      headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(headers);
    }

    try {
      const response = await axios.get<Post[]>(url, { headers });
      console.log(url);
      setPosts((response.data as any).posts);
      // console.log(response.data.posts);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchPosts(selectedTab);
  }, [selectedTab]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 pb-[90px] shadow-lg">
        <Header />
        <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        {Array.isArray(posts) &&
          posts.map((post, postId) => <SocialPost key={postId} post={post} />)}

        {/* 게시물 작성 버튼 */}
        <div className="fixed bottom-20 right-20">
          <CreatePost />
        </div>
      </div>
      <Footer />
    </main>
  );
}
