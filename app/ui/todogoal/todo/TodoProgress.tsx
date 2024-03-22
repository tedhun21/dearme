import LeftArrowIcon from "@/public/todogoal/LeftArrow";
import ProgressIcon from "@/public/todogoal/ProgressIcon";
import { todoListState } from "@/store/atoms";
import { LinearProgress } from "@mui/material";
import { useRecoilValue } from "recoil";

export default function TodogoalPropgress({ todos }: any) {
  const checkedTodos = todos?.filter((todo: any) => todo.done === true);

  const percent =
    todos && todos.length !== 0
      ? Math.round((checkedTodos?.length / todos.length) * 100)
      : 0;

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl bg-default-900 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <ProgressIcon className="h-8 w-8" />
        </div>
        <span className="text-xl font-semibold">Your Progress</span>
      </div>
      <div className="flex justify-between">
        <div className="flex w-3/4 flex-col gap-3 pb-0.5">
          <div className="flex gap-4">
            <span className="text-xl">
              {percent === 0
                ? "Let's try this!"
                : percent < 50
                  ? "You are doing well!"
                  : percent < 99
                    ? "You are almost there"
                    : percent === 100
                      ? "Well Done!"
                      : null}
            </span>
            <div>^^</div>
          </div>
          <div className="flex items-end gap-2">
            <LinearProgress
              sx={{
                height: "16px",
                borderRadius: "12px",
                width: "100%",
                color: "#143422",
                backgroundColor: "#ffffff",
              }}
              variant="determinate"
              value={percent}
              color="inherit"
            />
            <div>
              <LeftArrowIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="flex w-1/4 items-end justify-around">
          <span className="text-3xl xxs:text-4xl xs:text-5xl">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
