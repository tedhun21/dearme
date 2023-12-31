import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Todo from "./Todo";
import { useEffect, useState } from "react";

const defaultTodo = [
  { id: 1, body: "스터디", checked: true, private: "all" },
  { id: 2, body: "퇴근", checked: false, private: "private" },
  { id: 3, body: "잠자기", checked: true, private: "all" },
  { id: 5, body: "잠자기", checked: true, private: "friend" },
  { id: 4, body: "잠자기", checked: true, private: "all" },
  { id: 6, body: "잠자기", checked: true, private: "private" },
  { id: 7, body: "잠자기", checked: true, private: "all" },
];

enum privateType {
  모두 = "all",
  친구만 = "friend",
  비공개 = "private",
}

export interface Todo {
  id: number;
  body: string;
  checked: boolean;
  private: privateType;
}

export default function DragTodo() {
  const [enabled, setEnabled] = useState(false);
  const [todos, setTodos] = useState(defaultTodo);

  // 배열 순서 바꾸는 함수
  const reorder = (list: Object[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    // 배열에서 startIndex에 있는 한 개 요소 제거
    const [removed] = result.splice(startIndex, 1);
    // 제거된 요소를 배열에 하나도 제거하지 않고 endIndex에 추가
    result.splice(endIndex, 0, removed);

    return result;
  };

  // drappable style
  const getListStyle = (isDraggingOver) => ({
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",

    background: isDraggingOver ? "#143422" : "#F5F3EB",
  });

  // draggable style
  const getTodoStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    borderRadius: 12,

    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    border: isDragging ? "solid #928C7F 2px" : "none",
    background: isDragging ? "#EDA323" : "#FBFAF2",
    ...draggableStyle,
  });

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
