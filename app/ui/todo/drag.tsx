import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Todo from "../me/Todo";
import { useEffect, useState } from "react";

const defaultTodo = [
  { id: 1, body: "스터디", checked: true },
  { id: 2, body: "퇴근", checked: false },
  { id: 3, body: "잠자기", checked: true },
  { id: 5, body: "잠자기", checked: true },
  { id: 4, body: "잠자기", checked: true },
  { id: 6, body: "잠자기", checked: true },
  { id: 7, body: "잠자기", checked: true },
];

type Todo = {
  id: number;
  body: string;
  checked: boolean;
};

const reorder = (list: Object[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  // 배열에서 startIndex에 있는 한 개 요소 제거
  const [removed] = result.splice(startIndex, 1);
  // 제거된 요소를 배열에 하나도 제거하지 않고 endIndex에 추가
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver) => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",

  background: isDraggingOver ? "#143422" : "#F5F3EB",
});

const getTodoStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  padding: 16,
  borderRadius: 12,

  background: isDragging ? "#EDA323" : "#FBFAF2",
  ...draggableStyle,
});

export default function DragTodo() {
  const [enabled, setEnabled] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(defaultTodo);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // console.log(">>> source", source.index);
    // console.log(">>> destination", destination);

    if (!destination) {
      return;
    }

    const _todos = reorder(todos, source.index, destination.index) as Todo[];
    setTodos(_todos);
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getTodoStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    <Todo todo={todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
