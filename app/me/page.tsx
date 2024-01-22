"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getTodosWithDate } from "@/store/api";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";

import DragTodo from "../ui/todo/Drag";
import getToday from "@/util/getDate";

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);
  const { data: todoData } = useQuery({
    queryKey: ["getTodosWithDate", { date: getToday(), isMe: true }],
    queryFn: getTodosWithDate,
  });

  useEffect(() => {
    if (todoData) {
      setTodos(todoData.data.result);
    }
  }, []);

  return (
    <section className="mb-20 mt-4 flex flex-col">
      <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todos.length !== 0 ? (
        <section>
          <DragTodo />
        </section>
      ) : null}
      <MeGoal />
    </section>
  );
}
