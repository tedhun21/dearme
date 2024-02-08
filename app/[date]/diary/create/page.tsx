"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import Button from "@mui/joy/Button";

import Exit from "@/public/diary/Exit";
import DiaryCreateModal from "@/app/ui/diary/DiaryCreateModal";
import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";
import { getCookie } from "@/util/tokenCookie";

export default function Create() {
  const params = useParams();
  const [formattedDate, setFormattedDate] = useState("");
  const [diaryData, setDiaryData] = useState({
    mood: "",
    emotionTags: [],
    companions: [],
    photo: [],
    todayPick: "",
  });

  // 최상단 날짜 표시
  useEffect(() => {
    if (params.date) {
      // URL에서 받은 날짜 파싱
      const [year, month, day] = params.date
        .split("-")
        .map((num: any) => parseInt(num, 10));

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

  // 일기 데이터 Submit
  const handleSubmitDiary = async () => {
    const jwtToken = getCookie("access_token");
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      console.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/diaries?date=${params.date}`,
        {
          data: diaryData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      console.log(response.data);
      console.log("일기 생성 성공", response.data);
    } catch (error) {
      console.error("일기 생성 실패", error);
    }
  };

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
          <ChooseMood
            onMoodSelect={(mood: any) => setDiaryData({ ...diaryData, mood })}
          />
          <h3 className="flex justify-center text-sm font-medium text-gray-400">
            오늘 하루는 어땠나요?
          </h3>
        </section>
        <section className="flex flex-col bg-default-200">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            감정태그
          </h2>
          <ChooseEmotionTags
            onTagSelect={(tags: any) =>
              setDiaryData({ ...diaryData, emotionTags: tags })
            }
          />
        </section>
        <section className="flex flex-col bg-default-300">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            함께한 사람
          </h2>
          <ChooseCompanions
            onSelectCompanion={(companions: any) =>
              setDiaryData({ ...diaryData, companions })
            }
          />
        </section>
        <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
          <DiaryCreateModal
            onSubmit={(modalData: any) => {
              console.log("onSubmit called with data:", modalData);
              setDiaryData({ ...diaryData, ...modalData });
            }}
          />
        </section>
        <section className="flex flex-col bg-default-400">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            오늘의 사진
          </h2>
          <UploadPhoto
            onPhotosChange={(photos: any) =>
              setDiaryData({ ...diaryData, photo: photos })
            }
          />
        </section>
        <section className="flex flex-col bg-default-800">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
            오늘의 PICK
          </h2>
          <UploadTodayPick
            onSubmit={(todayPickData: any) => {
              setDiaryData({ ...diaryData, todayPick: todayPickData });
            }}
          />
        </section>
        <section className="mx-4 my-4 flex justify-center">
          <Button
            type="submit"
            variant="outlined"
            onClick={handleSubmitDiary}
            className="rounded-[20px] border-2 border-solid border-default-800 px-32 py-2 text-default-800 hover:bg-default-300"
          >
            Create Diary
          </Button>
        </section>
      </article>
    </main>
  );
}
