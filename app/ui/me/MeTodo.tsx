"use client";

import TodoRate from "./plans/TodoRate";
import DragTodo from "../todo/DragTodo";
import { getToday } from "@/util/date";
import { getMyTodosWithDate } from "@/store/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "@/store/atoms";

export default function MeTodo() {
  const [isDrop, setIsDrop] = useState(false);
  const setTodos = useSetRecoilState(todoListState);

  const {
    isSuccess,
    isFetching,
    data: todoData,
  } = useQuery({
    queryKey: ["getMyTodosWithDate"],
    queryFn: () => getMyTodosWithDate({ date: getToday() }),
  });

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setTodos(todoData);
    }
  }, [isSuccess, isFetching]);
  return (
    <div>
      <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todoData.length > 0 && <DragTodo date={getToday()} />}
    </div>
  );
}
