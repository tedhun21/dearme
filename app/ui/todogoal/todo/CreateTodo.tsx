import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import SendIcon from "@/public/todogoal/SendIcon";
import { todoListState } from "@/store/atoms";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function TodogoalCreateTodo({
  date,
  createInput,
  setCreateInput,
  createTodoMutate,
}: any) {
  const [todos, setTodos] = useRecoilState(todoListState);

  const {
    register: todoRegister,
    handleSubmit: handleCreateSubmit,
    setValue: setTodoBodyValue,
  } = useForm();

  const onSubmit = (data: any) => {
    const { createTodoBody } = data;

    if (createTodoBody !== "") {
      createTodoMutate(
        { createData: { date, body: createTodoBody } },
        {
          onSuccess: (data: any) => {
            setTodos((prev) => {
              return [...prev, data];
            });
            setTodoBodyValue("createTodoBody", "");
          },
        },
      );
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {createInput && (
        <div className="w-full rounded-3xl px-5">
          <form
            onSubmit={handleCreateSubmit(onSubmit)}
            className="flex justify-between rounded-xl bg-default-200 px-5 py-3"
          >
            <div className="flex flex-grow items-center gap-3">
              <TodoCheckFalseIcon className="h-6 w-6 fill-current text-default-600 hover:text-default-700" />
              <input
                {...todoRegister("createTodoBody")}
                className="text-semibold flex-grow bg-transparent text-sm text-default-700 focus:outline-none"
                placeholder="Please enter the todo content..."
              />
            </div>
            <div className="transistion-all group h-10 w-10 p-1 duration-200 hover:p-0 active:p-2">
              <button className="flex h-full w-full items-center justify-center rounded-full bg-default-800 transition-all duration-200 hover:bg-default-900">
                <SendIcon className="h-4 w-4 transition-all duration-200 group-hover:h-5 group-hover:w-5 group-active:h-3 group-active:w-3" />
              </button>
            </div>
          </form>
        </div>
      )}
      {/* plus button */}
      <div className="group flex h-12 w-12 items-center justify-center p-1 transition-all duration-200 hover:p-0 active:p-2">
        <button
          onClick={() => setCreateInput((prev: boolean) => !prev)}
          className="h-full w-full rounded-full bg-default-600 p-2 duration-200 group-hover:h-12 group-hover:w-12 group-hover:bg-default-400 group-active:h-8 group-active:w-8"
        >
          {createInput ? <XIcon color="white" /> : <PlusIcon />}
        </button>
      </div>
    </div>
  );
}
