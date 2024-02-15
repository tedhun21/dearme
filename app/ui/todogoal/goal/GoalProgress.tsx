import { useRecoilValue } from "recoil";

import { goalListState, settingState } from "@/store/atoms";
import DdayGoalList from "./DdayGoalList";

export default function GoalProgress({ date }: any) {
  const goals = useRecoilValue(goalListState);

  const DdayGoal = goals.filter((goal) => goal.endDate === date);

  return (
    <div className="flex w-full flex-col rounded-3xl bg-default-900 p-6">
      <div className="text- font-semibold text-black">COMPLETED</div>
      <div className="mb-2 mt-1 h-[1px] bg-white"></div>
      {DdayGoal.map((goal) => (
        <DdayGoalList key={goal.id} goal={goal} date={date} />
      ))}
    </div>
  );
}
