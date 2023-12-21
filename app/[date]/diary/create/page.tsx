"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Exit from "@/public/diary/Exit";
import HappyEmoji from "@/public/diary/HappyEmoji";
import JoyfulEmoji from "@/public/diary/JoyfulEmoji";
import NeutralEmoji from "@/public/diary/NeutralEmoji";
import SadEmoji from "@/public/diary/SadEmoji";
import UnhappyEmoji from "@/public/diary/UnhappyEmoji";
import Tags from "@/public/diary/Tags";
import Companions from "@/public/diary/Companions";
import CirclePlus from "@/public/diary/CirclePlus";
import Weather from "@/public/diary/Weather";
import PhotoIcon from "@/public/diary/PhotoIcon";
import BlackPlus from "@/public/diary/BlackPlus";
import DiaryCreateModal from "@/public/diary/DiaryCreateModal";

export default function Create() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [formattedDate, setFormattedDate] = useState("");

  const tags = [
    "#상쾌한",
    "#피곤한",
    "#행복한",
    "#의욕적인",
    "#짜증나는",
    "#외로운",
    "#신나는",
    "#뿌듯한",
    "#불안한",
    "#우울한",
    "#설레는",
    "#편안한",
    "#화남",
    "#슬픈",
    "#기대되는",
    "#부담되는",
  ];

  const companions = ["가족", "연인", "친구", "지인", "안만남"];

  // 각 태그를 클릭했을 때의 핸들러
  const handleTagClick = (tag) => {
    console.log("Clicked on tag:", tag);
    // 여기서 태그 클릭에 대한 로직을 추가할 수 있습니다.
  };

  // 최상단 날짜 표시
  useEffect(() => {
    if (params.date) {
      // URL에서 받은 날짜 파싱
      const [year, month, day] = params.date
        .split("-")
        .map((num) => parseInt(num, 10));

      // Date 객체 생성
      const date = new Date(year, month - 1, day);

      // 요일 배열
      const days = ["일", "월", "화", "수", "목", "금", "토"];

      // 날짜 형식 재구성
      const newFormat = `${date.getFullYear()}. ${
        date.getMonth() + 1
      }. ${date.getDate()}. (${days[date.getDay()]})`;

      setFormattedDate(newFormat);
    }
  }, [params]);

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
          {formattedDate}
          <div>
            <Exit />
          </div>
        </section>
        <section className="flex flex-col gap-4 bg-default-200">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            기분
          </h2>
          <span className="flex items-center justify-between px-20">
            <JoyfulEmoji />
            <HappyEmoji />
            <NeutralEmoji />
            <UnhappyEmoji />
            <SadEmoji />
          </span>
          <h3 className="flex justify-center text-sm font-medium text-gray-400">
            오늘 하루는 어땠나요?
          </h3>
        </section>
        <section className="flex flex-col bg-default-200">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            감정태그
          </h2>
          <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
            {tags.map((tag) => (
              <Tags key={tag} text={tag} onClick={() => handleTagClick(tag)} />
            ))}
          </span>
        </section>
        <section className="flex flex-col bg-default-300">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            함께한 사람
          </h2>
          <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
            {companions.map((tag) => (
              <Companions
                key={tag}
                text={tag}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </span>
        </section>
        <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
          <DiaryCreateModal />
        </section>
        <section className="flex flex-col bg-default-300">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            수면
          </h2>
          <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
            <button className="w-full rounded-lg bg-default-100 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
              수면을 기록해주세요
            </button>
          </span>
        </section>
        <section className="flex flex-col bg-default-400">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            오늘의 사진
          </h2>
          <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
            <button className="w-full rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
              <span className="mb-2 flex justify-center">
                <PhotoIcon />
              </span>
              사진을 등록해주세요
              <h3 className="flex justify-center text-xs font-medium text-gray-400">
                (최대 3장)
              </h3>
            </button>
          </span>
        </section>
        <section className="flex flex-col bg-default-800">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
            오늘의 PICK
          </h2>
          <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
            <button className="w-full rounded-lg border-2 border-dashed border-black bg-default-800 py-24 text-base font-medium text-gray-400 hover:bg-gray-300">
              <span className="mb-2 flex justify-center">
                <BlackPlus />
              </span>
              오늘의 문화생활을
              <h3 className="flex justify-center text-base font-medium text-gray-400">
                기록해봐요!
              </h3>
            </button>
          </span>
        </section>
      </article>
    </main>
  );
}
