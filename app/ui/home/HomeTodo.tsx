"use client";

import { processState, settingState, todoListState } from "@/store/atoms";
import { CircularProgress } from "@mui/joy";

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useCountUp } from "use-count-up";

export default function HomeTodo() {
  const [{ date }, setSetting] = useRecoilState(settingState);
  const [{ is100, doReset }, setProcess] = useRecoilState(processState);
  const [todos, setTodos] = useRecoilState(todoListState);

  const checkedTodos =
    todos.length > 0 ? todos.filter((todo) => todo.done === true) : [];

  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 3,
    start: 0,
    end:
      todos.length !== 0
        ? Math.round((checkedTodos.length / todos.length) * 100)
        : 0,

    onUpdate: (data) => {
      if (data === "100") {
        setProcess((prev) => ({ ...prev, is100: true }));
        // setIs100(true);
      }
    },
  });

  useEffect(() => {
    if (doReset === true) {
      reset();
      setProcess((prev) => ({ ...prev, doReset: false }));
    }
  }, [doReset]);

  return (
    <section className="mt-4">
      <Link href={`/${dayjs(date).format("YYYY-MM-DD")}/todogoal`}>
        <div className="group flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl text-default-800 shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-800">
          <span className="text-3xl font-semibold group-hover:text-default-100">
            Todo & Goal
          </span>
          <div className="flex justify-center p-6">
            {todos.length !== 0 ? (
              <CircularProgress
                size="lg"
                determinate
                variant="soft"
                value={parseInt(value as string)}
                color={is100 ? "success" : "primary"}
                sx={{
                  "--CircularProgress-size": "200px",
                  "--CircularProgress-trackThickness": "20px",
                  "--CircularProgress-progressThickness": "20px",
                }}
              >
                <div>{value}%</div>
              </CircularProgress>
            ) : (
              <div className="flex flex-col items-center text-default-800 group-hover:text-default-100">
                <span>No Registerd Todo.</span>
                <span>Click to register Todo & Goal.</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}
