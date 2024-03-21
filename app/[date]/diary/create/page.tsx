"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";

import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";
import DiaryModal from "@/app/ui/diary/DiaryModal";
import Exit from "@/public/diary/Exit";

import { createDiary, createTodayPick } from "@/store/api";
import { getDiaryDate, getToday } from "@/util/date";

function removeAllEmptyStrings(obj: any) {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "string" &&
      obj[key].trim() === ""
    ) {
      delete obj[key];
    }
  }
  return obj;
}
interface Pick {
  title: string;
  date: Date;
  contributors: string;
  image: File;
}

export default function Create() {
  const router = useRouter();
  const { date } = useParams<{ date: string }>();
  const [formattedDate, setFormattedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState<string | null>(
    null,
  );

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [selectedPicks, setSelectedPicks] = useState<Pick[]>([]);

  const { register, watch, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      mood: "",
      feelings: "",
      companions: "",
      title: "",
      body: "",
      todayPickId: "",
      todayPickTitle: "",
      todayPickDate: "",
      todayPickContributors: "",
    },
  });

  // 다이어리 생성
  const { mutate: createDiaryMutate } = useMutation({
    mutationKey: ["createDiary"],
    mutationFn: createDiary,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async ({ diaryId }: any) => {
      if (selectedPicks.length > 0) {
        for (let i = 0; i < selectedPicks.length; i++) {
          const { image, ...createData } = selectedPicks[i];
          await createTodayPickMutate({
            createData,
            diaryId,
            image,
          });
        }
      }
      router.replace(`/${date}/diary`);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // today pick 생성
  const { mutate: createTodayPickMutate } = useMutation({
    mutationKey: ["createTodayPick"],
    mutationFn: createTodayPick,
  });

  const onSubmit = (data: any) => {
    const { mood, feelings, companions, title, body } = data;
    if (
      mood !== "" &&
      feelings !== "" &&
      companions !== "" &&
      title !== "" &&
      body !== ""
    ) {
      const modifiedData = removeAllEmptyStrings(data);

      createDiaryMutate({
        date,
        createData: modifiedData,
        photos: selectedPhotos,
      });
    } else {
      window.alert("Mood, Feelings, With, Diary are required");
    }
  };

  useEffect(() => {
    if (date) {
      setFormattedDate(getDiaryDate(date));
    }
  }, [date]);

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div>
            <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
              {formattedDate}
              <div>
                <Exit />
              </div>
            </section>
            <section className="flex flex-col gap-4 bg-default-200">
              <h2 className="flex px-8 py-4 text-lg font-medium text-gray-400">
                Mood
              </h2>
              <ChooseMood
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                onMoodSelect={(mood: any) => setValue("mood", mood)}
              />
              <h3 className="flex justify-center text-sm font-medium text-gray-400">
                How are you today?
              </h3>
            </section>
            <section className="flex flex-col bg-default-200">
              <h2 className="flex px-8 py-4 text-lg font-medium text-gray-400">
                Feelings
              </h2>
              <ChooseEmotionTags
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onTagSelect={(tags: any) => setValue("feelings", tags)}
              />
            </section>
            <section className="flex flex-col bg-default-300 px-8 py-4">
              <h2 className="flex text-lg font-medium text-gray-400">With</h2>
              <ChooseCompanions
                selectedCompanions={selectedCompanions}
                setSelectedCompanions={setSelectedCompanions}
                onSelectCompanion={(companions: any) =>
                  setValue("companions", companions)
                }
              />
            </section>
            <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
              <DiaryModal
                type="create"
                getValues={getValues}
                setValue={setValue}
              />
            </section>
            <section className="flex flex-col bg-default-400 px-5 py-4">
              <h2 className="flex  text-lg font-medium text-gray-400">
                Today&#39;s PICTURE
              </h2>
              <UploadPhoto
                selectedPhotos={selectedPhotos}
                setSelectedPhotos={setSelectedPhotos}
                previewUrls={previewUrls}
                setPreviewUrls={setPreviewUrls}
              />
            </section>
            <section className="flex flex-col gap-2 bg-default-800 px-5 pb-8 pt-4">
              <h2 className="flex text-lg font-medium text-default-100">
                Today&#39;s PICK
              </h2>
              <UploadTodayPick
                selectedPicks={selectedPicks}
                setSelectedPicks={setSelectedPicks}
              />
            </section>
          </div>
          <section className="m-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-3xl border-2 border-default-800 px-32 py-2 text-sm font-semibold text-default-800 hover:bg-default-300 active:bg-default-800 active:text-white"
            >
              {isLoading ? <CircularProgress /> : <span>Create Diary</span>}
            </button>
          </section>
        </form>
      </article>
    </main>
  );
}
