"use client";

import { getUserGoalsWithDate } from "@/store/api";
import { getToday } from "@/util/date";
import { useQuery } from "@tanstack/react-query";

import GoalList from "../../GoalList";

export default function UserGoal({ user }: any) {
  const { data: goalData } = useQuery({
    queryKey: ["getUserGoalsWithDate"],
    queryFn: () => getUserGoalsWithDate({ userId: user.id, date: getToday() }),
    enabled: !!user,
  });

  const publicGoalData = goalData?.filter(
    (goal: any) => goal.isPublic === true,
  );

  return (
    <section className="px-4">
      <div className="font-semibold text-default-700">Goal</div>
      <div className="flex flex-col gap-3 rounded-xl bg-default-100 px-4 py-3">
        {Array.isArray(publicGoalData) && publicGoalData.length !== 0 ? (
          publicGoalData.map((goal: any) => (
            <GoalList key={goal.id} route="home" goal={goal} />
          ))
        ) : (
          <div className="text-center font-bold">No Goal</div>
        )}
      </div>
    </section>
  );
}
