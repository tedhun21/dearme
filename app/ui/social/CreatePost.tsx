"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import MenuItem from "@mui/material/MenuItem";

import Close from "@/public/social/Close";
import SelectPhotos from "@/public/social/SelectPhotos";
import EditPost from "@/public/social/EditPost";

export default function CreatePost() {
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   Select 목표 선택
  const [selectedGoal, setSelectedGoal] = useState("");
  const handleGoalChange = (e: any) => {
    setSelectedGoal(e.target.value);
  };

  // Select 댓글 옵션 선택
  const [selectedOption, setSelectedOption] = useState("전체");
  const handleOptionChange = (e: any) => {
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
            backgroundColor: "#F5F3EB",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <Link href="/">
              <Image
                src="/header/logo.png"
                width={77}
                height={20}
                alt="logo"
                quality={80}
                priority
              />
            </Link>

            {/* 게시물 수정 시에만 */}
            {/* <EditPost className="mr-2 h-4 w-4 cursor-pointer fill-current text-default-600" /> */}
            <button className="border-none" onClick={handleClose}>
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-base font-semibold text-default-500">In</div>
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
                  # Dearme
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value="목표2">
                  # Reading
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value="목표3">
                  # Workout
                </MenuItem>
              </Select>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-default-700">
                Private
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

          {/* 사진 업로드 */}
          <div className="flex h-72 items-center justify-center ">
            <SelectPhotos className="h-7 w-7 " />
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
            placeholder="Please write a caption."
            sx={{
              backgroundColor: "#F5F3EB",
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                py: "4px",
                px: "8px",
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
              Comments
            </span>
            <Select
              // 스타일 안먹음..?
              sx={{
                marginLeft: 1,
                "&.MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  width: "100px", // Set the width
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
                // sx={{
                //   "&.MuiOutlinedInput-root": {
                //     borderRadius: "8px",
                //     width: "80px",
                //     height: "25px",
                //     fontSize: "14px",
                //     color: "black",
                //     "&.fieldset": {
                //       borderColor: "#EBE3D5",
                //     },
                //     "&.Mui-focused fieldset": {
                //       borderColor: "#EBE3D5",
                //     },
                //   },

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
                All
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="친구">
                Friends
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="해제">
                Turn off
              </MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <button className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white">
              Post
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
