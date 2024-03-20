import { Divider, IconButton } from "@mui/material";
import { getDate } from "./MoodArrays";
import { useState } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import RememberModal from "./RememberModal";
import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function DiaryCard({ remember }: any) {
  // modal

  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="group relative flex flex-shrink-0">
      <div
        className="relative h-[300px] w-[240px] cursor-pointer overflow-hidden rounded-2xl bg-white"
        onClick={() => handleOpen()}
      >
        {remember.photos ? (
          <Image
            alt="diary first image"
            src={`${BUCKET_URL}${remember.photos[0].url}`}
            className="object-cover group-hover:opacity-50"
            fill
          />
        ) : (
          <div className="rounded-2xl bg-default-800 group-hover:opacity-95" />
        )}

        {/* 호버링 컨테이너 */}
        <div className="absolute inset-0 z-10 hidden flex-col justify-between p-2 text-white group-hover:flex">
          {/* date */}
          <div className="flex flex-col">
            <span className="text-2xl font-semibold">
              {getDate(remember.date).day}
            </span>
            <span className="font-base text-xl">
              {getDate(remember.date).month}
            </span>
          </div>
          {/* 일기 타이틀 */}
          <div className="text-center">
            <span className="font-semibold">{'"' + remember.title + '"'}</span>
          </div>
          {/* 연도 & more */}
          <div className="flex items-center justify-between">
            <div className="flex-grow">
              <span>{getDate(remember.date).year}</span>
              <Divider className="border-white" />
            </div>
            <div className="flex-0">
              <IconButton aria-label="more" id="long-button">
                <MoreVertRoundedIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <RememberModal
        remember={remember}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}

//  {/* date */}
//  <div className="absolute left-0 top-0 m-2 flex items-center">
//  <div className="flex flex-col items-center justify-center">
//    <span className="text-2xl font-semibold text-white">
//      {getDate(remember.date).day}
//    </span>

//    <span className="font-base text-xl text-white">
//      {getDate(remember.date).month}
//    </span>
//  </div>
// </div>
// {/* 일기 타이틀 */}
// <div className="absolute max-w-[240px] whitespace-pre-wrap break-words px-2 text-center text-base font-semibold text-white">
//  {'"' + remember.title + '"'}
// </div>
// {/* 연도 & more */}
// <div className="absolute bottom-5 flex w-[180px] ">
//  <div>
//    <span className=" font-base text-lg font-light text-white">
//      {getDate(remember.date).year}
//    </span>
//    <Divider className=" w-[160px] border-white px-2" />
//  </div>
//  <IconButton aria-label="more" id="long-button">
//    <MoreVertRoundedIcon sx={{ color: "#ffffff" }} />
//  </IconButton>
//  <RememberModal
//    remember={remember}
//    open={open}
//    handleClose={handleClose}
//  />
// </div>
