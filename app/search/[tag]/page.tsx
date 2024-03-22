/* eslint-disable @next/next/no-img-element */
"use client";
import "../../globals.css";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getPostsByGoals } from "@/store/api";

import Header from "@/app/ui/header";
import BackButton from "@/app/ui/backbutton";
import ViewPostModal from "@/app/ui/search/ViewPostModal";

import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { Divider } from "@mui/material";

import GoalTag from "@/public/search/GoalTag";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

const SearchResults = () => {
  const params = useParams();
  const searchTerm = params.tag;

  // # 목표 검색
  const { data: getGoalSearchResult } = useQuery({
    queryKey: ["geGoalSearchResult"],
    queryFn: () => getPostsByGoals(searchTerm),
    staleTime: 0,
  });
  const searchedPosts = getGoalSearchResult || [];

  // 포스트 조회 모달
  const [open, setOpen] = useState(false);

  const [selectedPost, setSetlectedPost] = useState<number | null>(null);

  const handleOpen = (postId: number) => {
    setOpen(true);
    setSetlectedPost(postId);
  };
  const handleClose = () => setOpen(false);

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>

        {/* #목표 & 목표 개수 */}
        <section className=" mx-5 my-10 flex items-center">
          <GoalTag className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="ml-2 text-base font-semibold text-default-700">
              #{searchTerm}
            </span>
            <span className="ml-2 text-xs font-medium text-default-500">
              {searchedPosts.length}{" "}
              {searchedPosts.length <= 1 ? " post" : " posts"}
            </span>
          </div>
        </section>

        {/* #목표 관련 포스트 */}
        {searchedPosts.length > 0 ? (
          <section>
            <Divider
              sx={{
                borderColor: "#EBE3D5",
                height: "2px",
                marginBottom: "20px",
              }}
            />
            <h1 className=" mb-3 ml-5 mt-5 text-sm font-semibold text-default-700">
              Recent posts
            </h1>
            <div className="grid grid-cols-3 gap-0.5">
              {Array.isArray(searchedPosts) &&
                searchedPosts.map((post: any) => (
                  <div
                    key={post.id}
                    className="flex cursor-pointer items-center justify-center"
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "100%",
                      }}
                      onClick={() => handleOpen(post.id)}
                    >
                      <Image
                        src={`${BUCKET_URL}${post.photo.url}`}
                        alt="Post Image"
                        fill
                        sizes="160px"
                        priority
                      />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ) : (
          <section className="flex h-full w-full items-center justify-center ">
            <div className="flex flex-col items-center">
              <AutoAwesomeMotionIcon className="mb-3 h-10 w-10 text-default-400" />
              <h1 className=" mb-3 text-sm font-semibold text-default-400">
                No posts yet
              </h1>
            </div>
          </section>
        )}

        {selectedPost && (
          <ViewPostModal
            open={open}
            handleClose={handleClose}
            postId={selectedPost}
          />
        )}
      </div>
    </main>
  );
};

export default SearchResults;
