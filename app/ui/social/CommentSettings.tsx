/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/store/api";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

import Comments from "@/public/social/Comments";
import Delete from "@/public/social/Delete";
import Edit from "@/public/social/Edit";

interface CommentSettingsProps {
  postId: number;
  commentId: number;
  onEditClick: () => void;
}
export default function CommentSettings({
  postId,
  commentId,
  onEditClick,
}: CommentSettingsProps) {
  const queryClient = useQueryClient();

  // 게시물 (···)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete _ comment
  const deleteMutation = useMutation({
    mutationKey: ["deletedComment"],
    mutationFn: (variables: { postId: number; commentId: number }) => {
      const { postId, commentId } = variables;
      return deleteComment(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDeleteComment = async () => {
    try {
      deleteMutation.mutate({ postId, commentId });
      handleClose();
      window.alert("Deleted your comment successfully.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = () => {
    handleClose();
    onEditClick();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "#2D2422", fontSize: 16 }} />
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
            borderRadius: "16px",
          },
        }}
      >
        <div className="flex flex-col px-3">
          <button className="my-1 flex items-center" onClick={handleEditClick}>
            {/* <Edit className="mr-1 h-5 w-6 fill-current text-default-600" /> */}

            <div className=" text-sm font-medium text-default-700">Edit</div>
          </button>

          <button
            className="my-1 flex items-center"
            onClick={() => handleDeleteComment()}
          >
            {/* <Delete className="mr-1 h-5 w-6 fill-current text-default-600" /> */}
            <div className="text-sm font-medium text-red-500">Delete</div>
          </button>
        </div>
      </Menu>
    </div>
  );
}
