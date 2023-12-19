/* eslint-disable @next/next/no-img-element */
// TODO: 메뉴 디자인 수정 (라디오 버튼, 호버링)

import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

import Comments from "@/public/social/Commets";
import Delete from "@/public/social/Delete";
import Edit from "@/public/social/Edit";
import User from "@/public/social/User";
import FriendRequest from "@/public/social/FriendRequest";
import Report from "@/public/social/Report";

// 나의 게시물 / 친구 게시물 : isMyPost(boolean)

export default function PostSettings({ isMyPost }: { isMyPost: boolean }) {
  // 게시물 (···)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

              <div className="text-sm font-semibold text-default-700">
                댓글 설정
              </div>
            </div>

            <div className=" ml-3  flex-col ">
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="ml-2 text-sm font-semibold text-default-700">
                  전체
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="ml-2 text-sm font-semibold text-default-700">
                  친구
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <input type="radio" name="radioOption" />
                <span className="ml-2 text-sm font-semibold text-default-700">
                  댓글 기능 해제
                </span>
              </div>
            </div>
            <Divider />

            <div className="mb-3 mt-3 flex items-center">
              <Edit className="mr-1 h-5 w-6 fill-current text-default-600" />

              <div className="text-sm font-semibold text-default-700">
                게시물 수정
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Delete className="mr-1 h-5 w-6 fill-current text-default-600" />
              <div className="text-sm font-semibold text-default-700">
                게시물 삭제
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col pb-3 pl-5 pr-5 pt-3">
            <div className="mb-3 flex items-center">
              <User className="mr-1 h-5 w-5 fill-current text-default-600" />

              <div className="text-sm font-semibold text-default-700">
                이 계정 정보
              </div>
            </div>

            <div className="mb-3 mt-3 flex items-center">
              <FriendRequest className="mr-1 h-5 w-5 fill-current text-default-600" />

              <div className="text-sm font-semibold text-default-700">
                친구 신청
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Report className="mr-1 h-4 w-4 fill-current text-default-600" />

              <div className="text-sm font-semibold text-default-700">신고</div>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
