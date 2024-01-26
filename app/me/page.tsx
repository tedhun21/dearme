"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getMyTodosWithDate } from "@/store/api";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";

import DragTodo from "../ui/todo/Drag";
import { getToday } from "@/util/getDate";
import { getCookie } from "@/util/tokenCookie";

const access_token = getCookie("access_token");

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);

  const { isLoading, data: todoData } = useQuery({
    queryKey: ["getMyTodosWithDate", { date: getToday(), access_token }],
    queryFn: getMyTodosWithDate,
  });

  useEffect(() => {
    if (todoData) {
      setTodos(todoData.data.results);
    }
  }, []);

  return (
    <section className="mb-20 mt-4 flex flex-col">
      <TodoRate isLoading={isLoading} isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todos.length > 0 ? (
        <section>
          <DragTodo />
        </section>
      ) : null}
      <MeGoal />
    </section>
  );
}
