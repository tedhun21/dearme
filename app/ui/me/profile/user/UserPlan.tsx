"use client";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { getToday } from "@/util/date";
import { getUserTodosWithDate } from "@/store/api";

import UserGoal from "./UserGoal";
import { todoListState } from "@/store/atoms";
import { useEffect, useState } from "react";
import TodoRate from "../../plans/TodoRate";

import Blur from "./Blur";
import LockIcon from "@/public/me/LockIcon";
import UserTodos from "./UserTodos";

export default function UserPlan({ me, user, friendshipData }: any) {
  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);

  const { isSuccess, data: todoData } = useQuery({
    queryKey: ["getUserTodosWithDate"],
    queryFn: () => getUserTodosWithDate({ userId: user.id, date: getToday() }),
    enabled: !!user,
  });

  useEffect(() => {
    if (isSuccess) {
      setTodos(todoData.filter((todo: any) => todo.public === "ALL"));
    }
  }, [isSuccess]);

  return (
    <>
      {/* 둘 다 차단했다면 User Blocked 처리 (user.private 상관 없음) */}
      {friendshipData?.status === "BLOCK_BOTH" && (
        <div className="relative flex select-none items-end justify-center">
          <section className="mb-20 mt-4 w-full blur">
            <Blur />
          </section>
          <div className="absolute flex gap-2">
            <LockIcon className="h-5 w-5" />
            <span className="font-semibold">User Blocked</span>
          </div>
        </div>
      )}

      {/* 한 명이 차단한 상태 (user.private 상관 없이 블러)*/}
      {/* 1. 상대 방이 날 차단한 상태 -> Private 처리 */}
      {friendshipData?.status === "BLOCK_ONE" &&
        friendshipData?.block?.some((block: any) => block.id === user.id) &&
        friendshipData?.blocked?.some(
          (blocked: any) => blocked.id === me.id,
        ) && (
          <div className="relative flex select-none items-end justify-center">
            <section className="mb-20 mt-4 w-full blur">
              <Blur />
            </section>
            <div className="absolute flex gap-2">
              <LockIcon className="h-5 w-5" />
              <span className="font-semibold">Private</span>
            </div>
          </div>
        )}

      {/* 한 명이 차단한 상태 (user.private 상관 없이 블러)*/}
      {/* 2. 내가 차단한 상태 -> User Blocked 처리 */}
      {friendshipData?.status === "BLOCK_ONE" &&
        friendshipData?.block?.some((block: any) => block.id === me.id) &&
        friendshipData?.blocked?.some(
          (blocked: any) => blocked.id === user.id,
        ) && (
          <div className="relative flex select-none items-end justify-center">
            <section className="mb-20 mt-4 w-full blur">
              <Blur />
            </section>
            <div className="absolute flex gap-2">
              <LockIcon className="h-5 w-5" />
              <span className="font-semibold">User Blocked</span>
            </div>
          </div>
        )}

      {/* 둘 다 친구인 상태 (user.private 상관없이 보여줌) */}
      {friendshipData?.status === "FRIEND" && (
        <section className="mb-20 mt-4 flex flex-col">
          <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop && todos.length > 0 && <UserTodos todos={todos} />}
          <UserGoal user={user} />
        </section>
      )}

      {/* 친구 요청 상태거나 아무것도 아닌 상태는 같은 결과 (user.private의 영향을 받음)*/}
      {friendshipData?.status === "PENDING" && user?.private ? (
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
        friendshipData?.status === "PENDING" &&
        !user?.private && (
          <section className="mb-20 mt-4 flex flex-col">
            <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
            {isDrop && todos.length > 0 && <UserTodos todos={todos} />}
            <UserGoal user={user} />
          </section>
        )
      )}

      {friendshipData?.status === "NOTHING" && user?.private ? (
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
        friendshipData?.status === "NOTHING" &&
        !user?.private && (
          <section className="mb-20 mt-4 flex flex-col">
            <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
            {isDrop && todos.length > 0 && <UserTodos todos={todos} />}
            <UserGoal user={user} />
          </section>
        )
      )}
    </>
  );
}
