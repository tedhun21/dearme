"use client";

import Header from "../ui/header";
import BackButton from "../ui/backbutton";
import MeNav from "../ui/me/MeNav";
import TodoRate from "../ui/me/TodoRate";
import MeGoal from "../ui/me/MeGoal";
import Todo from "../ui/me/Todo";

const todos = [
  { id: 1, body: "스터티", checked: true },
  { id: 2, body: "퇴근", checked: false },
];

export default function Me() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav />
        <article className="flex flex-col px-5 py-3">
          <TodoRate />
          <section className="relative flex flex-col gap-4 pb-3">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
            <div className="absolute mx-5 my-9 h-4 w-1 bg-default-400"></div>
          </section>
          <MeGoal />
        </article>
      </div>
    </main>
  );
}
