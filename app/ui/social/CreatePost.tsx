"use client";
// TODO: 메뉴 아이템 디자인 수정

import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import MenuItem from "@mui/material/MenuItem";

import EditPost from "@/public/social/EditPost";
import Close from "@/public/social/Close";
import Triangle from "@/public/social/Triangle";
import SelectPhotos from "@/public/social/SelectPhotos";

export default function CreatePost() {
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   Select 목표 선택
  const [selectedGoal, setSelectedGoal] = useState("");
  const handleGoalChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  // Select 댓글 옵션 선택
  const [selectedOption, setSelectedOption] = useState("전체");
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-default-800"
        onClick={handleOpen}
      >
        <AddIcon sx={{ color: "white" }} />
      </button>

      {/* 게시물 생성 modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#FBFAF2",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <div className="mb-4 flex items-center justify-end">
            {/* 게시물 수정 시에만 */}
            {/* <EditPost className="mr-2 h-4 w-4 cursor-pointer fill-current text-default-600" /> */}
            <button className="border-none" onClick={handleClose}>
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-base font-semibold text-default-500">In</div>
              {/* <div
                className="ml-2 rounded-full border  border-solid border-default-400 pl-2 pr-2 text-default-700"
                font-base
              >
                <span className="text-sm font-medium ">새로운 시작</span>
                <MoreHorizIcon
                  sx={{ color: "#2D2422", marginLeft: 1, fontSize: "medium" }}
                />
              </div> */}
              <Select
                // 스타일 안먹음..?

                sx={{
                  marginLeft: 1,
                  "&.MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    width: "160px", // Set the width
                    height: "25px", // Set the height
                    fontSize: "14px",
                    color: "black",
                    "& fieldset": {
                      borderColor: "#DED0B6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#DED0B6",
                    },
                  },

                  // "& .MuiSelect-select": {
                  //   padding: "0px",
                  // },
                }}
                IconComponent={({ ...rest }) => (
                  <MoreHorizIcon
                    {...rest}
                    sx={{ color: "#2D2422", marginLeft: 1, fontSize: "medium" }}
                  />
                )}
                value={selectedGoal}
                onChange={handleGoalChange}
              >
                <MenuItem sx={{ fontSize: "14px" }} value="목표1">
                  프로젝트 완성
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value="목표2">
                  행복한 연말
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value="목표3">
                  새로운 시작
                </MenuItem>
              </Select>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-default-700">
                포스트 공개
              </span>
              <Switch
                sx={{
                  /// switch 기본 박스 크기
                  marginLeft: 1,
                  padding: 0,
                  width: "32px",
                  height: "20px",
                  "& .MuiSwitch-switchBase": {
                    padding: 0,
                    margin: "2px",
                    transitionDuration: "300ms",
                    /// 체크될때
                    "&.Mui-checked": {
                      transform: "translateX(12px)",
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#143422",
                        opacity: 1,
                        border: 0,
                      },
                      "&.Mui-disabled + .MuiSwitch-track": {
                        opacity: 0.5,
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    boxSizing: "border-box",
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    backgroundColor: "#b6b6c0",
                    opacity: 1,
                  },
                }}
              />
            </div>
          </div>
          {/* 날짜 선택 */}
          <div className="mb-1 flex items-center">
            <span className="text-sm font-medium text-default-700">
              December 25, 2023
            </span>
            {/* <Triangle className="text-default-900 ml-1 h-3 w-3 cursor-pointer fill-current" /> */}
            <ArrowDropDownRoundedIcon sx={{ color: "#EDA323" }} />
          </div>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="내용을 입력해주세요."
            sx={{
              backgroundColor: "#F5F3EB",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#EBE3D5",
                },
                "&:hover fieldset": {
                  borderColor: "#EBE3D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#EBE3D5",
                },
              },
              marginBottom: 3,
            }}
          />
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-sm font-medium text-default-700">
              댓글 옵션
            </span>
            <Select
              // 스타일 안먹음..?

              sx={{
                "&.MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  width: "80px", // Set the width
                  height: "25px", // Set the height
                  fontSize: "14px",
                  color: "black",
                  "& fieldset": {
                    borderColor: "#EBE3D5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EBE3D5",
                  },
                },

                // "& .MuiSelect-select": {
                //   padding: "0px",
                // },
              }}
              IconComponent={({ ...rest }) => (
                <ArrowDropDownRoundedIcon {...rest} sx={{ fill: "#EDA323" }} />
              )}
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <MenuItem sx={{ fontSize: "14px" }} value="전체">
                전체
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="친구">
                친구
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="해제">
                해제
              </MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <SelectPhotos className="h-7 w-7 " />
            <button className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white">
              Post
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
