import UserTodo from "./UserTodo";

export default function UserTodos({ todos }: any) {
  return (
    <div className="flex flex-col gap-2 bg-default-200 p-4">
      {todos.map((todo: any) => (
        <UserTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
