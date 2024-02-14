import { useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import dayjs from "dayjs";

import { goalDday, isImminent, isNew } from "@/util/date";

import "dayjs/locale/ko";
import GoalModal from "../todogoal/goal/GoalModal";
dayjs.locale("en");

export default function GoalList({ date, goal }: any) {
  const pathname = usePathname();
  const route = pathname.split("/")[2];

  const [editGoalModalOpen, setEditGoalModalOpen] = useState(false);

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

  const handleGoalClick = () => {
    if (route === "todogoal") {
      setEditGoalModalOpen(true);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoalClick}
        className={clsx(
          "flex w-full items-center justify-between rounded-xl px-2 py-1",
          route === "todogoal"
            ? "cursor-pointer hover:bg-default-300"
            : "cursor-default",
        )}
      >
        <div className="flex flex-col items-start">
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
        </div>
      </button>
      <GoalModal
        type="edit"
        goal={goal}
        date={date}
        modalOpen={editGoalModalOpen}
        setModalOpen={setEditGoalModalOpen}
      />
    </div>
  );
}
