import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Todo from "./Todo";

import { ITodo, todoListState } from "@/store/atoms";

// 배열 순서 바꾸는 함수
const reorder = (list: ITodo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  // 배열에서 startIndex에 있는 한 개 요소 제거
  const [removed] = result.splice(startIndex, 1);
  // 제거된 요소를 배열에 하나도 제거하지 않고 endIndex에 추가
  result.splice(endIndex, 0, removed);

  return result;
};

// drappable style
const getListStyle = (isDraggingOver: any) => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",

  background: isDraggingOver ? "#143422" : "#F5F3EB",
});

// draggable style
const getTodoStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: "none",
  borderRadius: 12,

  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  border: isDragging ? "solid #928C7F 2px" : "none",
  background: isDragging ? "#EDA323" : "#FBFAF2",
  ...draggableStyle,
});

export default function DragTodo() {
  const [enabled, setEnabled] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // console.log(">>> source", source.index);
    // console.log(">>> destination", destination);

    if (!destination) {
      return;
    }

    setTodos((prevTodos) => {
      const reorderedResults = reorder(
        prevTodos.results,
        source.index,
        destination.index,
      );
      return {
        ...prevTodos,
        results: reorderedResults,
      };
    });

    // const _todos = reorder(todos.results, source.index, destination.index);
    // setTodos(_todos);
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
            style={getListStyle(snapshot.isDraggingOver) as any}
          >
            {todos?.results.map((todo: ITodo, index: number) => (
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
