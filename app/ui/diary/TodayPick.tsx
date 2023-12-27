/* eslint-disable @next/next/no-img-element */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function TodayPick() {
  // 임시 picks (지우기)
  const picks = [
    {
      imageUrl:
        "https://i.namu.wiki/i/UvSjCQ9Ip4eNYF45gYO1OmGHQYkngAnE2ztZIgMHJBHc1PffPPGQ0OfucZYYC-liHCuVi0__4E2AK6usStPsuw.webp",
      title: "사랑한다고 말해줘",
      figures: "정우성 | 신현빈",
      details: "(2023 - 2024)",
    },
    {
      imageUrl: "https://image.yes24.com/goods/96087459/XL",
      title: "부자의 그릇",
      figures: "이즈미 마사토",
      details: "(다산북스)",
    },
    {
      imageUrl:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/before-sunrise-poster-george-wilson.jpg",
      title: "Before sunrise",
      figures: "Ethan Hawke | Julie Delpy",
      details: "Richard Linklater",
    },
  ];

  return (
    <div>
      <article className="mb-3 rounded bg-default-800">
        <section className="p-5">
          <h1 className="mb-3 text-lg font-semibold text-white">오늘의 PICK</h1>
          <div className="flex overflow-x-scroll whitespace-nowrap  scrollbar-hide">
            {picks.map((pick, index) => (
              <div
                key={index}
                className="mr-10 flex flex-shrink-0 flex-col justify-center"
              >
                <img
                  src={pick.imageUrl}
                  alt="Today's Pick"
                  className="mb-3 h-[320px] w-[220px] object-cover"
                />
                <div className="flex flex-col">
                  <div className=" text-base font-semibold text-white">
                    {pick.title}
                  </div>
                  <div className=" text-sm font-normal text-white">
                    {pick.figures}{" "}
                  </div>
                  <div className=" text-sm font-normal text-white">
                    {pick.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
