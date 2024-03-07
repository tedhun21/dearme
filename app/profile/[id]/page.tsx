"use client";

import { useState } from "react";

import MeGoal from "@/app/ui/me/plans/MeGoal";

import TodoRate from "@/app/ui/me/plans/TodoRate";

import UserProfile from "@/app/ui/me/UserProfile";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserTodosWithDate } from "@/store/api";
import { getToday } from "@/util/date";

export default function Profile() {
  const { id: profileId } = useParams();
  const [isDrop, setIsDrop] = useState(false);

  const { data: todos } = useQuery({
    queryKey: ["getUserTodosWithDate"],
    queryFn: () => getUserTodosWithDate({ profileId, date: getToday() }),
  });

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <UserProfile />
        <section className="mb-20 mt-4 flex flex-col">
          <TodoRate todos={todos?.results} />

          {/* <UserGoal /> */}
        </section>
      </div>
    </main>
  );
}
