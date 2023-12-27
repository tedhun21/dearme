"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import DiaryFrontCoverHead from "@/public/diary/DiaryFrontCoverHead";
import DiaryFrontCoverMark from "@/public/diary/DiaryFrontCoverMark";

export default function FrontCover() {
  const [formattedDate, setFormattedDate] = useState("");
  const params = useParams();

  // 최상단 날짜 표시
  useEffect(() => {
    if (params.date) {
      // URL에서 받은 날짜 파싱
      const [year, month, day] = params.date
        .split("-")
        .map((num) => parseInt(num, 10));

      // Date 객체 생성
      const date = new Date(year, month - 1, day);

      // 날짜 형식 재구성 (연도 생략)
      const newFormat = `${date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase()} ${String(day).padStart(2, "0")}`;

      setFormattedDate(newFormat);
    }
  }, [params]);

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black shadow-lg">
        <header className="flex flex-col justify-center pb-20 pt-10 text-8xl font-bold leading-none tracking-tighter text-white">
          <span className="flex justify-center">
            <DiaryFrontCoverHead />
          </span>
          <h1 className="flex justify-center">{formattedDate}</h1>
        </header>
        <section className="mt-60 flex flex-col items-center justify-center">
          <h4 className="mb-2 flex justify-center text-xs font-normal leading-none tracking-tighter text-white">
            M No.243-001
          </h4>
          <DiaryFrontCoverMark />
          <section className="mt-3 flex justify-center">
            <div className="flex flex-col">
              <h4 className="mb-2 mr-4 flex justify-end text-xs font-medium leading-none tracking-tighter text-white">
                NUEVO MASTER EN
              </h4>
              <h4 className="mb-2 mr-4 flex justify-end text-xs font-medium leading-none tracking-tighter text-white">
                STORYTELLING PARA MARCAS
              </h4>
            </div>
            <div className="flex flex-col">
              <h4 className="mb-2 flex justify-start text-xs font-medium leading-none tracking-tighter text-white">
                ESCAC ESCOLA SUPERIOR DE CINEMA
              </h4>
              <h4 className="mb-2 flex justify-start text-xs font-medium leading-none tracking-tighter text-white">
                I AUDIOVISUALS DE CATALUNYA
              </h4>
              <span className="flex justify-start text-xl font-medium leading-none tracking-tighter text-white">
                ®
              </span>
            </div>
          </section>
        </section>
      </article>
    </main>
  );
}
