"use client";

import MeGoal from "@/app/ui/me/MeGoal";
import MeNav from "@/app/ui/me/UserProfile";
import Todo from "@/app/ui/todo/Todo";
import TodoRate from "@/app/ui/me/TodoRate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { todoListState } from "@/store/atoms";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getTodosWithDate } from "@/store/api";
import getToday from "@/util/getDate";

const me = {
  id: 1,
  username: "doe",
  posts: [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ],
  friends: [{ id: 2, username: "ryan" }],
};

export default function Profile() {
  const params = useParams();

  const [isDrop, setIsDrop] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);

  const { data: todoData } = useQuery({
    queryKey: ["getTodosWithDate", { date: getToday() }],
    queryFn: getTodosWithDate,
  });

  useEffect(() => {
    if (todoData) {
      setTodos(todoData.data.result);
    }
  }, []);

  console.log(todos);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <MeNav />
        <section className="mb-20 mt-4 flex flex-col">
          <TodoRate isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop && (
            <section className="relative flex flex-col gap-4 pb-3">
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
              <div className="absolute mx-5 my-9 h-4 w-1 bg-default-400"></div>
            </section>
          )}
          <MeGoal />
        </section>
      </div>
    </main>
  );
}
