"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { todoListState } from "@/store/atoms";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";

import DragTodo from "../ui/todo/Drag";
import { useQuery } from "@tanstack/react-query";
import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";
import { getMyTodosWithDate } from "@/store/api";

const access_token = getCookie("access_token");

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);

  const [todos, setTodos] = useRecoilState(todoListState);

  const {
    isLoading,
    isSuccess,
    data: todoData,
  } = useQuery({
    queryKey: ["getMyTodosWithDate", { date: getToday(), access_token }],
    queryFn: getMyTodosWithDate,
  });

  useEffect(() => {
    if (todoData) {
      setTodos(todoData);
    }
  }, [isSuccess]);

  return (
    <section className="mb-20 mt-4 flex flex-col">
      <TodoRate isLoading={isLoading} isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todos.results.length !== 0 ? (
        <section>
          <DragTodo />
        </section>
      ) : null}
      <MeGoal />
    </section>
  );
}
