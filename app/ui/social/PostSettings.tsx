/* eslint-disable @next/next/no-img-element */
// TODO: 메뉴 디자인 수정 (라디오 버튼, 호버링)
// FIXME: 세팅 메뉴 -> 푸터 이동
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/app/social/page";
import { deletePost } from "@/store/api";
import EditPost from "./EditPost";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

import Comments from "@/public/social/Comments";
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

  // 게시물 (···)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Edit _ post
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditClick = (postId: number) => {
    setEditModalOpen(true);
    setAnchorEl(null);
  };

  // Delete _ post
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
    console.log(postId);
    try {
      deleteMutation.mutate({ postId });
      handleClose();
      window.alert("Deleted your post successfully.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon sx={{ color: "#2D2422" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
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
            width: "160px",
            borderRadius: "16px",
          },
        }}
      >
        {/* 나의 게시물 or 친구 게시물 */}
        {isMyPost ? (
          <div className="flex flex-col pb-3 pl-5 pr-5 pt-3">
            <div className="mb-3 flex items-center">
              <Comments className="mr-1 h-5 w-5 fill-current text-default-600" />

              <div className="text-sm font-medium text-default-700">
                Comments
              </div>
            </div>

            <div className=" ml-3  flex-col ">
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="text- ml-2 font-normal text-default-700">
                  All
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="ml-2 text-sm font-normal text-default-700">
                  Friends
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="ml-2 text-sm font-normal text-default-700">
                  Turn off
                </span>
              </div>
            </div>

            {/* <Divider sx={{ m: 0 }} /> */}

            <button
              className="mb-3 mt-3 flex items-center"
              onClick={() => handleEditClick(postId)}
            >
              <Edit className="mr-1 h-5 w-6 fill-current text-default-600" />

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
                About the account
              </div>
            </div>

            <div className="mb-3 mt-3 flex items-center">
              <FriendRequest className="mr-1 h-5 w-5 fill-current text-default-600" />

              <div className="text-sm font-medium text-default-700">
                Friend Request
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Report className="mr-1 h-4 w-4 fill-current text-default-600" />

              <div className="text-sm font-semibold text-default-700">신고</div>
            </div>
          </div>
        )}
      </Menu>
      {/* 수정 버튼 클릭 */}
      <EditPost
        postId={postId}
        postData={postData}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </div>
  );
}
