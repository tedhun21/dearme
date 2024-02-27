"use client";
// TODO In 목표 디자인 수정
// TODO strapi builder : commentSettings (ALL, FRIENDS, OFF)
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getGoals, createPost } from "@/store/api";

import Image from "next/image";
import Link from "next/link";

import UploadPostImg from "./UploadPostImg";

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

type PostDataType = {
  selectedGoal: string;
  isPrivate: string;
  imageFile: File | null;
  postText: string;
  selectedOption: string;
};

export default function CreatePost() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // goals
  const { data: goalsData } = useQuery({
    queryKey: ["getGoals", { context: "CreatePost" }],
    queryFn: getGoals,
    // enabled: open,
    staleTime: Infinity,
  });

  // console.log(goalsData?.data);
  const goals = goalsData?.data;

  //   Select 목표 선택
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const handleGoalChange = (e: any) => {
    setSelectedGoal(e.target.value);
  };

  // Private
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const handlePrivacyToggle = () => {
    setIsPrivate((isPrivate) => !isPrivate);
  };

  // 게시물 사진
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  // Date
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Post Body
  const [postText, setPostText] = useState("");
  const handlePostTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  // 댓글 설정
  const [selectedOption, setSelectedOption] = useState("ALL");

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (isPrivate) {
      setSelectedOption("FRIENDS");
    } else {
      setSelectedOption("ALL");
    }
  }, [isPrivate]);

  // Post Request
  const { mutateAsync: addPostMutation } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handlePost = async () => {
    if (!selectedGoal) {
      window.alert("Please select your goal.");
      return;
    } else if (!imageFile) {
      window.alert("Please select a photo.");
      return;
    }
    try {
      const postData = {
        selectedGoal,
        isPrivate,
        imageFile,
        postText,
        selectedOption,
      };

      await addPostMutation(postData);

      window.alert("Uploaded!");

      setSelectedGoal("");
      setIsPrivate(false);
      setImageFile(null);
      setPostText("");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-default-800 hover:bg-opacity-75"
        onClick={handleOpen}
      >
        <AddIcon sx={{ color: "white" }} />
      </button>

      <Modal open={open} onClose={handleClose}>
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
          {/* 로고 & x 버튼 */}
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

            <button className="border-none" onClick={handleClose}>
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            {/* 목표 선택 */}
            <div className="flex items-center">
              <span className="text-base font-semibold text-default-500">
                In
              </span>
              <Select
                sx={{
                  marginLeft: 1,
                  "&.MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    width: "160px",
                    height: "24px",
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
                {Array.isArray(goals) &&
                  goals.map((goal) => (
                    <MenuItem
                      key={goal.id}
                      sx={{ fontSize: "14px" }}
                      value={goal.id}
                    >
                      {`# ${goal.title}`}
                    </MenuItem>
                  ))}
              </Select>
            </div>

            {/* Private 토글 */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-default-700">
                Private
              </span>
              <Switch
                value={isPrivate}
                onChange={handlePrivacyToggle}
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
                    /// 체크될 때
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
          <UploadPostImg setImageFile={handleImageFileChange} />

          {/* 날짜 */}
          <div className="my-2 flex items-center">
            <span className="text-sm font-medium text-default-700">
              {formattedDate}
            </span>
            <ArrowDropDownRoundedIcon sx={{ color: "#EDA323" }} />
          </div>

          {/* Post Body */}
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
            value={postText}
            onChange={handlePostTextChange}
          />

          {/* Comments Settings */}
          {/* 친구 공개 게시물: FRIENDS / OFF */}
          {/* 전체 공개 게시물: ALL / OFF */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-sm font-medium text-default-700">
              Comments
            </span>
            <Select
              sx={{
                marginLeft: 1,
                "&.MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  width: "100px",
                  height: "25px",
                  fontSize: "14px",
                  color: "black",
                  "& fieldset": {
                    borderColor: "#DED0B6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#DED0B6",
                  },
                },
              }}
              IconComponent={({ ...rest }) => (
                <ArrowDropDownRoundedIcon {...rest} sx={{ fill: "#EDA323" }} />
              )}
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <MenuItem
                sx={{ fontSize: "14px" }}
                value={isPrivate ? "FRIENDS" : "ALL"}
              >
                {isPrivate ? "Friends" : "All"}
              </MenuItem>

              <MenuItem sx={{ fontSize: "14px" }} value="OFF">
                Off
              </MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
