"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getDiaryDate } from "@/util/date";

import { getDiaryForDay, updateDiary } from "@/store/api";
import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import DiaryModal from "@/app/ui/diary/DiaryModal";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";
import { CircularProgress } from "@mui/material";
import Exit from "@/public/diary/Exit";

export default function Edit() {
  const { date } = useParams<any>();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, getValues, setValue, watch, reset, handleSubmit } =
    useForm();

  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState<string | null>(
    null,
  );

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [picks, setPicks] = useState([]);
  const [selectedPicks, setSelectedPicks] = useState([]);

  // fetch the diary
  const { isSuccess, data: diaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date }),
  });

  // update the diary
  const { mutate: updateDiaryMutate } = useMutation({
    mutationKey: ["updateDiary"],
    mutationFn: updateDiary,
    onSuccess: (data) => {
      router.push(`/${date}/diary`);
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
      if (data && diaryData)
        updateDiaryMutate({
          updateData: data,
          photos: selectedPhotos,
          diaryId: diaryData.id,
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

  useEffect(() => {
    if (isSuccess && diaryData) {
      setSelectedMood(diaryData.mood);
      setSelectedTags(diaryData.feelings.split(" "));
      setSelectedCompanions(diaryData.companions);
      setPreviewUrls(diaryData.photos ?? []);
      setPicks(diaryData.today_picks);

      setValue("mood", diaryData.mood);
      setValue("feelings", diaryData.feelings);
      setValue("companions", diaryData.companions);
      setValue("title", diaryData.title);
      setValue("body", diaryData.body);
      setValue("weatherId", diaryData.weatherId);
      setValue("weather", diaryData.weather);
    }
  }, [isSuccess, diaryData]);

  // console.log(watch());
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
                type="edit"
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
                picks={picks}
                setPicks={setPicks}
                selectedPicks={selectedPicks}
                setSelectedPicks={setSelectedPicks}
                getValues={getValues}
                setValue={setValue}
              />
            </section>
          </div>
          <section className="m-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-3xl border-2 border-default-800 px-32 py-2 text-sm font-semibold text-default-800 hover:bg-default-300 active:bg-default-800 active:text-white"
            >
              {isLoading ? <CircularProgress /> : <span>Update Diary</span>}
            </button>
          </section>
        </form>
      </article>
    </main>
  );
}
