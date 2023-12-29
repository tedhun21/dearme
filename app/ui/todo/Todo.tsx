import { useEffect, useRef, useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";
import GoalIcon from "@/public/todo/GoalIcon";

interface TodoProps {
  todo: {
    id: number;
    body: string;
    checked: boolean;
  };
}

export default function Todo({ todo }: TodoProps) {
  const [checked, setChecked] = useState<boolean>(todo.checked);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleToggleClick = () => {
    setChecked((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex gap-3">
        {todo.checked ? (
          <button onClick={handleToggleClick}>
            <TodoCheckTrueIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        ) : (
          <button onClick={handleToggleClick}>
            <TodoCheckFalseIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        )}
        <span className="text-semibold text-sm text-default-700">
          {todo.body}
        </span>
      </div>
      <div>
        <IconButton id="basic-button" onClick={handleClick}>
          <MoreHorizIcon sx={{ color: "#2D2422" }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem>
            <GoalIcon />
            <span>목표 설정</span>
          </MenuItem>
          <MenuItem onClick={handleClose}></MenuItem>
        </Menu>
      </div>
    </div>
  );
}
