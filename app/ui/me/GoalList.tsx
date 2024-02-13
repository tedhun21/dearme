import { usePathname } from "next/navigation";

import clsx from "clsx";
import dayjs from "dayjs";

import { goalDday, isImminent, isNew } from "@/util/date";
import GoalMenu from "../todogoal/goal/GoalMenu";

import "dayjs/locale/ko";
dayjs.locale("en");

export default function GoalList({ date, goal, setModalCreateGoalOpen }: any) {
  const pathname = usePathname();

  const route = pathname.split("/")[2];
  const splitedGoalDate = goal.endDate
    ? goal?.endDate?.split("-")
    : ["", "", ""];
  const Dday = date
    ? goalDday({ date, endDate: goal.endDate })
    : goalDday({ endDate: goal.endDate });

  // 월
  const month =
    splitedGoalDate && splitedGoalDate[1]
      ? splitedGoalDate[1] < 10
        ? splitedGoalDate[1][1]
        : splitedGoalDate[1]
      : "";
  // 일
  const day = splitedGoalDate ? splitedGoalDate[2] : "";
  // 요일
  const dayOftheWeek = goal?.endDate
    ? dayjs(goal.endDate).format("dddd").slice(0, 3)
    : "";

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
        <div className="text-2xs">{`Goal Date: ${month}/${day}, ${
          splitedGoalDate && splitedGoalDate[0]
        } (${dayOftheWeek})`}</div>
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
        {route === "todogoal" && (
          <GoalMenu
            goal={goal}
            setModalCreateGoalOpen={setModalCreateGoalOpen}
          />
        )}
      </div>
    </div>
  );
}
