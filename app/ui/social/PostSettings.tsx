/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/app/social/page";
import { deletePost } from "@/store/api";
import EditPost from "./EditPost";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Delete from "@/public/social/Delete";
import Edit from "@/public/social/Edit";
import User from "@/public/social/User";
import FriendRequest from "@/public/social/FriendRequest";
import Report from "@/public/social/Report";

// 나의 게시물 / 친구 게시물 : isMyPost(boolean)
interface PostSettingsProps {
  isMyPost: boolean;
  postId: number;
  postData: Post;
}
export default function PostSettings({
  isMyPost,
  postId,
  postData,
}: PostSettingsProps) {
  const queryClient = useQueryClient();

  // 게시물 (···) 메뉴
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Edit post -> EditPost modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditClick = (postId: number) => {
    const result = window.confirm("Would you like to edit your post?");
    if (result) {
      setEditModalOpen(true);
      setAnchorEl(null);
    }
  };

  // Delete post
  const deleteMutation = useMutation({
    mutationKey: ["deletedPost"],
    mutationFn: (variables: { postId: number }) => {
      const { postId } = variables;
      return deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDeletePost = async () => {
    const result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      try {
        deleteMutation.mutate({ postId });
        handleClose();
        window.alert("Deleted your post successfully.");
      } catch (e) {
        console.error(e);
      }
    }
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <IconButton onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "#2D2422", fontSize: 20 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiMenu-paper": {
            // backgroundColor: "transparent",
            boxShadow: "none",
            width: "100px",
            borderRadius: "16px",
          },
        }}
      >
        {/* 나의 게시물 or 친구 게시물 */}
        {isMyPost ? (
          <div className="flex flex-col px-5 py-1 ">
            {/* <Divider sx={{ m: 0 }} /> */}

            <button
              className="mb-1 mt-1 flex items-center "
              onClick={() => handleEditClick(postId)}
            >
              <Edit className="mr-1 h-5 w-4 fill-current text-default-600" />

              <div className=" text-sm font-medium text-default-700">Edit</div>
            </button>

            <button
              className="mt-2 flex items-center"
              onClick={() => handleDeletePost()}
            >
              <Delete className="mr-1 h-5 w-6 fill-current text-default-600" />
              <div className="text-sm font-medium text-default-700">Delete</div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col pb-3 pl-5 pr-5 pt-3">
            <div className="mb-3 flex items-center">
              <User className="mr-1 h-5 w-5 fill-current text-default-600" />

              <div className="text-sm font-medium text-default-700">
                About this account
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Report className="mr-1 h-4 w-4 fill-current text-default-600" />
              <div className="text-sm font-semibold text-default-700">
                Report
              </div>
            </div>
          </div>
        )}
      </Menu>

      {/* 수정 버튼 클릭 */}
      {editModalOpen && (
        <EditPost
          postId={postId}
          postData={postData}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}
