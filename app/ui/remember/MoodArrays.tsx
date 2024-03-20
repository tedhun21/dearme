/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { RememberItem } from "@/app/diary/remember/page";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import RememberModal from "./RememberModal";
import { useState } from "react";
import MoodCard from "./MoodArray";
import MoodArray from "./MoodArray";

interface MoodCardsProps {
  remembers: RememberItem[];
}
export const getDate = (date: any) => {
  const monthEng = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = date.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return {
    year: year,
    month: monthEng[monthIndex],
    day: day,
  };
};

export default function MoodArrays({ remembers }: MoodCardsProps) {
  const moods =
    Array.isArray(remembers) &&
    Array.from(new Set(remembers.map((remember) => remember.mood)));

  // mood Arrays
  // a mood array
  // diary Cards
  // a diary card

  // 네네
  return (
    <section className="mb-10">
      {Array.isArray(remembers) && Array.isArray(moods) ? (
        moods.map((mood: any, index: number) => (
          <MoodArray key={index} mood={mood} remembers={remembers} />
        ))
      ) : (
        <div className="m-5 flex justify-center text-sm text-default-500 ">
          No remembered moments yet
        </div>
      )}
    </section>
  );
  // ({Array.isArray(remembers) ? (
  //   Array.isArray(moods) &&
  //     moods.map((mood: any) => <MoodCard key={mood.id} mood={mood} />)})
}
