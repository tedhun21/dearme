import { useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import dayjs from "dayjs";

import {
  dayOftheWeek,
  diffBetweenTwoDates,
  goalDday,
  isImminent,
  isNew,
  returnDate,
} from "@/util/date";

import "dayjs/locale/ko";
import GoalModal from "../todogoal/goal/GoalModal";
dayjs.locale("en");

export default function GoalList({ date, route, goal }: any) {
  const [editGoalModalOpen, setEditGoalModalOpen] = useState(false);

  const {
    year: startYear,
    month: startMonth,
    day: startDay,
  } = returnDate(goal.startDate);
  const {
    year: endYear,
    month: endMonth,
    day: endDay,
  } = returnDate(goal.endDate);

  const Dday = date
    ? goalDday({ date, endDate: goal.endDate })
    : goalDday({ endDate: goal.endDate });

  // edit goal modal open
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
          "flex h-full w-full items-center justify-between rounded-xl px-2 py-1",
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
          <span className="font-bold">&quot;{goal.title}&quot;</span>
          <div className="flex flex-col items-start">
            {route === "todogoal" && (
              <div className="text-2xs">{`Start Date: ${startMonth}/${startDay}, ${startYear} (${dayOftheWeek(
                goal.startDate,
              )})`}</div>
            )}
            <div className="text-2xs">{`${
              route === "todogoal" ? `End Date` : "Goal Date"
            }: ${endMonth}/${endDay}, ${endYear} (${dayOftheWeek(
              goal.endDate,
            )})`}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {route !== "home" && (
            <div className="flex gap-1 text-sm">
              <span>Duration:</span>
              <span>
                {diffBetweenTwoDates({
                  startDate: goal.startDate,
                  endDate: goal.endDate,
                })}
              </span>
            </div>
          )}
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
