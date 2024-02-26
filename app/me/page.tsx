"use client";

import { useEffect, useState } from "react";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import DragTodo from "../ui/todo/DragTodo";
import { getToday } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import { getMyTodosWithDate } from "@/store/api";
import { useSetRecoilState } from "recoil";
import { todoListState } from "@/store/atoms";
import Link from "next/link";

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);
  const setTodos = useSetRecoilState(todoListState);

  const { isSuccess, data: todos } = useQuery({
    queryKey: ["getMyTodosWithDate"],
    queryFn: () => getMyTodosWithDate({ date: getToday() }),
  });

  useEffect(() => {
    setTodos(todos);
  }, [isSuccess]);

  return (
    <section className="mb-20 mt-4 flex flex-col">
      <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todos?.length !== 0 ? (
        <section>
          <DragTodo date={getToday()} />
        </section>
      ) : null}
      <MeGoal />
      <div className="flex justify-center p-5">
        <Link
          href={`/${getToday()}/todogoal`}
          className="rounded-xl bg-default-800 px-4 py-2 font-semibold text-white hover:bg-default-900"
        >
          Click to manage Todo & Goal
        </Link>
      </div>
    </section>
  );
}
