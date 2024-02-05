/* eslint-disable @next/next/no-img-element */
"use client";

import "../../globals.css";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getSearchGoals } from "@/store/api";

import Header from "@/app/ui/header";
import BackButton from "@/app/ui/backbutton";

import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

import GoalTag from "@/public/search/GoalTag";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

const SearchResults = () => {
  const params = useParams();
  const searchTerm = params.tag;
  console.log(typeof searchTerm);

  // # 목표 검색
  const { data: getGoalSearchResult } = useQuery({
    queryKey: ["geGoalSearchResult"],
    queryFn: () => getSearchGoals(searchTerm, true),
    staleTime: 0,
  });
  const searchedGoals = getGoalSearchResult || [];
  console.log(searchedGoals);
  console.log(searchedGoals.body);

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>

        <div className=" m-5 flex items-center">
          <GoalTag className="h-10 w-10" />
          <div className="flex flex-col">
            <h1 className="ml-2 text-sm font-semibold text-default-700">
              #{searchedGoals.body}
            </h1>
            <h2 className="ml-2 text-sm font-semibold text-default-500">
              {searchedGoals.postsCount}{" "}
              {searchedGoals.postsCount <= 1 ? " post" : " posts"}
            </h2>
          </div>
        </div>

        {searchedGoals.postsCount > 0 ? (
          <section>
            <h1 className=" mb-3 ml-5 mt-5 text-sm font-semibold text-default-700">
              Recent posts
            </h1>
            <div className="grid grid-cols-3 gap-0.5">
              {Array.isArray(searchedGoals.postsData) &&
                searchedGoals.postsData.map((post: any) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-center "
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "100%",
                      }}
                    >
                      <Image
                        src={`${BUCKET_URL}${post.photo.formats.thumbnail.url}`}
                        alt="Post Image"
                        layout={"fill"}
                        objectFit="fill"
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
      </div>
    </main>
  );
};

export default SearchResults;
