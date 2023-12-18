import DownDropdownIcon from "@/public/me/DownDropdownIcon";
import UpDropdownIcon from "@/public/me/UpDropdownIcon";
import { LinearProgress } from "@mui/material";
import React, { useState } from "react";

interface TodoRateProps {
  todos: Todo[];
  isDrop: boolean;
  setIsDrop: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Todo {
  id: number;
  body: string;
  checked: boolean;
}

export default function TodoRate({ todos, isDrop, setIsDrop }: TodoRateProps) {
  const checkedTodos = todos.filter((todo) => todo.checked === true);
  return (
    <section className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-2">
        <button onClick={() => setIsDrop((prev) => !prev)}>
          {isDrop ? (
            <DownDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
          ) : (
            <UpDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
          )}
        </button>
        <h1 className="text-base font-semibold text-default-700">Daily</h1>
      </div>

      <LinearProgress
        sx={{
          height: "12px",
          borderRadius: "12px",
          width: "100%",
          color: "#143422",
          mx: 2,
        }}
        variant="determinate"
        value={(checkedTodos.length / todos.length) * 100}
        color="inherit"
      />

      <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
        {checkedTodos.length} / {todos.length}
      </span>
    </section>
  );
}
