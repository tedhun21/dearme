"use client";

import { useEffect, useState } from "react";
import {} from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { getDiaryForDay } from "@/store/api";
import { getToday } from "@/util/date";

import EditDiaryModal from "../ui/test/editDModal";

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

export default function Test() {
  // const params = useParams<any>();

  const { register, watch, handleSubmit, getValues, setValue } = useForm();

  const [emotionTags, setEmotionTags] = useState<string[]>([]);
  const [todayPick, setTodayPick] = useState<any>({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const { isSuccess, data: fetchedDiaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date: getToday() }),
  });

  // 통신된 데이터 기본값 정의
  useEffect(() => {
    if (isSuccess) {
      setValue("title", fetchedDiaryData.title);
      setValue("content", fetchedDiaryData.body);
      setValue("mood", fetchedDiaryData.mood);
      setEmotionTags((prev: any) => [...fetchedDiaryData.feelings.split(" ")]);
      setValue("companions", fetchedDiaryData.companions);
      setValue("weather", fetchedDiaryData.weather);
      setValue("weatherId", fetchedDiaryData.weatherId);
      setValue("photo", fetchedDiaryData.photos);
      setTodayPick({
        title: fetchedDiaryData.todayPickTitle,
        contributors: fetchedDiaryData.todayPickContributors,
        date: fetchedDiaryData.todayPickDate,
        id: fetchedDiaryData.todayPickId,
        imageFile: fetchedDiaryData.todayPickImage,
      });
    }
  }, [isSuccess]);

  // update submit
  const onSubmit = (data: any) => {};

  return (
    <main className="flex min-h-screen justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title: </label>
          <span>{getValues().title}</span>
        </div>
        <div>
          <label>Content: </label>
          <span>{getValues().content}</span>
        </div>
        <div>
          <label></label>
          <span {...register("mood")}></span>
        </div>
        <div>
          <label>feelings</label>
          {tags?.map((tag: any, index: any) => (
            <Tag
              key={index}
              tag={tag}
              emotionTags={emotionTags}
              setEmotionTags={setEmotionTags}
            />
          ))}
        </div>

        <div>
          <button onClick={() => setEditModalOpen(true)}>Open Modal</button>
          <EditDiaryModal
            register={register}
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
          />
        </div>
        {Object.keys(todayPick).length > 0 && (
          <div className="bg-default-500">
            <span>{todayPick?.title}</span>
            <span>{todayPick?.contributors}</span>
            <span>{todayPick?.date}</span>
          </div>
        )}

        <button type="submit">update diary</button>
      </form>
    </main>
  );
}

function Tag({ tag, emotionTags, setEmotionTags }: any) {
  const [checked, setChecked] = useState(false);

  const handleTagClick = (tag: any) => {
    if (Array.isArray(emotionTags)) {
      if (emotionTags.includes(tag)) {
        setEmotionTags(emotionTags.filter((t) => t !== tag));
      } else {
        setEmotionTags([...emotionTags, tag]);
      }
    } else {
      // emotionTags가 배열이 아닐 경우 초기화
      setEmotionTags([tag]);
    }
    setChecked(!checked);
  };

  useEffect(() => {
    if (emotionTags?.includes(tag)) {
      setChecked(true);
    }
  }, [emotionTags, tag]);

  return (
    <div
      className={clsx("", checked ? " bg-default-800" : "")}
      onClick={() => handleTagClick(tag)}
    >
      {tag}
    </div>
  );
}
