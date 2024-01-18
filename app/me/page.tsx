"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getTodos } from "@/store/api";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";

import DragTodo from "../ui/todo/Drag";

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);
  const { data: todoData } = useQuery({
    queryKey: ["getTodos"],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (todoData) {
      setTodos(todoData.data.result);
    }
  }, []);

  return (
    <section className="mb-20 flex flex-col">
      <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop ? (
        <section>
          <DragTodo />
        </section>
      ) : null}
      <MeGoal />
    </section>
  );
}
