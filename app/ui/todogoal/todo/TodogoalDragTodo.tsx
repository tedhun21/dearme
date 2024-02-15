import DragTodo from "../../todo/Drag";

export default function TodogoalDragTodo({ date }: any) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full overflow-hidden rounded-3xl bg-default-200">
        <DragTodo date={date} />
      </div>
    </div>
  );
}
