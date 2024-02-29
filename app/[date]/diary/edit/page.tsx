"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
import { getDiaryDate } from "@/util/date";
import { getDiaryForDay } from "@/store/api";

export default function Edit() {
  const params = useParams<any>();
  const [diaryData, setDiaryData] = useState({
    mood: "",
    emotionTags: [],
    companions: [],
    photo: [],
    title: "",
    content: "",
    weather: "",
    weatherId: "",
    todayPick: {
      title: "",
      contributors: "",
      date: "",
      id: "",
      imageFile: [],
    },
  });

  // 최상단 날짜 표시
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (params.date) {
      const newFormat = getDiaryDate(params.date);
      setFormattedDate(newFormat);
    }
  }, [params.date]);

  // FormData 객체 생성
  const formData = new FormData();

  const mapCompanionToServerValue = (companion: string) => {
    const mapping: { [key: string]: string } = {
      가족: "FAMILY",
      친구: "FRIEND",
      연인: "LOVER",
      지인: "ACQUAINTANCE",
      안만남: "ALONE",
      FAMILY: "가족",
      FRIEND: "친구",
      LOVER: "연인",
      ACQUAINTANCE: "지인",
      ALONE: "안만남",
    };
    return mapping[companion] || companion;
  };

  const { data: fetchedDiaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date: params.date }),
  });

  useEffect(() => {
    if (fetchedDiaryData) {
      const companionsArray =
        typeof fetchedDiaryData.companions === "string"
          ? [fetchedDiaryData.companions]
          : fetchedDiaryData.companions;

      const comapionsStr = companionsArray
        .map(mapCompanionToServerValue)
        .join(",");

      const updatedDiaryData = {
        ...fetchedDiaryData,
        title: fetchedDiaryData.title,
        content: fetchedDiaryData.body,
        mood: fetchedDiaryData.mood,
        emotionTags: fetchedDiaryData.feelings,
        companions: comapionsStr,
        weather: fetchedDiaryData.weather,
        weatherId: fetchedDiaryData.weatherId.toString(),
        photo: fetchedDiaryData.photos,
        todayPick: {
          title: fetchedDiaryData.todayPickTitle,
          contributors: fetchedDiaryData.todayPickContributors,
          date: fetchedDiaryData.todayPickDate,
          id: fetchedDiaryData.todayPickId,
          imageFile: fetchedDiaryData.todayPickImage,
        },
      };
      setDiaryData(updatedDiaryData);
    }
  }, [fetchedDiaryData]);

  console.log("수정하기 위한 데이터:", diaryData);

  // 일기 데이터 Submit
  const handleSubmitDiary = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 폼 제출의 기본 동작 방지

    const jwtToken = getCookie("access_token");
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return;
    }

    console.log("UploadTodayPick에서 todayPickData:", diaryData.todayPick);

    // feelings와 companions 배열을 콤마로 구분된 문자열로 변환
    const todaypickIdStr = diaryData.todayPick.id.toString();
    const companionsStr = diaryData.companions
      .map(mapCompanionToServerValue)
      .join(",");

    const data = {
      title: diaryData.title,
      body: diaryData.content,
      mood: diaryData.mood,
      feelings: diaryData.emotionTags, // // 프론트에서는 emotionTags, 서버에서는 feelings로 처리
      companions: companionsStr,
      weather: diaryData.weather,
      weatherId: diaryData.weatherId.toString(),
      remember: false, // 기본값 false 등록
      todayPickTitle: diaryData.todayPick.title,
      todayPickContributors: diaryData.todayPick.contributors,
      todayPickDate: diaryData.todayPick.date,
      todayPickId: todaypickIdStr,
    };
    formData.append("data", JSON.stringify(data));

    // `photos` 파일 추가
    diaryData.photo.forEach((file, index) => {
      formData.append(`photos`, file); // 인덱스 없이 photos로 모든 파일 추가
    });

    // `todayPickImage` 파일 추가
    if (diaryData.todayPick.imageFile) {
      // 이미지가 단일 파일인 경우 배열로 변환
      const images = Array.isArray(diaryData.todayPick.imageFile)
        ? diaryData.todayPick.imageFile
        : [diaryData.todayPick.imageFile];
      images.forEach((file) => {
        formData.append(`todayPickImage`, file); // 배열의 모든 이미지를 추가
      });
    }

    // diaryData 상태 로깅
    console.log("제출될 일기 데이터:", diaryData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/diaries?date=${params.date}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      console.log("일기 생성 성공", response.data);
      window.location.href = `/${params.date}/diary`;
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
            updatedMood={diaryData.mood}
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
            updatedEmotionTags={diaryData.emotionTags as any}
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
            updatedCompanions={diaryData.companions as any}
            onSelectCompanion={(companions: any) =>
              setDiaryData({ ...diaryData, companions })
            }
          />
        </section>
        <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
          <DiaryCreateModal
            updatedDiaryData={{
              title: diaryData.title as any,
              content: diaryData.content as any,
              weather: diaryData.weather as any,
              weatherId: diaryData.weatherId as any,
            }}
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
            updatedPhotos={diaryData.photo as any}
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
            updatedTodayPick={diaryData.todayPick as any}
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
            Update Diary
          </Button>
        </section>
      </article>
    </main>
  );
}
