"use client";

import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { getToday } from "@/util/date";
import { getUserTodosWithDate } from "@/store/api";

import UserGoal from "./UserGoal";
import { todoListState } from "@/store/atoms";
import { useEffect, useState } from "react";
import TodoRate from "../../plans/TodoRate";

import Blur from "./Blur";
import LockIcon from "@/public/me/LockIcon";

export default function UserPlan({ user }: any) {
  const { isSuccess, data: todoData } = useQuery({
    queryKey: ["getUserTodosWithDate"],
    queryFn: () => getUserTodosWithDate({ userId: user.id, date: getToday() }),
    enabled: !!user,
  });

  const setTodos = useSetRecoilState(todoListState);

  useEffect(() => {
    if (isSuccess) {
      setTodos(todoData);
    }
  }, [isSuccess]);

  return (
    <>
      {user?.private ? (
        <div className="relative flex select-none items-end justify-center">
          <section className="mb-20 mt-4 w-full blur">
            <Blur />
          </section>
          <div className="absolute flex gap-2">
            <LockIcon className="h-5 w-5" />
            <span className="font-semibold">Private</span>
          </div>
        </div>
      ) : (
        <section className="mb-20 mt-4 flex flex-col">
          <TodoRate />
          <UserGoal user={user} />
        </section>
      )}
    </>
  );
}
