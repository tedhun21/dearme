"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Button from "@mui/joy/Button";

import Exit from "@/public/diary/Exit";
import DiaryCreateModal from "@/app/ui/diary/DiaryCreateModal";
import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";

import { useForm } from "react-hook-form";
import { getDiaryDate, getToday } from "@/util/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDiary } from "@/store/api";

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
      todayPickTitle: "",
      todayPickDate: "",
      todayPickContributors: "",
    },
  });

  const { mutate: createDiaryMutate } = useMutation({
    mutationKey: ["createDiary"],
    mutationFn: createDiary,
    onSuccess: (data: any) => {
      window.alert(data.message);
      router.push(`/${date}/diary`);
    },
    onError: ({ response }: any) => {
      console.log(response.data.error.message);
    },
  });

  const onSubmit = (data: any) => {
    const { mood, feelings, companions, title, body } = getValues();
    if (
      mood !== "" &&
      feelings !== "" &&
      companions !== "" &&
      title !== "" &&
      body !== ""
    ) {
      const modifiedData = removeAllEmptyStrings(getValues());

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
            <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
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
            <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
              Feelings
            </h2>
            <ChooseEmotionTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              onTagSelect={(tags: any) => setValue("feelings", tags)}
            />
          </section>
          <section className="flex flex-col bg-default-300">
            <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
              With
            </h2>
            <ChooseCompanions
              selectedCompanions={selectedCompanions}
              setSelectedCompanions={setSelectedCompanions}
              onSelectCompanion={(companions: any) =>
                setValue("companions", companions)
              }
            />
          </section>
          <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
            <DiaryCreateModal getValues={getValues} setValue={setValue} />
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
          <section className="flex flex-col gap-2 bg-default-800 px-5 py-4">
            <h2 className="flex text-lg font-medium text-default-100">
              Today&#39;s PICK
            </h2>
            <UploadTodayPick
              register={register}
              getValues={getValues}
              setValue={setValue}
              pickImage={pickImage}
              setPickImage={setPickImage}
            />
          </section>
          <section className="mx-4 my-4 flex justify-center">
            <Button
              type="submit"
              variant="outlined"
              className="rounded-[20px] border-2 border-solid border-default-800 px-32 py-2 text-default-800 hover:bg-default-300"
            >
              Create Diary
            </Button>
          </section>
        </form>
      </article>
    </main>
  );
}
