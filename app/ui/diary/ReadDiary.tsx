/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 사진 배경 수정

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

// import dayjs from "dayjs";

import Background from "@/public/diary/Background";
import Yellow from "@/public/diary/Yellow";
import RememberIcon from "@/public/me/RememberIcon";
import Remembered from "@/public/diary/Remembered";

import WeatherCloudy from "@/public/diary/WeatherCloudy";

export default function ReadDiary() {
  // 임시 사진 (지우기)
  const images = [
    "https://i.pinimg.com/564x/e1/4d/a4/e14da4a1e8bacd710080d446d87c4613.jpg",
    "https://i.pinimg.com/736x/bf/a4/f4/bfa4f449997e7d70d693c748a81daf62.jpg",
    "https://i.pinimg.com/564x/18/7e/66/187e66dd64de9f323ed7b7261fd29fc8.jpg",
  ];

  // 임시 태그 (지우기)
  const tags = ["#신나는", "#설레는", "#행복한", "#기대되는", "#의욕적인"];

  // 날짜
  const params = useParams();
  const date = params.date;

  const formatDate = (dateString: any): any => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // remembered
  const [remembered, setRemembered] = useState(false);

  const handleRemeber = () => {
    setRemembered(!remembered);
  };

  // tags
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShowMoreTags = () => {
    setShowAllTags(true);
  };

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
            className=" h-96 w-11/12 "
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center rounded-lg"
              >
                <img
                  src={image}
                  alt={`Diary Image ${index}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 이미지 개수 -> text */}
          <Yellow
            className="top-70 absolute right-10 z-30 h-10 w-10 -translate-y-1/2 transform fill-current text-default-900"
            text="+3"
          />
        </div>

        <div className="p-10">
          <div className="mb-3 mt-4 flex items-center">
            {remembered ? (
              <Remembered
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={handleRemeber}
              />
            ) : (
              <RememberIcon
                className="mr-2 h-5 w-5 cursor-pointer fill-current"
                onClick={handleRemeber}
              />
            )}
            <h1 className="text-md  font-semibold">{formatDate(date)}</h1>
          </div>

          <h1 className="mb-3 text-lg font-bold">
            “새로운 시작, 일기 앱 개발의 설렘”
          </h1>
          <div className="mb-5 text-base font-medium text-default-700">
            오늘은 제 생애 첫 일기 앱 개발을 시작했습니다. 이 앱을 통해
            사용자들이 자신만의 소중한 추억을 기록하고 공유하는 경험을 제공할 수
            있기를 기대하며, 새로운 도전에 설레는 마음을 가지고
            있습니다.아침부터 밤 늦게까지 코드를 작성하며, 제가 만든 앱에 첫
            번째 일기를 작성하는 그 순간을 상상했습니다. 때로는 알 수 없는
            오류에 힘들게 하였지만, 그럴 때마다 새로운 해결책을 찾아내는 것에 큰
            즐거움을 느꼈습니다. 이런 과정들이 모여 제 생애 첫 앱을 완성하는 큰
            발걸음이 될 것이라고 믿습니다.
          </div>

          <div className="flex w-full items-center justify-end">
            <WeatherCloudy className="mr-2 h-5 w-5 fill-current" />
            <span className="text-sm font-medium">서울 마포구 , 9.2°C</span>
          </div>
        </div>
      </section>

      {/* Tag -> map으로 돌리기 */}
      <section className="mb-5 bg-default-100 pb-4 pl-10 pr-10 pt-4 ">
        {tags.slice(0, showAllTags ? tags.length : 3).map((tagItem, index) => (
          <div
            key={index}
            className="mr-3 mt-1 inline-block rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800"
          >
            {tagItem}
          </div>
        ))}
        {!showAllTags && tags.length > 3 && (
          <div
            className="mr-3 mt-1 inline-block cursor-pointer rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2"
            onClick={handleShowMoreTags}
          >
            +{tags.length - 3}
          </div>
        )}
      </section>
    </article>
  );
}
