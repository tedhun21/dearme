import { useState } from "react";

import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";

import { Modal } from "@mui/joy";
import { IconButton, Menu, Switch } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import XIcon from "@/public/todo/XIcon";
import EditIcon from "@/public/me/EditIcon";
import { deleteMyTodo } from "@/store/api";
import { todoListState } from "@/store/atoms";
import CreateTodoModal from "../todogoal/goal/CreateGoalModal";

export default function TodoSetting({ date, todo, setCanEdit }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const setTodos = useSetRecoilState(todoListState);

  // delete Todo
  const { mutate: deleteTodoMutate, data } = useMutation({
    mutationKey: ["deleteMyTodo"],
    mutationFn: deleteMyTodo,
    onSuccess: ({ data }: any) => {
      setAnchorEl(null);
      setTodos((prev) =>
        prev.filter((prevTodo) => prevTodo.id !== data.todoId),
      );
    },
    onError: () => {
      window.alert("Fail to delete todo");
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // todo delete 버튼
  const handleDeleteTodo = (deleteId: number) => {
    deleteTodoMutate({ todoId: deleteId });
  };

  return (
    <div>
      <IconButton id="basic-button" onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "#2D2422" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: "120px",
            borderRadius: "16px",
          },
        }}
      >
        <div className="flex flex-col">
          <button
            onClick={() => setCanEdit(true)}
            className="flex items-center gap-1 px-3 py-1 hover:bg-default-200 active:bg-default-300"
          >
            <EditIcon className="h-5 w-5 fill-current text-default-600" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="flex items-center gap-1 px-3 py-1 hover:bg-default-200 active:bg-default-300"
          >
            <XIcon className="h-5 w-5" color="red" />
            <span className="text-red-500">Delete</span>
          </button>
        </div>
      </Menu>
    </div>
  );
}
