"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { todoListState } from "@/store/atoms";
import { getTodos } from "@/store/api";

import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";

import DragTodo from "../ui/todo/Drag";
import UserProfile from "../ui/me/UserProfile";
import MeNav from "../ui/me/MeNav";

import Footer from "../ui/footer";

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
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <UserProfile />
        <MeNav />
        <section className="flex flex-col py-3">
          <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop ? (
            <section>
              <DragTodo />
            </section>
          ) : null}
          <MeGoal />
        </section>
        <Footer />
      </div>
    </main>
  );
}
