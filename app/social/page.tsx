/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "../globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useInView } from "react-intersection-observer";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getMe, getPostWithPage } from "@/store/api";

import { CircularProgress } from "@mui/material";

import Header from "../ui/header";
import Tabs from "../ui/social/Tabs";
import SocialPost from "../ui/social/SocialPost";
import New from "../ui/social/New";
import CreatePost from "../ui/social/CreatePost";
import Footer from "../ui/footer";
// post type
export interface Photo {
  id: number;
  url: string;
}

export interface User {
  id: number;
  nickname: string;
  photo: Photo | null;
}

export interface Goal {
  id: number;
  title: string;
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
  commentSettings: "ALL" | "FRIENDS" | "OFF";
  user: User;
  goal: Goal;
  comments: number;
  likes: Like[];
}

export default function Social() {
  const router = useRouter();

  // me
  const { isSuccess, data: me } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  // Tab (query)
  const [selectedTab, setSelectedTab] = useState<string>("all");

  useEffect(() => {
    if (!me && selectedTab === "friends") {
      window.alert("Please log in first.");
      router.replace("/login");
    }
  }, [me, selectedTab]);

  // infinite scroll
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Post[], Error>({
    queryKey: ["getPostsWithPage", selectedTab],
    queryFn: ({ pageParam }) =>
      getPostWithPage({ tab: selectedTab, pageParam: pageParam }),

    getNextPageParam: (lastPage, allPages: any) => {
      if (lastPage) {
        const maxPage = lastPage.length / 6;
        const nextPage = allPages.length + 1;
        return maxPage < 1 ? undefined : nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchNextPage();
  }, [inView]);

  // New post
  const [postUploaded, setPostUploaded] = useState(false);

  return (
    <main className="flex min-h-screen w-full justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />

        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <div className="relative w-full pb-28">
          {data?.pages &&
            data.pages.map(
              (posts: any) =>
                Array.isArray(posts) &&
                posts.map((post: any) => (
                  <SocialPost key={post.id} post={post} />
                )),
            )}

          {!hasNextPage &&
          Array.isArray(data?.pages?.[0]) &&
          data?.pages?.[0].length === 0 ? (
            <div className="flex justify-center px-5 py-2 text-sm text-default-500">
              No posts yet
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className=" px-5 py-2 text-sm text-default-500">
                All posts are loaded.
              </div>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="rounded-2xl bg-default-500 px-4 py-1 text-white hover:opacity-50"
              >
                <span className="text-sm">to the top</span>
              </button>
            </div>
          )}
        </div>

        {hasNextPage && (
          <div ref={ref}>
            <CircularProgress />
          </div>
        )}

        {/* 게시물 작성 버튼 */}
        <div className="fixed bottom-0 w-full max-w-[600px]">
          <div className="absolute bottom-24 right-5 flex">
            {me && <CreatePost setPostUploaded={setPostUploaded} />}
          </div>
        </div>

        {/* New Post */}
        {postUploaded && window.scrollY > 100 && (
          <div className=" fixed top-10 flex w-full max-w-[600px] justify-center">
            <div className="absolute">
              <New setPostUploaded={setPostUploaded} />
            </div>
          </div>
        )}

        <Footer me={me} />
      </div>
    </main>
  );
}
