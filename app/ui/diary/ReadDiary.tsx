/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 사진 배경 수정

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import Background from "@/public/diary/Background";
import Yellow from "@/public/diary/Yellow";
import RememberIcon from "@/public/me/RememberIcon";
import Remembered from "@/public/diary/Remembered";

import { getDiaryDate } from "@/util/date";
import WeatherIcons from "./WeatherIcons";
import { updateDiaryRemember } from "@/store/api";
import TagSection from "./TagSection";

export default function ReadDiary({ date, diaryData }: any) {
  // remembered
  const [isRemember, setIsRemember] = useState(diaryData.remember);

  const { mutate: diaryRememberMutate } = useMutation({
    mutationKey: ["updateDiaryRemember"],
    mutationFn: updateDiaryRemember,
    onSuccess: (data) => {
      setIsRemember(data.remember);
    },
  });

  /* Remember 버튼 클릭 시 */
  const handleRemember = () => {
    if (isRemember) {
      diaryRememberMutate({ diaryId: diaryData.id, remember: false });
    } else if (!isRemember) {
      diaryRememberMutate({ diaryId: diaryData.id, remember: true });
    }
  };

  /* feelings 문자열을 배열로 변환 */
  const feelingsTags = diaryData ? diaryData.feelings.split(" ") : [];

  return (
    <article className="relative">
      <section className="mb-5 mt-5 flex w-full min-w-[360px] max-w-[600px] flex-col rounded ">
        {/* <div className="mb-[420px]"> */}
        {/* <Background className="absolute left-0 top-0 z-10 fill-current text-default-400" />
          <Background className="absolute left-2 top-2 z-10 fill-current text-default-300" /> */}
        {/* <Background
            className="absolute left-4 right-0 top-4 z-20"
            imageUrl="https://i.pinimg.com/564x/18/7e/66/187e66dd64de9f323ed7b7261fd29fc8.jpg"
          /> */}

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
            {isRemember ? (
              <Remembered
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={handleRemember}
              />
            ) : (
              <RememberIcon
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={handleRemember}
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
            <WeatherIcons weatherId={diaryData.weatherId} />
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
