"use client";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import GoalList from "./GoalList";

import { getMyGoals } from "@/store/api";
import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";

type MeGoalProps = {
  route?: string;
};

const access_token = getCookie("access_token");

export default function MeGoal({ route }: MeGoalProps) {
  const { data: goalData } = useQuery({
    queryKey: ["getMyGoals", { date: getToday(), access_token }],
    queryFn: getMyGoals,
  });

  return (
    <section className={clsx(route === "home" ? "" : "px-4")}>
      {route !== "home" ? (
        <div className="font-semibold text-default-700">Goal</div>
      ) : null}
      <div
        className={clsx(
          "flex flex-col gap-3 bg-default-100 px-4 py-3",
          route === "home" ? "rounded-none" : "rounded-xl",
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
