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

const todos = [
  { id: 1, body: "스터디", checked: true },
  { id: 2, body: "퇴근", checked: false },
  { id: 3, body: "잠자기", checked: true },
  { id: 4, body: "잠자기", checked: true },
  { id: 5, body: "잠자기", checked: true },
  { id: 6, body: "잠자기", checked: true },
  { id: 7, body: "잠자기", checked: true },
];

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
