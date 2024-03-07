"use client";

import ImageIcon from "@/public/home/ImageIcon";
import RememberIcon from "@/public/me/RememberIcon";
import { IDiary, diaryListState, settingState } from "@/store/atoms";
import dayjs from "dayjs";
import Link from "next/link";
import { useRecoilState } from "recoil";
import WeatherIcons from "../diary/WeatherIcons";

export default function HomeDiary() {
  const [{ date }, setSetting] = useRecoilState(settingState);
  const [diaries, setDiaries] = useRecoilState(diaryListState);
  const filteredDiaries = diaries.filter(
    (diary: IDiary) => diary.date === dayjs(date).format("YYYY-MM-DD"),
  );

  const diaryOfDay = (
    filteredDiaries.length > 0 ? filteredDiaries[0] : null
  ) as IDiary | null;
  return (
    <section className="mt-4">
      <Link
        href={
          diaryOfDay
            ? `/${dayjs(date).format("YYYY-MM-DD")}/diary`
            : `/${dayjs(date).format("YYYY-MM-DD")}/diary/create`
        }
      >
        <div className="group flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-900">
          {diaryOfDay ? (
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="text-3xl font-semibold text-default-900 group-hover:text-default-100">
                  Diary
                </span>
                <div className="flex gap-1">
                  {diaryOfDay.remember && (
                    <RememberIcon className="h-5 w-5 fill-current" />
                  )}
                  {diaryOfDay.photos?.length > 0 && (
                    <ImageIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-center p-5">
                <div className="flex items-center justify-between gap-5 font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 text-2xl">
                      <span>{dayjs(date).format("MMMM")}</span>
                      <span>{dayjs(date).format("DD")},</span>
                    </div>
                    <span>{dayjs(date).format("YYYY")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <WeatherIcons weatherId={diaryOfDay.weatherId} />
                    <span>{diaryOfDay.weather}</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="flex justify-center">
                    {diaryOfDay.title}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="group flex flex-col">
              <div>
                <span className="text-3xl font-semibold text-default-900 group-hover:text-default-100">
                  Diary
                </span>
                <div className="flex justify-center">
                  <span className="text-xl">Click to write Diary</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
}
