import dayjs from "dayjs";

export default function DdayGoalList({ date, goal }: any) {
  const splitedGoalDate = goal.endDate.split("-");

  // 월
  const month =
    splitedGoalDate[1] < 10 ? splitedGoalDate[1][1] : splitedGoalDate[1];
  // 일
  const day = splitedGoalDate[2];
  // 요일
  const dayOftheWeek = dayjs(goal.endDate).format("dddd").slice(0, 3);
  return (
    <div key={goal.id}>
      <div className="flex h-full gap-2">
        <div className="h-full w-1 bg-default-800" />
        <div>
          <span className="text-2xl font-bold text-black">
            &quot;{goal.title}&quot;
          </span>
          <div className="text-xs">{`Goal Date: ${month}/${day}, ${splitedGoalDate[0]} (${dayOftheWeek})`}</div>
        </div>
      </div>
    </div>
  );
}
