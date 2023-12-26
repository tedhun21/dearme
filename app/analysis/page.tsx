"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Option, Select } from "@mui/joy";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Header from "../ui/header";
import LeftButton from "@/public/analysis/LeftButton";
import RightButton from "@/public/analysis/RightButton";

const tagData = [
  { id: 4, type: "tag", body: "가족", count: 7 },
  { id: 2, type: "people", body: "애인", count: 5 },
  { id: 1, body: "지인", count: 4 },
  { id: 3, body: "친구", count: 3 },
  { id: 5, body: "안 만남", count: 1 },
];

const chartFeelingData = {
  options: {
    chart: {
      type: "line",
      fontFamily: "inherit",
    },
    xaxis: {
      categories: [
        "12/01",
        "12/06",
        "12/06",
        "12/11",
        "12/16",
        "12/21",
        "12/26",
      ],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70],
    },
  ],
};

const chartSleepData = {
  series: [
    {
      data: [
        {
          x: "12/01",
          y: [new Date().setHours(7), new Date().setHours(23)],
        },
        { x: "12/06", y: [new Date().setHours(7.5), new Date().setHours(23)] },
        { x: "12/11", y: [new Date().setHours(8), new Date().setHours(23)] },
        { x: "12/16", y: [new Date().setHours(7), new Date().setHours(23)] },
        { x: "12/21", y: [new Date().setHours(7), new Date().setHours(23)] },
        { x: "12/26", y: [new Date().setHours(7), new Date().setHours(23)] },
        { x: "12/31", y: [new Date().setHours(7), new Date().setHours(23)] },
      ],
    },
  ],
  options: {
    chart: { type: "rangeBar", zoom: { enabled: false } },
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: 3,
        dumbbellColors: [["#008FFB", "#00E396"]],
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      customLegendItems: ["기상시각", "취침시각"],
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["#00E396"],
        inverseColors: true,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      tickPlacement: "on",
    },
    yaxis: {
      type: "datetime",
      formatter: (value) => {
        console.log(value);
        return value;
      },
    },
  },
};

export default function Analysis() {
  const [date, setDate] = useState<Dayjs | null>();
  const [tag, setTag] = useState("전체");
  const [isMonth, setIsMonth] = useState(false);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="relative z-0 flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <div className="absolute -z-10 h-[600px] w-full rounded-b-[100px] bg-default-800"></div>
        <Header />
        <article className="flex flex-col gap-4 px-5">
          <section className="flex flex-col gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs()}
                views={["year", "month"]}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  width: "50%",
                  "& .MuiInputBase-root": {
                    border: "none",
                    color: "#fff",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    fontSize: "20px",
                  },
                }}
              />
            </LocalizationProvider>
            <div>
              <div className="group flex translate-x-1 rounded-2xl bg-default-400 p-1">
                <button
                  className={clsx(
                    "flex-1 p-2 font-semibold",
                    isMonth
                      ? "rounded-2xl bg-default-300"
                      : "text-default-500 hover:text-black",
                  )}
                  onClick={() => setIsMonth(true)}
                >
                  Month
                </button>
                <button
                  className={clsx(
                    "flex-1 p-2 font-semibold",
                    !isMonth
                      ? "rounded-2xl bg-default-300"
                      : "text-default-500 hover:text-black",
                  )}
                  onClick={() => setIsMonth(false)}
                >
                  Year
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center rounded-2xl bg-default-200 shadow-2xl">
            <div className="pb-4 pt-6 font-bold text-default-900">
              기분 분석
            </div>
            <div className="w-full bg-default-100">
              <Chart
                options={chartFeelingData.options}
                series={chartFeelingData.series}
                type="line"
                width="100%"
                height="auto"
              />
            </div>
            <div>
              <div>pill graph</div>
              <div>기분 20%</div>
            </div>
          </section>
          <section>
            <h1 className="text-xl font-semibold">태그 순위</h1>
            <div className="flex items-center justify-between">
              <div className="text-default-700">
                많이 기록한 태그와 기록 횟수를 볼 수 있어요
              </div>
              <Select value={tag} onChange={(e, newValue) => setTag(newValue)}>
                <Option value="전체">전체</Option>
                <Option value="사람">사람</Option>
                <Option value="감정">감정</Option>
              </Select>
            </div>
            <div className="rounded-2xl bg-default-100 p-5">
              <div className="mb-4 flex justify-between border-b-2 border-default-400">
                <div>RANK</div>
                <div>COUNT</div>
              </div>
              <div className="flex flex-col gap-2">
                {tagData.map((data, index) => (
                  <div key={data.id} className="flex justify-between">
                    <div className="flex h-8 w-8 items-center justify-center bg-gray-300">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div>{data.body}</div>
                    <div className="flex">
                      <div>{data.count}</div>
                      <div className="flex">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 border-t-2 border-default-400 pt-3">
                <LeftButton className="h-5 w-5 fill-current text-default-500 hover:text-default-700" />
                <RightButton className="h-5 w-5 fill-current text-default-500 hover:text-default-700" />
              </div>
            </div>
          </section>
          <section>
            <h1 className="text-xl font-semibold">수면 분석</h1>
            <div className="text-default-700">
              수면 기록에 대한 통계와 그래프를 볼 수 있어요
            </div>
            <div className="flex justify-around gap-2 rounded-2xl bg-default-100 p-5">
              <div className="flex flex-col items-center">
                <div className="text-xs">오전</div>
                <div className="text-[28px] font-semibold">07:00</div>
                <div className="text-xs">평균기상시각</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs">오후</div>
                <div className="text-[28px] font-semibold">11:00</div>
                <div className="text-xs">평균취침시각</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs">시간</div>
                <div className="text-[28px] font-semibold">9:00</div>
                <div className="text-xs">평균기상시간</div>
              </div>
            </div>
            <Chart
              options={chartSleepData.options}
              series={chartSleepData.series}
              type="rangeBar"
              width="100%"
              height="auto"
            />
          </section>
        </article>
      </div>
    </main>
  );
}
