import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import XIcon from "@/public/todo/XIcon";
import EditIcon from "@/public/me/EditIcon";
import { useMutation } from "@tanstack/react-query";
import { deleteMyGoal } from "@/store/api";
import { useSetRecoilState } from "recoil";
import { goalListState } from "@/store/atoms";
import GoalModal from "./GoalModal";

export default function GoalMenu({ goal, setModalCreateGoalOpen }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const setGoals = useSetRecoilState(goalListState);
  const [editGoalModalOpen, setEditGoalModalOpen] = useState(false);

  const { mutate: deleteGoalMutate, data } = useMutation({
    mutationKey: ["deleteMyGoal"],
    mutationFn: deleteMyGoal,
    onSuccess: (data) => {
      setAnchorEl(null);
      setModalCreateGoalOpen(false);

      setGoals((prev) =>
        prev.filter((prevGoal) => prevGoal.id !== data.goalId),
      );
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteGoal = () => {
    deleteGoalMutate({ deleteId: goal.id });
  };

  return (
    <div>
      <IconButton id="basic-button" onClick={handleClick}>
        <MoreHorizIcon />
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
            onClick={() => setEditGoalModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1 hover:bg-default-200 active:bg-default-300"
          >
            <EditIcon className="h-5 w-5 fill-current text-default-600" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDeleteGoal()}
            className="flex items-center gap-1 px-3 py-1 hover:bg-default-200 active:bg-default-300"
          >
            <XIcon className="h-5 w-5" color="red" />
            <span className="text-red-500">Delete</span>
          </button>
        </div>
        <GoalModal
          type="edit"
          goal={goal}
          modalOpen={editGoalModalOpen}
          setModalOpen={setEditGoalModalOpen}
          setAnchorEl={setAnchorEl}
        />
      </Menu>
    </div>
  );
}
