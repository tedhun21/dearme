/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import Yellow from "@/public/diary/Yellow";
import RememberIcon from "@/public/me/RememberIcon";
import Remembered from "@/public/diary/Remembered";

import { getDiaryDate } from "@/util/date";
import WeatherIcons from "./WeatherIcons";
import { updateDiaryRemember } from "@/store/api";
import TagSection from "./TagSection";

export default function ReadDiary({ date, diaryData }: any) {
  const queryClient = useQueryClient();

  const { mutate: diaryRememberMutate } = useMutation({
    mutationKey: ["updateDiaryRemember"],
    mutationFn: updateDiaryRemember,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["getDiaryForDay"] });

      const prevDiary = queryClient.getQueryData(["getDiaryForDay"]);

      queryClient.setQueryData(["getDiaryForDay"], (old: any) => ({
        ...old,
        remember: !old.remember,
      }));

      return { prevDiary };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getDiaryForDay"], context?.prevDiary);
    },
  });

  /* Remember 버튼 클릭 시 */
  const handleRemember = () => {
    diaryRememberMutate({
      diaryId: diaryData.id,
      remember: true,
    });
  };

  /* feelings 문자열을 배열로 변환 */
  const feelingsTags = diaryData ? diaryData.feelings?.split(" ") : [];

  return (
    <article className="relative">
      <section className="mb-5 mt-5 flex w-full min-w-[360px] max-w-[600px] flex-col rounded ">
        {/* 이미지 있을 경우에만 (images &&)*/}
        {diaryData && diaryData.photos && diaryData.photos.length > 0 && (
          <div>
            <Swiper
              effect={"cards"}
              cardsEffect={{
                perSlideOffset: 3,
                perSlideRotate: 3,
                rotate: true,
                slideShadows: false,
              }}
              grabCursor={true}
              modules={[EffectCards]}
              scrollbar={{ draggable: true }}
              mousewheel={true}
              className="h-96 w-11/12"
            >
              {diaryData &&
                diaryData.photos.map((photo: any) => (
                  <SwiperSlide
                    key={photo.id}
                    className="flex items-center justify-center rounded-lg"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${photo.url}`}
                      alt={`Diary Image ${photo.id}`}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* 이미지 개수 -> text */}
            <Yellow
              className="top-70 absolute right-10 z-30 h-10 w-10 -translate-y-1/2 transform fill-current text-default-900"
              text={`+${diaryData.photos.length}`}
            />
          </div>
        )}

        <div className="p-10">
          <div className="mb-3 mt-4 flex items-center">
            {/* 일기의 Remember */}
            {diaryData.remember ? (
              <Remembered
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={() => handleRemember()}
              />
            ) : (
              <RememberIcon
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={() => handleRemember()}
              />
            )}
            {/* 일기의 날짜 */}
            <h1 className="text-md font-semibold">{getDiaryDate(date)}</h1>
          </div>
          {/* 일기의 제목 */}
          <h1 className="mb-3 text-lg font-bold">
            {diaryData ? diaryData.title : ""}
          </h1>
          {/* 일기의 내용 */}
          <div className="mb-5 text-base font-medium text-default-700">
            {diaryData ? diaryData.body : ""}
          </div>
          {/* 일기의 날씨정보 */}
          <div className="flex w-full items-center justify-end gap-1">
            <WeatherIcons
              weatherId={diaryData.weatherId}
              className="h-4 w-4 fill-current text-black"
            />
            <span className="text-sm font-medium">{diaryData.weather}</span>
          </div>
        </div>
      </section>

      {/* 태그 섹션 */}
      <section className="mb-5 border-b-2 border-t-2 border-default-300 bg-default-200 pb-4 pl-10 pr-10 pt-4 ">
        <TagSection feelingsTags={feelingsTags} />
      </section>
    </article>
  );
}
