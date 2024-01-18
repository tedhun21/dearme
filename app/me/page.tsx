"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getTodos } from "@/store/api";

import Header from "../ui/header";
import BackButton from "../ui/backbutton";
import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import UserNav from "../ui/me/UserNav";
import DragTodo from "../ui/todo/Drag";

const me = {
  id: 1,
  username: "doe",
  posts: [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ],
  friends: [{ id: 2, username: "ryan" }],
};

export default function Me() {
  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);
  const { data } = useQuery({
    queryKey: ["getTodos"],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (data) {
      setTodos(data.data.result);
    }
  }, []);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <UserNav />
        <article className="flex flex-col py-3">
          <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop ? (
            <section>
              <DragTodo />
            </section>
          ) : null}
          <MeGoal />
        </article>
      </div>
    </main>
  );
}
