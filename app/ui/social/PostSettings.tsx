/* eslint-disable @next/next/no-img-element */
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";

// 나의 게시물 / 친구 게시물 : isMyPost(boolean)
// TODO: 메뉴 디자인 수정 (라디오 버튼, 호버링)
// TODO: 컴포넌트 파일 ui로 옮기기 (ui > social > Components)

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
              <img
                src="/social/comments.svg"
                alt="Comments Setting"
                className="pr-2"
              />
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
              <img
                src="/social/edit.svg"
                alt="Comments Setting"
                className="pr-2"
              />
              <div className="text-sm font-semibold text-default-700">
                게시물 수정
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <img
                src="/social/delete.svg"
                alt="Comments Setting"
                className="pr-2"
              />
              <div className="text-sm font-semibold text-default-700">
                게시물 삭제
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col pb-3 pl-5 pr-5 pt-3">
            <div className="mb-3 flex items-center">
              <img
                src="/social/user.svg"
                alt="Comments Setting"
                className="pr-2"
              />
              <div className="text-sm font-semibold text-default-700">
                이 계정 정보
              </div>
            </div>

            <div className="mb-3 mt-3 flex items-center">
              <img
                src="/social/friendrequest.svg"
                alt="Comments Setting"
                className="pr-2"
              />
              <div className="text-sm font-semibold text-default-700">
                친구 신청
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <img
                src="/social/report.svg"
                alt="Comments Setting"
                className="pr-2"
              />
              <div className="text-sm font-semibold text-default-700">신고</div>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
