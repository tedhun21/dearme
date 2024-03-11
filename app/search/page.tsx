/* eslint-disable @next/next/no-img-element */
"use client";
// TODO: 헤더 검색 버튼 추가

import "../globals.css";
import React, { useState } from "react";

import SearchBar from "../ui/search/SearchBar";
import Users from "../ui/search/Users";
import ImageTag from "../ui/search/ImageTag";
import Footer from "../ui/footer";

import { Divider } from "@mui/material";

import BackIcon from "@/public/signup/BackIcon";
import SearchTitle from "@/public/search/SearchTitle";

export default function Search() {
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

        <Footer />
      </div>
    </main>
  );
}
