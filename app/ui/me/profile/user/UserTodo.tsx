import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";

export default function UserTodo({ todo }: any) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-default-300 p-3">
      {todo.done ? (
        <TodoCheckTrueIcon className="fill current h-6 w-6 text-default-600" />
      ) : (
        <TodoCheckFalseIcon className="fill current h-6 w-6 text-default-600" />
      )}
      <span className="text-sm font-semibold text-default-700">
        {todo.body}
      </span>
    </div>
  );
}
