"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { todoListState } from "@/store/atoms";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import DragTodo from "../ui/todo/DragTodo";
import { getToday } from "@/util/date";

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);

  const todos = useRecoilValue(todoListState);

  return (
    <section className="mb-20 mt-4 flex flex-col">
      <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
      {isDrop && todos?.length !== 0 ? (
        <section>
          <DragTodo date={getToday()} />
        </section>
      ) : null}
      <MeGoal />
    </section>
  );
}
