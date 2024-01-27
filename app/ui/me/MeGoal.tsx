"use client";

import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";
import dayjs from "dayjs";

import { getMyGoals } from "@/store/api";
import { goalListState } from "@/store/atoms";
import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";
import { useEffect } from "react";
import GoalList from "./GoalList";

type MeGoalProps = {
  route?: string;
};

const access_token = getCookie("access_token");

export default function MeGoal({ route }: MeGoalProps) {
  const [goals, setGoals] = useRecoilState(goalListState);

  const { isSuccess, data: goalData } = useQuery({
    queryKey: ["getMyGoals", { date: getToday(), access_token }],
    queryFn: getMyGoals,
  });

  useEffect(() => {
    if (goalData?.data) {
      setGoals(goalData.data.results);
    }
  }, [isSuccess]);

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
        {Array.isArray(goals) && goals.length > 0 ? (
          goals.map((goal: any) => <GoalList key={goal.id} goal={goal} />)
        ) : (
          <div className="text-center font-bold">No Goal</div>
        )}
      </div>
    </section>
  );
}
