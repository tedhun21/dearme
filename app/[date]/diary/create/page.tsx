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

import { createDiary } from "@/store/api";
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
  const [pickImage, setPickImage] = useState<File | null>(null);

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

  const { mutate: createDiaryMutate } = useMutation({
    mutationKey: ["createDiary"],
    mutationFn: createDiary,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: any) => {
      router.replace(`/${date}/diary`);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
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
        date: getToday(),
        createData: modifiedData,
        photos: selectedPhotos,
        todayPickImage: pickImage,
      });
    }
  };

  useEffect(() => {
    if (date) {
      setFormattedDate(getDiaryDate(date));
    }
  }, [date]);

  console.log(isLoading);

  // console.log(watch());
  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              getValues={getValues}
              setValue={setValue}
              pickImage={pickImage}
              setPickImage={setPickImage}
            />
          </section>
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
