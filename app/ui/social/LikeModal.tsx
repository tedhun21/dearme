/* eslint-disable @next/next/no-img-element */
"use client";
// TODO: Likes > follow 버튼 기능

import React, { useState } from "react";
import { Like } from "@/app/social/page";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Close from "@/public/social/Close";

interface LikeModalProps {
  open: boolean;
  handleClose: () => void;
  likes: Like[];
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function LikeModal({
  open,
  handleClose,
  likes,
}: LikeModalProps) {
  //   {/* 좋아요 modal */}
  return (
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
          width: 276,
          bgcolor: "#F5F3EB",
          borderRadius: "16px",
          // p: 4,
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
        {likes.map((like, index) => (
          // TODO 친구 아니면 Follow
          <section
            key={index}
            className="my-3 flex items-center justify-between px-5"
          >
            {/* 유저 프로필 */}
            <div className="flex items-center">
              <img
                src={`${BUCKET_URL}${like.photo?.url}`}
                alt="User Image"
                className="mr-4 h-8 w-8 rounded-full"
              />
              <span className="font-base text-sm text-default-700">
                {like.nickname}
              </span>
            </div>
            {/* 팔로우 버튼 */}
            <div>
              <button
                className="rounded-lg bg-default-500 px-3 py-1 text-xs text-white hover:bg-default-600
  active:bg-default-700"
              >
                Follow
              </button>
            </div>
          </section>
        ))}
      </Box>
    </Modal>
  );
}
