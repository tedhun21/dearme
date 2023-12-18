"use client";

import Header from "../ui/header";
import BackButton from "../ui/backbutton";
import MeNav from "../ui/me/MeNav";
import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import Todo from "../ui/me/Todo";
import { useState } from "react";

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
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav />
        <article className="flex flex-col px-5 py-3">
          <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop && (
            <section className="relative flex flex-col gap-4 pb-3">
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
              <div className="absolute mx-5 my-9 h-4 w-1 bg-default-400"></div>
            </section>
          )}
          <MeGoal />
        </article>
      </div>
    </main>
  );
}
