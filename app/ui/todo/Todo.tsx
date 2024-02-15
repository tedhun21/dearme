import { useEffect, useState } from "react";
import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";
import TodoMenu from "./TodoMenu";
import { todoListState } from "@/store/atoms";
import { useMutation } from "@tanstack/react-query";
import { updateMyTodo, updateMyTodoDone } from "@/store/api";
import { useSetRecoilState } from "recoil";
import XIcon from "@/public/todo/XIcon";
import SendIcon from "@/public/todogoal/SendIcon";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

export default function Todo({ date, todo }: any) {
  const pathname = usePathname();

  const [done, setDone] = useState(todo.done);
  const setTodos = useSetRecoilState(todoListState);

  const [canEdit, setCanEdit] = useState(false);
  const { register, handleSubmit } = useForm();

  // todo done 업데이트
  const {
    mutate: updateMyTodoDoneMutate,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateMyTodoDone"],
    mutationFn: updateMyTodoDone,
  });

  const { mutate: updateMyTodoBodyMutate } = useMutation({
    mutationKey: ["updateMyTodo"],
    mutationFn: updateMyTodo,
  });

  const onSubmit = ({ todoBody }: any) => {
    if (todoBody !== "") {
      updateMyTodoBodyMutate(
        {
          todoId: todo.id,
          updateData: { body: todoBody },
        },
        {
          onSuccess: (data) => {
            setTodos((prev) =>
              prev.map((prevTodo) => {
                if (prevTodo.id === data.id) {
                  return { ...data };
                }
                return prevTodo;
              }),
            );
            setCanEdit(false);
          },
        },
      );
    }
  };

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
      <div className="flex flex-grow gap-3">
        <button onClick={() => setDone((prev: any) => !prev)}>
          {done ? (
            <TodoCheckTrueIcon className="h-6 w-6 fill-current text-default-600 hover:text-default-700" />
          ) : (
            <TodoCheckFalseIcon className="h-6 w-6 fill-current text-default-600 hover:text-default-700" />
          )}
        </button>
        {canEdit ? (
          <input
            {...register("todoBody")}
            defaultValue={todo.body}
            className="text-semibold flex-grow bg-default-300 text-sm text-default-700 focus:bg-default-400 focus:outline-none"
          />
        ) : (
          <span className="text-semibold text-sm text-default-700">
            {todo.body}
          </span>
        )}
      </div>
      {canEdit ? (
        <div className="flex gap-1 text-black">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="transistion-all group h-10 w-10 p-1 duration-200 hover:p-0 active:p-2"
          >
            <button
              type="submit"
              className="flex h-full w-full items-center justify-center rounded-full bg-default-800 transition-all duration-200 hover:bg-default-900"
            >
              <SendIcon className="h-4 w-4 transition-all duration-200 group-hover:h-5 group-hover:w-5 group-active:h-3 group-active:w-3" />
            </button>
          </form>
          <div className="rounded-full hover:bg-default-400">
            <button onClick={() => setCanEdit(false)} className="h-10 w-10 p-2">
              <XIcon />
            </button>
          </div>
        </div>
      ) : (
        <TodoMenu date={date} todo={todo} setCanEdit={setCanEdit} />
      )}
    </div>
  );
}
