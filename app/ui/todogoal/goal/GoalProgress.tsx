import { useRecoilValue } from "recoil";

import { goalListState, settingState } from "@/store/atoms";
import DdayGoalList from "./DdayGoalList";
import dayjs from "dayjs";

export default function GoalProgress() {
  const { todogoalDate } = useRecoilValue(settingState);
  const goals = useRecoilValue(goalListState);

  const DdayGoals = goals.filter(
    (goal) => goal.endDate === dayjs(todogoalDate).format("YYYY-MM-DD"),
  );

  return (
    <div className="flex w-full flex-col rounded-3xl bg-default-900 p-6">
      <div className="text- font-semibold text-black">COMPLETED</div>
      <div className="mb-2 mt-1 h-[1px] bg-white"></div>
      {DdayGoals.map((goal) => (
        <DdayGoalList key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
