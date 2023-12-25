"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Option, Select } from "@mui/joy";
import Chart from "react-apexcharts";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Header from "../ui/header";

const tagData = [{ id: 4, body: "가족", count: 7 }];

const chartData = {
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

export default function Analysis() {
  const [date, setDate] = useState<Dayjs | null>();
  const [tag, setTag] = useState("전체");
  const [isMonth, setIsMonth] = useState(false);

  console.log(tag);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="relative z-0 flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <div className="absolute -z-10 h-2/3 w-full rounded-b-[100px] bg-default-800"></div>
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
            <div>기분 분석</div>
            <div className="w-full bg-default-100">
              <Chart
                options={chartData.options}
                series={chartData.series}
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
              <div>많이 기록한 태그와 기록 횟수를 볼 수 있어요</div>
              <Select value={tag} onChange={(e, newValue) => setTag(newValue)}>
                <Option value="전체">전체</Option>
                <Option value="사람">사람</Option>
                <Option value="감정">감정</Option>
              </Select>
            </div>
            <div className="p-2] rounded-2xl bg-default-100">
              <div className="flex justify-between border-b-2 border-default-400">
                <div>RANK</div>
                <div>COUNT</div>
              </div>
              <div className="flex justify-between">
                <div className="flex h-8 w-8 items-center justify-center bg-gray-300">
                  <span className="font-bold">1</span>
                </div>
                <div>가족</div>
                <div className="flex">
                  <div>7</div>
                  <div className="flex">
                    <div></div>
                    <div>2</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section></section>
        </article>
      </div>
    </main>
  );
}
