"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Modal } from "@mui/joy";
import { Button, Divider, LinearProgress, Switch } from "@mui/material";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import UserIcon from "@/public/me/UserIcon";
import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import { meState, todoListState } from "@/store/atoms";
import Image from "next/image";
import CalendarIcon from "@/public/todogoal/CalendarIcon";
import Footer from "@/app/ui/footer";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getMyTodosWithDate } from "@/store/api";
import ProgressIcon from "@/public/todogoal/ProgressIcon";
import LeftArrowIcon from "@/public/todogoal/LeftArrow";
import DragTodo from "@/app/ui/todo/Drag";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function DailyTodo() {
  const [title, setTitle] = useState("Todo");
  const me = useRecoilValue(meState);
  const [todos, setTodos] = useRecoilState(todoListState);

  const { date } = useParams<{ date: string }>();
  const [value, setValue] = useState(dayjs(date));

  const checkedTodos = todos?.filter((todo: any) => todo.done === true);
  const percent =
    todos && todos.length !== 0
      ? Math.round((checkedTodos?.length / todos.length) * 100)
      : 0;

  const { isSuccess, data, refetch, isRefetching } = useQuery({
    queryKey: ["getMyTodosWithDate"],
    queryFn: () =>
      getMyTodosWithDate({ date: dayjs(value).format("YYYY-MM-DD") }),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isPublicTodo, setPublicTodo] = useState(false);

  useEffect(() => {
    if (isSuccess || !isRefetching) {
      setTodos(data);
    }
  }, [isSuccess, isRefetching]);

  useEffect(() => {
    if (!isRefetching && value) {
      refetch();
    }
  }, [value]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black text-white shadow-lg">
        <article className="flex flex-col gap-5 p-5">
          <section className="flex w-full items-center justify-between">
            {me && (
              <span className="text-xl font-semibold">Hi! {me?.nickname}</span>
            )}
            <div className="flex">
              <div className="relative rounded-3xl bg-default-800">
                <div
                  className={clsx(
                    "absolute h-[40px] w-[100px] transform rounded-3xl bg-default-400 transition-all",
                    title === "Todo" ? "translate-x-0" : "translate-x-[100px]",
                  )}
                />
                <Button
                  disableRipple
                  variant="text"
                  sx={{
                    width: "100px",
                    height: "40px",
                    fontWeight: "bold",
                    color: title === "Todo" ? "#143422" : "#ffffff",
                    transition: "all 0.2s 0.1s ease",
                  }}
                  onClick={() => setTitle("Todo")}
                >
                  Todo
                </Button>
                <Button
                  disableRipple
                  variant="text"
                  sx={{
                    width: "100px",
                    height: "40px",
                    fontWeight: "bold",
                    color: title === "Todo" ? "#ffffff" : "#143422",
                    transition: "all 0.2s 0.1s ease",
                  }}
                  onClick={() => setTitle("Goal")}
                >
                  Goal
                </Button>
              </div>
            </div>
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              {me && (
                <Image
                  src={`${BUCKET_URL}${me?.photo.url}`}
                  alt="user profile"
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <div className="w-full rounded-3xl bg-default-800 p-6">
              <div className="flex items-center gap-4">
                <CalendarIcon className="h-5 w-5 fill-current text-white" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["day"]}
                    value={value}
                    onChange={(newValue: any) => setValue(newValue)}
                    minDate={dayjs(date).subtract(1, "month")}
                    maxDate={dayjs(date).add(1, "month")}
                    sx={{
                      width: "100px",
                      borderColor: "#ffffff",
                      "& .MuiInputBase-root": {
                        color: "#ffffff",
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col text-2xl font-bold">
                <span>You have</span>
                <span>
                  {todos?.length} {todos?.length > 0 ? "tasks" : "task"} for
                  today
                </span>
              </div>
              <div className="mb-3 mt-5 h-0.5 bg-white" />
              <div className="flex gap-5 text-default-300">
                <span>#planning</span>
                <span>#challenge</span>
                <span>#youthfulness</span>
              </div>
            </div>
            <div className="w-full rounded-3xl bg-default-900 p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <ProgressIcon className="h-8 w-8" />
                </div>
                <span className="text-xl">Your Progress</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex w-2/3 flex-col pb-0.5">
                  <div className="flex gap-2">
                    <span className="text-xl">
                      {percent === 0
                        ? "Let's try this!"
                        : percent < 50
                          ? "You are doing well!"
                          : percent < 99
                            ? "You are almost there"
                            : percent === 100
                              ? "Well Done!"
                              : null}
                    </span>
                    <div>^^</div>
                  </div>
                  <LinearProgress
                    sx={{
                      height: "16px",
                      borderRadius: "12px",
                      width: "100%",
                      color: "#143422",
                      backgroundColor: "#ffffff",
                    }}
                    variant="determinate"
                    value={percent}
                    color="inherit"
                  />
                </div>
                <div className="flex w-1/3 items-end justify-around">
                  <div>
                    <LeftArrowIcon className="h-5 w-5" />
                  </div>
                  <span className="text-5xl">{percent}%</span>
                </div>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-3xl bg-default-200">
              <DragTodo date={date} />
            </div>
            <div>+</div>
          </section>

          {/* create todo modal */}
          {/* <Modal
          className="flex items-center justify-center"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="flex h-[400px] w-[300px] flex-col justify-between rounded-2xl bg-default-200 p-6 sm:w-[500px]">
            <div className="flex flex-col gap-7">
              <div className="flex w-full items-center gap-4">
                <input
                  className="w-full rounded-lg border-2 border-default-400 bg-default-100 p-1 font-semibold outline-none focus:border-default-900"
                  placeholder="할 일 제목을 작성해주세요"
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-2 hover:bg-default-400"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="h-full w-full">
                <div>{selectDate?.format("MMMM")}</div>
                <textarea
                  className="h-[150px] w-full rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none focus:border-default-900"
                  placeholder="내용을 적어주세요"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>공개 여부</div>
                <Switch
                  value={isPublicTodo}
                  onChange={() => setPublicTodo((prev) => !prev)}
                  sx={{
                    /// switch 기본 박스 크기
                    padding: 0,
                    width: "32px",
                    height: "20px",
                    "& .MuiSwitch-switchBase": {
                      padding: 0,
                      margin: "2px",
                      transitionDuration: "300ms",
                      /// 체크될때
                      "&.Mui-checked": {
                        transform: "translateX(12px)",
                        color: "#fff",
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#143422",
                          opacity: 1,
                          border: 0,
                        },
                        "&.Mui-disabled + .MuiSwitch-track": {
                          opacity: 0.5,
                        },
                      },
                    },
                    "& .MuiSwitch-thumb": {
                      boxSizing: "border-box",
                      width: 16,
                      height: 16,
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 26 / 2,
                      backgroundColor: "#b6b6c0",
                      opacity: 1,
                    },
                  }}
                />
              </div>
              <button className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900">
                Create Todo
              </button>
            </div>
          </div>
        </Modal> */}
        </article>
        <Footer />
      </div>
    </main>
  );
}
