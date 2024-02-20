/* eslint-disable @next/next/no-img-element */
// TODO 일기 1개 조회 api
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getDiaryForDay } from "@/store/api";
import { getDate } from "./MoodCards";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import WeatherIcons from "@/app/ui/diary/WeatherIcons";

import Film from "@/public/remember/Film";
import EditRemember from "@/public/remember/EditRemeber";
import DeleteRemember from "@/public/remember/DeleteRemember";
import CloseRemember from "@/public/remember/CloseRemember";

interface RmemberModalProps {
  selectedItem: string | null;
  open: boolean;
  handleClose: () => void;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function RememberModal({
  selectedItem,
  open,
  handleClose,
}: RmemberModalProps) {
  console.log(selectedItem);

  // get _ Diary
  const { data: diary } = useQuery({
    queryKey: ["getDiary", selectedItem],
    queryFn: () => getDiaryForDay(selectedItem),
  });

  console.log(diary);

  // tags
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShowMoreTags = () => {
    setShowAllTags(true);
  };

  // photos
  const [showPhotos, setShowPhotos] = useState<boolean>(false);

  const handleTogglephotos = () => {
    setShowPhotos((prev) => !prev);
    console.log(showPhotos);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <Box className="relative left-1/2 top-1/2 h-auto  w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[16px]  bg-black ">
        {/* 필름 디자인 */}
        <div className="flex justify-between px-2 text-[10px] text-default-700 ">
          <div className="">DEARME 5017 EPR</div>
          <div className="">8</div>
          <div className="">DEARME 5017 EPR</div>
          <div className="">10</div>
        </div>
        <div className="flex w-full gap-5 px-1 ">
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index}
              className="h-3 w-2 rounded-[2px] bg-default-500"
            ></div>
          ))}
        </div>
        <Divider className="my-2 border-default-900" />

        {/* 버튼 */}
        {/* <div>
          <button
            className="absolute right-4 top-4 z-10  "
            onClick={handleClose}
          >
            <CloseRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-800" />
          </button>
          <button className="absolute right-12 top-4 z-10 ">
            <DeleteRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-400" />
          </button>
          <button className="absolute right-20 top-4 z-10 ">
            <EditRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-400" />
          </button>
        </div> */}

        {/* Diary */}
        {diary && (
          <article className="flex w-full flex-col  ">
            <div className="mx-5 mb-2 flex items-center justify-between text-sm font-medium text-default-900">
              <div>
                {getDate(diary.date).day + " "}
                {getDate(diary.date).month + " "}
                {getDate(diary.date).year}
              </div>
              {diary.photos && (
                <div>
                  <button
                    className="flex items-center text-default-500 hover:text-default-900"
                    onClick={handleTogglephotos}
                  >
                    <ImageIcon className="h-4 w-5" />
                    <span className="text-sm">Photos</span>
                  </button>
                </div>
              )}
            </div>
            {/* 일기 이미지 */}
            {diary.photos && showPhotos && (
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className=" mb-5 w-full flex-1 object-cover"
              >
                {diary.photos.map((photo: any, index: any) => (
                  <SwiperSlide
                    key={index}
                    className=" flex items-center justify-center "
                  >
                    <img
                      src={`${BUCKET_URL}${photo.url}`}
                      alt={`Diary Images`}
                      className=" h-[300px] w-full cursor-pointer object-cover"
                    />
                    <div className="flex items-center justify-end px-2 text-[10px] font-medium text-default-400">
                      {index + 1} / {diary.photos?.length}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* 날짜 & 제목 & tags */}
            <section className="mx-5">
              <h1 className="mb-1 text-base font-semibold text-white">
                {'"' + diary.title + '"'}
              </h1>

              {/* TODO emotion tags 수정 */}
              {diary.feelings
                ?.split(",")
                .slice(0, showAllTags ? diary.feelings?.split(",").length : 3)
                .map((feeling: string, index: number) => (
                  <div
                    key={index}
                    className="border-1 mb-2 mr-3 inline-block rounded-full border-default-400 bg-default-300 px-2 py-0.5 text-sm font-semibold text-default-800"
                  >
                    {feeling}
                  </div>
                ))}
              {!showAllTags && diary.feelings?.split(",").length > 3 && (
                <div
                  className="border-1 mr-3 mt-1 inline-block cursor-pointer rounded-full border-default-400 bg-default-300 px-2 py-0.5 text-sm font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2"
                  onClick={handleShowMoreTags}
                >
                  +{diary.feelings?.split(",").length - 3}
                </div>
              )}
            </section>

            {/* 일기 내용 */}
            <section
              className={
                diary.photos
                  ? `mx-5 max-h-[300px] flex-1 overflow-scroll scrollbar-hide`
                  : `mx-5 mb-3 max-h-[500px] flex-1 overflow-scroll scrollbar-hide`
              }
            >
              <div className="mb-5 text-sm font-light text-white">
                {diary.body}
              </div>

              <div className="mb-5 flex w-full items-center justify-end">
                <WeatherIcons
                  weatherId={diary.weatherId}
                  className="mr-2 h-4 w-4 fill-current text-white"
                />

                <span className="font-base text-xs text-white">
                  {diary.weather}
                </span>
              </div>
            </section>

            {/* 필름 디자인 */}
            <div className="flex w-full gap-5 px-1 ">
              {Array.from({ length: 16 }, (_, index) => (
                <div
                  key={index}
                  className="h-3 w-2 rounded-[2px] bg-default-500"
                ></div>
              ))}
            </div>
            <div className="flex justify-between px-2 text-[10px] text-default-700 ">
              <div className="flex gap-1">
                <Film className="h-3 w-3" />
                <div>7A</div>
              </div>
              <div>8</div>
              <div className="flex gap-1">
                <Film className="h-3 w-3" />
                <div>9A</div>
              </div>
              <div>10</div>
              <div className="flex gap-1">
                <Film className="h-3 w-3" />
                <div>11A</div>
              </div>
            </div>
          </article>
        )}
      </Box>
    </Modal>
  );
}
