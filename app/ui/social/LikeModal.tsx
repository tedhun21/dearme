/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getLikeship, getMe, updateFriendship } from "@/store/api";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Close from "@/public/social/Close";
import UserWithNoImage from "@/public/social/UserWithNoImage";

interface LikeModalProps {
  open: boolean;
  handleClose: () => void;
  postId: number;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function LikeModal({
  open,
  handleClose,
  postId,
}: LikeModalProps) {
  const queryClient = useQueryClient();

  // me
  const { data: me } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  // likes 목록 친구관계 조회
  const all = me ? false : true;
  const { isSuccess, data: likes } = useQuery({
    queryKey: ["getLikeship", postId],
    queryFn: () => getLikeship({ postId, all }),
    enabled: open,
  });

  // Update Friendship
  const { mutateAsync: updateFriendshipMutation } = useMutation({
    mutationFn: updateFriendship,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleRequest = async (friendId: number, status: string) => {
    try {
      await updateFriendshipMutation({
        friendId,
        status,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 276,
          bgcolor: "#F5F3EB",
          borderRadius: "16px",
        }}
      >
        <div className="flex items-center justify-between px-5 py-2">
          <span className=" flex-1 text-center text-base font-semibold text-default-700">
            Likes
          </span>
          <div className="">
            <button className=" border-none" onClick={handleClose}>
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>
        </div>
        <Divider className="" sx={{ border: "1px solid #EBE3D5" }} />

        {Array.isArray(likes) &&
          likes.map((like: any) => (
            <div
              key={like.likeId}
              className="my-3 flex items-center justify-between px-5"
            >
              {/* 유저 프로필 */}
              <div className="flex items-center">
                {like.userPhoto ? (
                  <img
                    src={`${BUCKET_URL}${like.userPhoto}`}
                    alt="User Image"
                    className="mr-4 h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserWithNoImage className="m-0 mr-4 h-8 w-8" />
                )}

                <span className="font-base text-sm text-default-700">
                  {like.nickname}
                </span>
              </div>
              {/* 친구 요청 버튼 */}
              <div>
                <button
                  className={`w-20 rounded-lg  px-3 py-1 text-xs text-white ${
                    like.status === "requested" || like.status === "friend"
                      ? `bg-default-500`
                      : like.status === "not found"
                        ? `bg-default-900 hover:bg-opacity-75`
                        : like.status === "pending"
                          ? `bg-default-800 hover:bg-opacity-75`
                          : like.status === "blocked user"
                            ? `bg-black hover:bg-opacity-75`
                            : ""
                  } `}
                  disabled={
                    like.status === "requested" || like.status === "friend"
                      ? true
                      : false
                  }
                  onClick={() => {
                    switch (like.status) {
                      case "friend":
                        break;
                      case "requested":
                        break;
                      case "not found":
                        handleRequest(like.likeId, "request");
                        break;
                      case "pending":
                        handleRequest(like.likeId, "friend");
                        break;
                      case "blocked user":
                        handleRequest(like.likeId, "unblock");
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {((): any => {
                    switch (like.status) {
                      case "friend":
                        return "Friend";
                      case "requested":
                        return "Requested";
                      case "not found":
                        return "Request";
                      case "pending":
                        return "Confirm";
                      case "blocked user":
                        return "Unblock";
                    }
                  })()}
                </button>
              </div>
            </div>
          ))}
      </Box>
    </Modal>
  );
}
