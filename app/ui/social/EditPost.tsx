/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/app/social/page";

import { getGoals, updatePost } from "@/store/api";

import Image from "next/image";
import Link from "next/link";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import MenuItem from "@mui/material/MenuItem";

import Close from "@/public/social/Close";

interface EditPostProps {
  postId: number;
  postData: Post;
  open: boolean;
  onClose: () => void;
}

interface PostData {
  selectedGoal: any;
  isPrivate: boolean;
  postText: string;
  selectedOption: string;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function EditPost({
  postId,
  postData,
  open,
  onClose,
}: EditPostProps) {
  const queryClient = useQueryClient();

  // goals
  const { data: goalsData } = useQuery({
    queryKey: ["getGoals"],
    queryFn: getGoals,
  });
  const goals = goalsData?.data?.data.results;

  //   Select 목표 선택
  const [selectedGoal, setSelectedGoal] = useState(
    postData ? (postData.goal as any).id : "",
  );
  const handleGoalChange = (e: any) => {
    setSelectedGoal(e.target.value);
  };

  // Private
  const [isPrivate, setIsPrivate] = useState<boolean>(
    postData && !postData.public,
  );
  const handlePrivacyToggle = () => {
    setIsPrivate((prevIsPrivate) => !prevIsPrivate);
  };

  // 게시물 사진
  const existingImageFile = postData.photo ? postData.photo.url : null;

  // Date
  const date = new Date(postData.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Post Body
  const [postText, setPostText] = useState(postData ? postData.body : "");
  const handlePostTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
    // console.log(postText);
  };

  // Select 댓글 옵션 선택
  const [selectedOption, setSelectedOption] = useState(
    postData ? postData.commentSettings : "PUBLIC",
  );
  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const editMutation = useMutation({
    mutationKey: ["updatedPost"],
    mutationFn: (variables: {
      postId: number;
      selectedGoal: any;
      isPrivate: boolean;
      postText: string;
      selectedOption: string;
    }) => updatePost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleEditPost = async () => {
    const updatedData = {
      postId,
      selectedGoal,
      isPrivate,
      postText,
      selectedOption,
    };

    try {
      editMutation.mutate(updatedData);
      onClose();
      window.alert("Updated your post successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
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

            <button className="border-none" onClick={onClose}>
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
                {Array.isArray(goals) &&
                  goals.map((goal) => (
                    <MenuItem
                      key={goal.id}
                      sx={{ fontSize: "14px" }}
                      value={goal.id}
                    >
                      {`# ${goal.body}`}
                    </MenuItem>
                  ))}
              </Select>
            </div>

            {/* 토글 */}
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
                checked={isPrivate}
                onChange={handlePrivacyToggle}
              />
            </div>
          </div>

          {/* 사진 업로드 */}
          {/* <UploadPostImg setImageFile={handleImageFileChange} /> */}
          <img
            src={`${BUCKET_URL}${(postData as any).photo.url}`}
            alt="Image selected by the user"
            className="max-h-full max-w-full object-cover"
          />
          {/* 날짜 */}
          <div className="my-2 flex items-center">
            <span className="text-sm font-medium text-default-700">
              {formattedDate}
            </span>
            {/* <Triangle className="text-default-900 ml-1 h-3 w-3 cursor-pointer fill-current" /> */}
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
              <MenuItem sx={{ fontSize: "14px" }} value="PUBLIC">
                All
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="FRIENDS">
                Friends
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="OFF">
                Turn off
              </MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white"
              onClick={handleEditPost}
            >
              Edit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
