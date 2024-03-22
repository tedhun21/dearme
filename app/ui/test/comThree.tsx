"use client";

import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getMyTodosWithDate } from "@/store/api";

export default function Component3() {
  const [todos, setTodos] = useRecoilState(todoListState);

  const { isSuccess, data: todoData } = useQuery({
    queryKey: ["getMyTodosWithDate"],
    queryFn: () => getMyTodosWithDate({ date: "2024-03-01" }),
  });

  useEffect(() => {
    if (isSuccess) {
      setTodos(todoData);
    }
  }, [isSuccess]);

  return (
    <div>
      <span>Client Side</span>
      <div className="flex flex-col items-start">
        {todos.map((todo) => (
          <button key={todo.id}>{todo.body}</button>
        ))}
      </div>
    </div>
  );
}
