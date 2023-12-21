/* eslint-disable @next/next/no-img-element */
"use client";

import "../../globals.css";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/app/ui/header";
import BackButton from "@/app/ui/backbutton";
import InputBase from "@mui/material/InputBase";

import Find from "@/public/search/Find";
import Tag from "@/public/search/Tag";

const SearchResults = () => {
  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <article className="m-5">
          <div className=" mb-10 flex items-center">
            <Tag className="h-10 w-10" />
            <div className="flex flex-col">
              <h1 className="ml-2 text-sm font-semibold text-default-700">
                #프로그래밍
              </h1>
              <h2 className="ml-2 text-sm font-semibold text-default-500">
                게시물 6개
              </h2>
            </div>
          </div>

          <section>
            <h1 className=" mb-3 text-sm font-semibold text-default-700">
              최근 게시물
            </h1>

            <div className="xxs:grid-cols-4 xs:grid-cols-5 grid grid-cols-3">
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/cb/29/5d/cb295d1af516ae6995033ff8475b685d.jpg"
                  width={200}
                  height={200}
                  alt="posts"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/cb/29/5d/cb295d1af516ae6995033ff8475b685d.jpg"
                  width={200}
                  height={200}
                  alt="posts"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/cb/29/5d/cb295d1af516ae6995033ff8475b685d.jpg"
                  width={200}
                  height={200}
                  alt="posts"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/cb/29/5d/cb295d1af516ae6995033ff8475b685d.jpg"
                  width={200}
                  height={200}
                  alt="posts"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/cb/29/5d/cb295d1af516ae6995033ff8475b685d.jpg"
                  width={200}
                  height={200}
                  alt="posts"
                />
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default SearchResults;
