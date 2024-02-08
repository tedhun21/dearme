"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { Button, LinearProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import { meState, todoListState } from "@/store/atoms";
import CalendarIcon from "@/public/todogoal/CalendarIcon";
import Footer from "@/app/ui/footer";
import { createMyTodo, getMyTodosWithDate } from "@/store/api";
import ProgressIcon from "@/public/todogoal/ProgressIcon";
import LeftArrowIcon from "@/public/todogoal/LeftArrow";
import DragTodo from "@/app/ui/todo/Drag";
import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import SendIcon from "@/public/todogoal/SendIcon";

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

  // ABOUT: creat Todo
  const [createInput, setCreateInput] = useState(false);

  const { mutate: createTodoMutate } = useMutation({
    mutationKey: ["createMyTodo"],
    mutationFn: createMyTodo,
  });

  const {
    register: todoRegister,
    handleSubmit: handleCreateSubmit,
    setValue: setTodoBodyValue,
  } = useForm();

  const onSubmit = (data: any) => {
    const { createTodoBody } = data;

    if (createTodoBody !== "") {
      createTodoMutate(
        { createData: { date, body: createTodoBody } },
        {
          onSuccess: (data) => {
            setTodos((prev) => {
              return [...prev, data];
            });
            setTodoBodyValue("createTodoBody", "");
          },
        },
      );
    }
  };

  // ABOUT:get Todo
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
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black pb-28 text-white shadow-lg">
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
            <div className="flex w-full flex-col gap-5 rounded-3xl bg-default-900 p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <ProgressIcon className="h-8 w-8" />
                </div>
                <span className="text-xl font-semibold">Your Progress</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex w-2/3 flex-col gap-3 pb-0.5">
                  <div className="flex gap-4">
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
            {Array.isArray(todos) && todos.length > 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-full overflow-hidden rounded-3xl bg-default-200">
                  <DragTodo date={date} />
                </div>
              </div>
            )}
            <div className="flex w-full flex-col items-center gap-4">
              {createInput && (
                <div className="w-full rounded-3xl px-5">
                  <form
                    onSubmit={handleCreateSubmit(onSubmit)}
                    className="flex justify-between rounded-xl bg-default-200 px-5 py-3"
                  >
                    <div className="flex flex-grow items-center gap-3">
                      <TodoCheckFalseIcon className="h-6 w-6 fill-current text-default-600 hover:text-default-700" />
                      <input
                        {...todoRegister("createTodoBody")}
                        className="text-semibold flex-grow bg-transparent text-sm text-default-700 focus:outline-none"
                        placeholder="Please enter the todo content..."
                      />
                    </div>
                    <div className="transistion-all group h-10 w-10 p-1 duration-200 hover:p-0 active:p-2">
                      <button className="flex h-full w-full items-center justify-center rounded-full bg-default-800 transition-all duration-200 hover:bg-default-900">
                        <SendIcon className="h-4 w-4 transition-all duration-200 group-hover:h-5 group-hover:w-5 group-active:h-3 group-active:w-3" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {/* plus button */}
              <div className="group flex h-12 w-12 items-center justify-center p-1 transition-all duration-200 hover:p-0 active:p-2">
                <button
                  onClick={() => setCreateInput((prev) => !prev)}
                  className="h-full w-full rounded-full bg-default-600 p-2 duration-200 group-hover:h-12 group-hover:w-12 group-hover:bg-default-400 group-active:h-8 group-active:w-8"
                >
                  {createInput ? <XIcon color="white" /> : <PlusIcon />}
                </button>
              </div>
            </div>
          </section>
        </article>
        <Footer />
      </div>
    </main>
  );
}
