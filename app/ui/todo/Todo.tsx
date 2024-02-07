import { useEffect, useState } from "react";
import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";
import TodoSetting from "./TodoSettings";
import { ITodo, todoListState } from "@/store/atoms";
import { useMutation } from "@tanstack/react-query";
import { updateMyTodoDone } from "@/store/api";
import { useSetRecoilState } from "recoil";

export default function Todo({ todo }: { todo: ITodo }) {
  const [done, setDone] = useState(todo.done);
  const setTodos = useSetRecoilState(todoListState);

  // todo done 업데이트
  const {
    mutate: updateMyTodoDoneMutate,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateMyTodoDone"],
    mutationFn: updateMyTodoDone,
  });

  useEffect(() => {
    updateMyTodoDoneMutate({ todoId: todo.id, done });
  }, [done]); // done이 변경될 때마다 호출

  useEffect(() => {
    if (isSuccess && data) {
      setTodos((prev) =>
        prev.map((prevTodo) => {
          if (prevTodo.id === data.id) {
            return { ...prevTodo, done: data.done };
          }
          return prevTodo;
        }),
      );
    }
  }, [isSuccess, data]);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex gap-3">
        <button onClick={() => setDone((prev) => !prev)}>
          {done ? (
            <TodoCheckTrueIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          ) : (
            <TodoCheckFalseIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          )}
        </button>
        <span className="text-semibold text-sm text-default-700">
          {todo.body}
        </span>
      </div>
      <TodoSetting todo={todo} />
    </div>
  );
}
