import { useState } from "react";

import GoalIcon from "@/public/todo/GoalIcon";

import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TodoSetting from "./TodoSetting";
import { Todo } from "./Drag";

const todoSettingKeyword = [
  { value: "all", keyword: "모두" },
  { value: "friend", keyword: "친구만" },
  { value: "private", keyword: "비공개" },
];

export default function TodoSettings({ todo }: Todo) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <div className="flex items-center gap-1 px-3 py-1">
            <GoalIcon className="h-5 w-5 fill-current text-default-600" />
            <span>할 일 설정</span>
          </div>
          <Divider />
          <div className="flex flex-col px-3 py-1">
            {todoSettingKeyword.map((setting, index) => (
              <TodoSetting
                key={index}
                setting={setting}
                handleClose={handleClose}
                todo={todo}
              />
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
}
