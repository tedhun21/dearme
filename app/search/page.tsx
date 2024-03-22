/* eslint-disable @next/next/no-img-element */
"use client";

import "../globals.css";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/store/api";

import SearchBar from "../ui/search/SearchBar";
import Footer from "../ui/footer";

import BackIcon from "@/public/signup/BackIcon";
import SearchTitle from "@/public/search/SearchTitle";

export default function Search() {
  // me
  const { data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

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
          <SearchBar />
        </div>

        <Footer me={meData} />
      </div>
    </main>
  );
}
