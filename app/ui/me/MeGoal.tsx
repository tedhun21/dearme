"use client";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import GoalList from "./GoalList";

import { getMyGoals } from "@/store/api";
import { getToday } from "@/util/date";
import { usePathname } from "next/navigation";

export default function MeGoal() {
  const pathname = usePathname();

  const { data: goalData } = useQuery({
    queryKey: ["getMyGoals"],
    queryFn: () => getMyGoals({ date: getToday() }),
  });

  return (
    <section className={clsx(pathname === "/" ? "" : "px-4")}>
      {pathname !== "/" ? (
        <div className="font-semibold text-default-700">Goal</div>
      ) : null}
      <div
        className={clsx(
          "flex flex-col gap-3 bg-default-100 px-4 py-3",
          pathname === "/" ? "rounded-none" : "rounded-xl",
        )}
      >
        {Array.isArray(goalData) && goalData.length !== 0 ? (
          goalData.map((goal: any) => <GoalList key={goal.id} goal={goal} />)
        ) : (
          <div className="text-center font-bold">No Goal</div>
        )}
      </div>
    </section>
  );
}
