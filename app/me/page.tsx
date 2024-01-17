"use client";

import Header from "../ui/header";
import BackButton from "../ui/backbutton";
import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import { useState } from "react";
import UserNav from "../ui/me/UserNav";
import DragTodo from "../ui/todo/Drag";

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
        <UserNav />
        <article className="flex flex-col py-3">
          <TodoRate todos={todos} isDrop={isDrop} setIsDrop={setIsDrop} />
          {isDrop && (
            <section>
              <DragTodo />
            </section>
          )}
          <MeGoal />
        </article>
      </div>
    </main>
  );
}
