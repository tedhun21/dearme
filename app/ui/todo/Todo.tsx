import { useState } from "react";

import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";

import TodoSetting from "./TodoSettings";
import { TodoType } from "./Drag";

interface TodoProps {
  todo: TodoType;
}

// todo를 계속 하위 컴포넌트로 내려야하 하는 문제 발생(recoil로 해결 가능할까? 왜 이게 해결책이 되는가?)
export default function Todo({ todo }: TodoProps) {
  const [checked, setChecked] = useState<boolean>(todo.checked);

  const handleToggleClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex gap-3">
        {checked ? (
          <button onClick={handleToggleClick}>
            <TodoCheckTrueIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        ) : (
          <button onClick={handleToggleClick}>
            <TodoCheckFalseIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        )}
        <span className="text-semibold text-sm text-default-700">
          {todo.body}
        </span>
      </div>
      <TodoSetting todo={todo} />
    </div>
  );
}
