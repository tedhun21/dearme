/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

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

interface IForm {
  goalId: number;
  isPrivate: boolean;
  postText: string;
  commentSettings: string;
}

export default function CreatePost({
  setPostUploaded,
}: {
  setPostUploaded: (status: boolean) => void;
}) {
  const queryClient = useQueryClient();

  // CreatePost modal
  const [openCreatePost, setOpenCreatePost] = useState(false);

  // react-hook-form
  const { register, setValue, handleSubmit, reset, watch, control } =
    useForm<IForm>({
      defaultValues: {
        goalId: 0,
        isPrivate: false,
        postText: "",
      },
    });

  const isPrivate = watch("isPrivate");

  // goals
  const { data: goalsData } = useQuery({
    queryKey: ["getGoals"],
    queryFn: getGoals,
    enabled: openCreatePost,
  });
  const goals = goalsData?.data;

  useEffect(() => {
    if (openCreatePost && goalsData?.data && goalsData.data.length === 0) {
      setOpenCreatePost(false);
      window.alert(
        "You have no goals. Please register a goal before creating a post.",
      );
    }
  }, [goalsData, openCreatePost]);

  // 게시물 사진
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  // Date
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // commentSettings
  const [commentSettingsOptions, setCommentSettingsOptions] = useState<
    string[]
  >([]);

  useEffect(() => {
    const newCommentSettingsOptions = isPrivate
      ? ["FRIENDS", "OFF"]
      : ["ALL", "OFF"];
    setCommentSettingsOptions(newCommentSettingsOptions);

    const newCommentSettings = isPrivate ? "FRIENDS" : "ALL";
    setValue("commentSettings", newCommentSettings);
  }, [isPrivate, setValue]);

  // Post Request
  const { mutate: addPostMutation } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: () => {
      setOpenCreatePost(false);
      window.alert(" Uploaded!");
      setPostUploaded(true);
    },
    onError: () => {
      window.alert(" Failed to upload your post.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPostsWithPage"],
      });
    },
  });

  const onSubmit = (data: any) => {
    if (data.goalId === 0) {
      window.alert("Please select your goal.");
      return;
    } else if (!imageFile) {
      window.alert("Please select a photo.");
      return;
    } else if (data.postText === "") {
      window.alert("Please write your post content.");
      return;
    } else if (!data.commentSettings) {
      window.alert("Please select comment setting.");
      return;
    }

    addPostMutation({ createData: data, imageFile });

    setOpenCreatePost(false);
    reset();
  };

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-default-800 hover:bg-opacity-75"
        onClick={() => setOpenCreatePost(true)}
      >
        <AddIcon sx={{ color: "white" }} />
      </button>

      {/* CreatePostModal */}
      <Modal open={openCreatePost} onClose={() => setOpenCreatePost(false)}>
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

            <button
              className="border-none"
              onClick={() => setOpenCreatePost(false)}
            >
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>

          {/* 포스트 작성 폼 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between"
          >
            <div className="mb-4 flex items-center justify-between">
              {/* 목표 선택 */}
              <div className="flex items-center">
                <span className="text-base font-semibold text-default-500">
                  In
                </span>
                <Select
                  defaultValue={0}
                  {...register("goalId")}
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
                  }}
                  IconComponent={({ ...rest }) => (
                    <MoreHorizIcon
                      {...rest}
                      sx={{
                        color: "#2D2422",
                        marginLeft: 1,
                        fontSize: "medium",
                      }}
                    />
                  )}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value={0}>
                    None
                  </MenuItem>
                  {Array.isArray(goals) &&
                    goals.length > 0 &&
                    goals.map((goal) => (
                      <MenuItem
                        key={goal.id}
                        sx={{ fontSize: "14px" }}
                        value={goal.id || ""}
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
                <Controller
                  control={control}
                  name="isPrivate"
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      // defaultChecked={false}
                      checked={value || false}
                      onChange={onChange}
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
                          // 체크될 때
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
                  )}
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
              {...register("postText")}
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
            {/* Comments Settings */}
            {/* 친구 공개 게시물: FRIENDS / OFF */}
            {/* 전체 공개 게시물: ALL / OFF */}
            <div className="mb-4 flex items-center">
              <span className="mr-2 text-sm font-medium text-default-700">
                Comments
              </span>

              <Controller
                control={control}
                name="commentSettings"
                render={({ field: { onChange, value } }) => (
                  <Select
                    defaultValue=""
                    value={value || ""}
                    onChange={onChange}
                    sx={{
                      marginLeft: 1,
                      "&.MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        width: "120px",
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
                      <ArrowDropDownRoundedIcon
                        {...rest}
                        sx={{ fill: "#EDA323" }}
                      />
                    )}
                  >
                    {commentSettingsOptions.map((option) => (
                      <MenuItem
                        key={option}
                        sx={{ fontSize: "14px" }}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white"
              >
                Post
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
