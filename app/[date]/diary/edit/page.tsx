"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "@mui/joy/Button";

import Exit from "@/public/diary/Exit";
import HappyEmoji from "@/public/diary/HappyEmoji";
import JoyfulEmoji from "@/public/diary/JoyfulEmoji";
import NeutralEmoji from "@/public/diary/NeutralEmoji";
import SadEmoji from "@/public/diary/SadEmoji";
import UnhappyEmoji from "@/public/diary/UnhappyEmoji";
import Tags from "@/public/diary/Tags";

import { getCookie } from "@/util/tokenCookie";
import { getDiaryDate } from "@/util/date";
import { getDiaryForDay, updateDiary } from "@/store/api";

export default function Edit() {
  const params = useParams<any>();
  const methods = useForm();
  const { register, setValue, watch } = methods;

  // 통신된 데이터 기본값 정의
  const { isSuccess, data: fetchedDiaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date: params.date }),
  });

  useEffect(() => {
    if (isSuccess) {
      const { setValue } = methods;
      setValue("title", fetchedDiaryData.title ?? "");
      setValue("content", fetchedDiaryData.body ?? "");
      setValue("mood", fetchedDiaryData.mood ?? "");
      setValue("feelings", fetchedDiaryData.feelings ?? []);
      setValue("companions", fetchedDiaryData.companions ?? []);
      setValue("weather", fetchedDiaryData.weather ?? "");
      setValue("weatherId", fetchedDiaryData.weatherId ?? "");
      setValue("photo", fetchedDiaryData.photos ?? []);
      setValue("todayPick.title", fetchedDiaryData.todayPickTitle ?? "");
      setValue(
        "todayPick.contributors",
        fetchedDiaryData.todayPickContributors ?? [],
      );
      setValue("todayPick.date", fetchedDiaryData.todayPickDate ?? "");
      setValue("todayPick.id", fetchedDiaryData.todayPickId ?? "");
      setValue("todayPick.imageFile", fetchedDiaryData.todayPickImage ?? null);
      console.log("기본값 정의한 값들:", fetchedDiaryData);
    }
  }, [isSuccess, fetchedDiaryData, methods]);

  /* 최상단 날짜 표시 */
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (params.date) {
      const newFormat = getDiaryDate(params.date);
      setFormattedDate(newFormat);
    }
  }, [params.date]);

  /* 기분(Mood) Part */
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const watchedMood = watch("mood");

  useEffect(() => {
    register("mood");
    setValue("mood", selectedMood);
  }, [selectedMood, register, setValue]);

  const handleMoodClick = (mood: string) => {
    const newMood = mood === watchedMood ? null : mood;
    setValue("mood", newMood);
    setSelectedMood(newMood);
  };

  console.log("selectedMood:", selectedMood);
  console.log("기분 상태:", methods.getValues("mood"));

  /* 감정태그(Emotion Tags) Part */
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const watchedFeelings = watch("feelings", []);

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

  useEffect(() => {
    register("feelings");
    if (isSuccess && fetchedDiaryData) {
      const initialTags =
        typeof fetchedDiaryData.feelings === "string"
          ? fetchedDiaryData.feelings
              .split(" ")
              .filter((tag: any) => tag.trim().startsWith("#"))
          : [];

      setValue("feelings", initialTags.join(" "));
      setSelectedTags(initialTags);
    }
  }, [register, setValue, isSuccess, fetchedDiaryData]);

  const handleTagClick = (tag: string) => {
    const currentTags = watchedFeelings
      .split(" ")
      .filter((tag: any) => tag.trim().startsWith("#"));
    const isTagSelected = currentTags.includes(tag);

    const newTags = isTagSelected
      ? currentTags.filter((t: any) => t !== tag)
      : [...currentTags, tag];

    setValue("feelings", newTags.join(" "));
  };

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {/* 최상단 날짜 표시 */}
        <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
          {formattedDate}
          <div>
            <Exit />
          </div>
        </section>
        {/* 기분 선택 */}
        <section className="flex flex-col gap-4 bg-default-200">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            기분
          </h2>
          <div className="transition duration-300 ease-in-out group-hover:bg-blue-500">
            <span className="flex items-center justify-between px-20">
              <JoyfulEmoji
                selected={watchedMood === "JOYFUL"}
                onClick={() => handleMoodClick("JOYFUL")}
              />
              <HappyEmoji
                selected={watchedMood === "HAPPY"}
                onClick={() => handleMoodClick("HAPPY")}
              />
              <NeutralEmoji
                selected={watchedMood === "NEUTRAL"}
                onClick={() => handleMoodClick("NEUTRAL")}
              />
              <UnhappyEmoji
                selected={watchedMood === "UNHAPPY"}
                onClick={() => handleMoodClick("UNHAPPY")}
              />
              <SadEmoji
                selected={watchedMood === "SAD"}
                onClick={() => handleMoodClick("SAD")}
              />
            </span>
          </div>
          <h3 className="flex justify-center text-sm font-medium text-gray-400">
            오늘 하루는 어땠나요?
          </h3>
        </section>
        {/* 감정 태그 선택 */}
        <section className="flex flex-col bg-default-200">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            감정태그
          </h2>
          <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
            {tags.map((tag) => (
              <Tags
                key={tag}
                text={tag}
                selected={watchedFeelings.includes(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </span>
        </section>
      </article>
    </main>
  );
}

// export default function Edit() {
//   const params = useParams<any>();
//   const [diaryData, setDiaryData] = useState({
//     mood: "",
//     emotionTags: [],
//     companions: [],
//     photo: [],
//     title: "",
//     content: "",
//     weather: "",
//     weatherId: "",
//     todayPick: {
//       title: "",
//       contributors: "",
//       date: "",
//       id: "",
//       imageFile: [],
//     },
//   });

//   // 최상단 날짜 표시
//   const [formattedDate, setFormattedDate] = useState("");

//   useEffect(() => {
//     if (params.date) {
//       const newFormat = getDiaryDate(params.date);
//       setFormattedDate(newFormat);
//     }
//   }, [params.date]);

//   // FormData 객체 생성
//   const formData = new FormData();

//   const mapCompanionToServerValue = (companion: string) => {
//     const mapping: { [key: string]: string } = {
//       가족: "FAMILY",
//       친구: "FRIEND",
//       연인: "LOVER",
//       지인: "ACQUAINTANCE",
//       안만남: "ALONE",
//       FAMILY: "가족",
//       FRIEND: "친구",
//       LOVER: "연인",
//       ACQUAINTANCE: "지인",
//       ALONE: "안만남",
//     };
//     return mapping[companion] || companion;
//   };

//   const parseCompanions = (companions: any) => {
//     // companions가 문자열인 경우 콤마로 구분하여 배열로 변환
//     if (typeof companions === "string") {
//       return companions.split(",");
//     }
//     // 이미 배열인 경우 그대로 반환
//     else if (Array.isArray(companions)) {
//       return companions;
//     }
//     // 그 외의 경우 빈 배열 반환
//     return [];
//   };

//   const { data: fetchedDiaryData } = useQuery({
//     queryKey: ["getDiaryForDay"],
//     queryFn: () => getDiaryForDay({ date: params.date }),
//   });

//   // 서버에서 저장된 일기 데이터를 가져와서 상태에 저장
//   useEffect(() => {
//     if (fetchedDiaryData) {
//       const companionsArray =
//         typeof fetchedDiaryData.companions === "string"
//           ? [fetchedDiaryData.companions]
//           : // ? fetchedDiaryData.companions.split(",")
//             fetchedDiaryData.companions;

//       const comapionsStr = companionsArray
//         .map(mapCompanionToServerValue)
//         .join(",");

//       const updatedDiaryData = {
//         // ...fetchedDiaryData,
//         title: fetchedDiaryData.title,
//         content: fetchedDiaryData.body,
//         mood: fetchedDiaryData.mood,
//         emotionTags: fetchedDiaryData.feelings,
//         companions: comapionsStr,
//         weather: fetchedDiaryData.weather,
//         weatherId: fetchedDiaryData.weatherId.toString(),
//         photo: fetchedDiaryData.photos,
//         todayPick: {
//           title: fetchedDiaryData.todayPickTitle,
//           contributors: fetchedDiaryData.todayPickContributors,
//           date: fetchedDiaryData.todayPickDate,
//           id: fetchedDiaryData.todayPickId,
//           imageFile: fetchedDiaryData.todayPickImage,
//         },
//       };
//       setDiaryData(updatedDiaryData);
//     }
//   }, [fetchedDiaryData]);

//   console.log("수정하기 위한 데이터:", diaryData);

//   // 일기 데이터 Submit
//   const handleSubmitDiary = async (
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     event.preventDefault(); // 폼 제출의 기본 동작 방지

//     const diaryId = fetchedDiaryData.id;
//     const jwtToken = getCookie("access_token");
//     if (!jwtToken) {
//       alert("로그인이 필요합니다.");
//       window.location.href = "/login";
//       return;
//     }

//     // feelings와 companions 배열을 콤마로 구분된 문자열로 변환
//     const todaypickIdStr = diaryData.todayPick.id.toString();
//     const companionsStr = parseCompanions(diaryData.companions)
//       .map(mapCompanionToServerValue)
//       .join(",");

//     const data = {
//       title: diaryData.title,
//       body: diaryData.content,
//       mood: diaryData.mood,
//       feelings: diaryData.emotionTags, // // 프론트에서는 emotionTags, 서버에서는 feelings로 처리
//       companions: companionsStr,
//       weather: diaryData.weather,
//       weatherId: diaryData.weatherId.toString(),
//       remember: false, // 기본값 false 등록
//       todayPickTitle: diaryData.todayPick.title,
//       todayPickContributors: diaryData.todayPick.contributors,
//       todayPickDate: diaryData.todayPick.date,
//       todayPickId: todaypickIdStr,
//     };
//     formData.append("data", JSON.stringify(data));

//     // `photos` 파일 추가
//     diaryData.photo.forEach((file, index) => {
//       formData.append(`photos`, file); // 인덱스 없이 photos로 모든 파일 추가
//     });

//     // `todayPickImage` 파일 추가
//     if (diaryData.todayPick.imageFile) {
//       // 이미지가 단일 파일인 경우 배열로 변환
//       const images = Array.isArray(diaryData.todayPick.imageFile)
//         ? diaryData.todayPick.imageFile
//         : [diaryData.todayPick.imageFile];
//       images.forEach((file) => {
//         formData.append(`todayPickImage`, file); // 배열의 모든 이미지를 추가
//       });
//     }

//     // diaryData 상태 로깅
//     console.log("제출될 일기 데이터:", diaryData);

//     try {
//       const updatedDiary = await updateDiary(diaryId, diaryData);
//       console.log("일기 수정 성공", updatedDiary.data);
//       // window.location.href = `/${params.date}/diary`;
//     } catch (error) {
//       console.error("일기 생성 실패", error);
//     }
//   };

//   return (
//     <main className="flex min-h-screen justify-center">
//       <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
//         <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
//           {formattedDate}
//           <div>
//             <Exit />
//           </div>
//         </section>
//         <section className="flex flex-col gap-4 bg-default-200">
//           <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
//             기분
//           </h2>
//           <ChooseMood
//             updatedMood={diaryData.mood}
//             onMoodSelect={(mood: any) => setDiaryData({ ...diaryData, mood })}
//           />
//           <h3 className="flex justify-center text-sm font-medium text-gray-400">
//             오늘 하루는 어땠나요?
//           </h3>
//         </section>
//         <section className="flex flex-col bg-default-200">
//           <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
//             감정태그
//           </h2>
//           <ChooseEmotionTags
//             updatedEmotionTags={diaryData.emotionTags as any}
//             onTagSelect={(tags: any) =>
//               setDiaryData({ ...diaryData, emotionTags: tags })
//             }
//           />
//         </section>
//         <section className="flex flex-col bg-default-300">
//           <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
//             함께한 사람
//           </h2>
//           <ChooseCompanions
//             updatedCompanions={diaryData.companions as any}
//             onSelectCompanion={(companions: any) =>
//               setDiaryData({ ...diaryData, companions })
//             }
//           />
//         </section>
//         <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
//           <DiaryCreateModal
//             updatedDiaryData={{
//               title: diaryData.title as any,
//               content: diaryData.content as any,
//               weather: diaryData.weather as any,
//               weatherId: diaryData.weatherId as any,
//             }}
//             onSubmit={(modalData: any) => {
//               console.log("onSubmit called with data:", modalData);
//               setDiaryData({ ...diaryData, ...modalData });
//             }}
//           />
//         </section>
//         <section className="flex flex-col bg-default-400">
//           <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
//             오늘의 사진
//           </h2>
//           <UploadPhoto
//             updatedPhotos={diaryData.photo as any}
//             onPhotosChange={(photos: any) =>
//               setDiaryData({ ...diaryData, photo: photos })
//             }
//           />
//         </section>
//         <section className="flex flex-col bg-default-800">
//           <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
//             오늘의 PICK
//           </h2>
//           <UploadTodayPick
//             updatedTodayPick={diaryData.todayPick as any}
//             onSubmit={(todayPickData: any) => {
//               setDiaryData({ ...diaryData, todayPick: todayPickData });
//             }}
//           />
//         </section>
//         <section className="mx-4 my-4 flex justify-center">
//           <Button
//             type="submit"
//             variant="outlined"
//             onClick={handleSubmitDiary}
//             className="rounded-[20px] border-2 border-solid border-default-800 px-32 py-2 text-default-800 hover:bg-default-300"
//           >
//             Update Diary
//           </Button>
//         </section>
//       </article>
//     </main>
//   );
// }
