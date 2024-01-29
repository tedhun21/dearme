import DownDropdownIcon from "@/public/me/DownDropdownIcon";
import UpDropdownIcon from "@/public/me/UpDropdownIcon";
import { ITodo, todoListState } from "@/store/atoms";
import { LinearProgress } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";

interface TodoRateProps {
  isLoading: boolean;
  isDrop: boolean;
  setIsDrop: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoRate({
  isLoading,
  isDrop,
  setIsDrop,
}: TodoRateProps) {
  const todos = useRecoilValue(todoListState);
  const checkedTodos = todos?.filter((todo: ITodo) => todo.done === true);

  return (
    <section className="flex items-center justify-between px-4 pb-2">
      <div className="flex items-center gap-2">
        {isLoading || todos.length === 0 ? null : (
          <button onClick={() => setIsDrop((prev: any) => !prev)}>
            {isDrop ? (
              <UpDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
            ) : (
              <DownDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
            )}
          </button>
        )}
        <h1 className="text-base font-semibold text-default-700">Daily</h1>
      </div>

      <LinearProgress
        sx={{
          height: "16px",
          borderRadius: "12px",
          width: "100%",
          color: "#143422",
          mx: 2,
        }}
        variant="determinate"
        value={
          todos && todos.length !== 0
            ? (checkedTodos?.length / todos.length) * 100
            : 0
        }
        color="inherit"
      />

      <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
        {todos && checkedTodos?.length} / {todos.length}
      </span>
    </section>
  );
}
