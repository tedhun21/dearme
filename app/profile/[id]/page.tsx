"use client";

import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import MeGoal from "@/app/ui/me/MeGoal";
import MeNav from "@/app/ui/me/MeNav";
import TodoRate from "@/app/ui/me/TodoRate";
import { useParams } from "next/navigation";

export default function Profile() {
  const params = useParams();
  console.log(params);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav />
        <article className="flex flex-col gap-8 px-5 py-3">
          <TodoRate />
          <MeGoal />
        </article>
      </div>
    </main>
  );
}
