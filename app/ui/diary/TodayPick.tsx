/* eslint-disable @next/next/no-img-element */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function TodayPick({ diaryData }: any) {
  // 모든 필요한 데이터의 유무에 따라 렌더링 여부 결정
  const hasData =
    diaryData &&
    diaryData.todayPickImage &&
    diaryData.todayPickImage.length > 0 &&
    diaryData.todayPickTitle &&
    diaryData.todayPickContributors &&
    diaryData.todayPickDate;

  if (!hasData) {
    return null;
  }

  const picks = diaryData
    ? [
        {
          imageUrl: `${process.env.NEXT_PUBLIC_BUCKET_URL}${diaryData.todayPickImage[0].url}`,
          title: diaryData.todayPickTitle,
          contributors: diaryData.todayPickContributors,
          date: diaryData.todayPickDate,
        },
      ]
    : [];

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
                    {pick.contributors}
                  </div>
                  <div className=" text-sm font-normal text-white">
                    {pick.date}
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
