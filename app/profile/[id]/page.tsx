"use client";

import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import MeGoal from "@/app/ui/me/MeGoal";
import MeNav from "@/app/ui/me/UserProfile";
import Todo from "@/app/ui/todo/Todo";
import TodoRate from "@/app/ui/me/TodoRate";
import { useParams } from "next/navigation";
import { useState } from "react";

const me = {
  id: 1,
  username: "doe",
  posts: [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ],
  friends: [{ id: 2, username: "ryan" }],
};

const other = {
  id: 2,
  username: "ryan",
  posts: [
    { id: 1, title: "안녕하세요" },
    { id: 2, title: "안녕히계세요" },
  ],
  friends: [{ id: 1, username: "doe" }],
};

const todos = [
  { id: 1, body: "스터디", checked: true },
  { id: 2, body: "퇴근", checked: false },
  { id: 3, body: "잠자기", checked: true },
  { id: 4, body: "잠자기", checked: true },
  { id: 5, body: "잠자기", checked: true },
  { id: 6, body: "잠자기", checked: true },
  { id: 7, body: "잠자기", checked: true },
];

export default function Profile() {
  const params = useParams();
  const [isDrop, setIsDrop] = useState(false);
  console.log(params);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav user={other} myId={me.id} />
        <article className="flex flex-col gap-8 px-5 py-3">
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
