import { goalDday, isImminent, isNew } from "@/util/date";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("en");

export default function GoalList({ date, goal }: any) {
  const splitedGoalDate = goal.endDate.split("-");
  const Dday = date
    ? goalDday({ date, endDate: goal.endDate })
    : goalDday({ endDate: goal.endDate });

  // 월
  const month =
    splitedGoalDate[1] < 10 ? splitedGoalDate[1][1] : splitedGoalDate[1];
  // 일
  const day = splitedGoalDate[2];
  // 요일
  const dayOftheWeek = dayjs(goal.endDate).format("dddd").slice(0, 3);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <div className="flex gap-2">
          {isNew({ date, createdAt: goal.createdAt }) ? (
            <span className="text-2xs font-bold text-red-600">NEW</span>
          ) : null}
          {isImminent({ date, endDate: goal.endDate }) ? (
            <span className="text-2xs font-bold text-red-600">IMMINENT</span>
          ) : null}
        </div>
        <div className="font-bold">&quot;{goal.title}&quot;</div>
        <div className="text-2xs">{`Goal Date: ${month}/${day}, ${splitedGoalDate[0]} (${dayOftheWeek})`}</div>
      </div>
      <div className="flex items-center justify-center">
        <span
          className={clsx(
            "rounded-lg border-2 border-default-700 px-2 font-semibold",
            Dday === "D-Day" ? "bg-default-800 text-white" : "",
          )}
        >
          {Dday}
        </span>
      </div>
    </div>
  );
}
