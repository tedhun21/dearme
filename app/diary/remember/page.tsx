/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// TODO Footer
// TODO: 요일 넣기
// TODO: select 태그 위치 수정
// TODO: 이미지 코너

import "../../globals.css";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRemembersForMonth } from "@/store/api";

import Image from "next/image";
import Link from "next/link";

import MoodCards from "@/app/ui/remember/MoodArrays";
import RememberModal from "@/app/ui/remember/RememberModal";

import Select from "@mui/material/Select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";
import { getToday } from "@/util/date";
import MoodArrays from "@/app/ui/remember/MoodArrays";

export interface RememberItem {
  id: number;
  date: string;
  mood: string;
  title: string;
  photos: any;
}

// Month
const months = [
  { month: "Jan", value: "01" },
  { month: "Feb", value: "02" },
  { month: "Mar", value: "03" },
  { month: "Apr", value: "04" },
  { month: "May", value: "05" },
  { month: "Jun", value: "06" },
  { month: "Jul", value: "07" },
  { month: "Aug", value: "08" },
  { month: "Sep", value: "09" },
  { month: "Oct", value: "10" },
  { month: "Nov", value: "11" },
  { month: "Dec", value: "12" },
];

export default function Remeber() {
  //   Select
  const [selectedMonth, setSelectedMonth] = useState(getToday().slice(5, 7));
  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  // get _ remembers
  const { data: remembers, refetch: refecthRemeberDiary } = useQuery({
    queryKey: ["selectedMonth"],
    queryFn: () => getRemembersForMonth(selectedMonth),
  });

  useEffect(() => {
    refecthRemeberDiary();
  }, [selectedMonth]);

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black shadow-lg">
        {/* 헤더 */}
        <header className="flex w-full flex-row justify-between p-5">
          <Link href="/">
            <Image
              src="/remember/whitelogo.png"
              width={77}
              height={20}
              alt="logo"
              quality={80}
              priority
            />
          </Link>

          {/* Year & Month */}
          <div className="flex flex-row  p-1 ">
            <Select
              sx={{
                "&.MuiOutlinedInput-root": {
                  width: "100px",
                  height: "20px",
                  fontSize: "14px",
                  color: "white",
                  fontWeight: "600",
                  paddingLeft: "16px",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "& .MuiSvgIcon-root": {
                    right: "unset",
                    left: "0px",
                  },
                },
              }}
              IconComponent={({ ...rest }) => (
                <KeyboardArrowDownRoundedIcon
                  {...rest}
                  sx={{
                    width: "20px",
                    height: "24px",
                    fill: "#ffffff",
                    stroke: "white",
                    // strokeWidth: "0.5",
                  }}
                />
              )}
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {/* map */}
              {months.map((month) => (
                <MenuItem
                  key={month.value}
                  sx={{ fontSize: "14px" }}
                  value={month.value}
                >
                  {month.month}
                </MenuItem>
              ))}
            </Select>
            <span className="pr-5 text-sm font-semibold text-white">2024</span>
          </div>
        </header>

        <div className="mb-5 ml-5 mr-5 mt-5 flex items-baseline">
          <h1 className="text-xl font-semibold text-white">Remember</h1>
          <h3 className="ml-0.5 text-xs font-semibold text-default-300">
            moments
          </h3>
        </div>

        {/* Moods 카드 */}
        <section className="mx-5 h-[calc(100vh-172px)] overflow-scroll scrollbar-hide">
          <MoodArrays remembers={remembers} />
        </section>
      </div>
    </main>
  );
}
