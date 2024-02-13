/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// TODO: CreatePost 플로팅 버튼 위치 수정
// TODO: commentSettings (public, friends, off)

import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { getPostWithPage } from "@/store/api";

import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";

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
  // nextPage?: number;
  // isLast?: boolean;
}

export default function Social() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 선택된 탭 -> 쿼리
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const queryClient = useQueryClient();
  const [ref, inView] = useInView();

  // infinite scroll
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
    Post[],
    Error
  >({
    queryKey: ["getPostsWithPage", { tab: selectedTab }],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getPostWithPage({ tab: selectedTab, pageParam: pageParam }),

    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.length / 6;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchNextPage();
  }, [inView]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 pb-[90px] shadow-lg">
        <Header />
        <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <div className="relative w-full">
          {data?.pages &&
            data.pages.map(
              (posts: any) =>
                Array.isArray(posts) &&
                posts.map((post: any) => (
                  <SocialPost key={post.id} post={post} />
                )),
            )}
        </div>

        {!hasNextPage && (
          <div className="flex justify-center px-5 py-2 text-sm text-default-500">
            All posts are loaded.
          </div>
        )}
        {hasNextPage && (
          <div ref={ref}>
            <CircularProgress />
          </div>
        )}

        {/* 게시물 작성 버튼 */}
        <div className="fixed bottom-20 right-20">
          <CreatePost />
        </div>
      </div>
      <Footer />
    </main>
  );
}
