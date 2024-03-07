"use client";
import clsx from "clsx";

import GoalList from "../GoalList";

import { getToday } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import { getMyGoals } from "@/store/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MeGoal({ route }: any) {
  const { data: goalData } = useQuery({
    queryKey: ["getMyGoals"],
    queryFn: () => getMyGoals({ date: getToday() }),
  });

  return (
    <section className={clsx(route === "/" ? "" : "px-4")}>
      {route !== "/" ? (
        <div className="font-semibold text-default-700">Goal</div>
      ) : null}
      <div
        className={clsx(
          "flex flex-col gap-3 bg-default-100 px-4 py-3",
          route === "/" ? "rounded-b-xl" : "rounded-xl",
        )}
      >
        {Array.isArray(goalData) && goalData.length !== 0 ? (
          goalData.map((goal: any) => (
            <GoalList key={goal.id} route="home" goal={goal} />
          ))
        ) : (
          <div className="text-center font-bold">No Goal</div>
        )}
      </div>
    </section>
  );
}
