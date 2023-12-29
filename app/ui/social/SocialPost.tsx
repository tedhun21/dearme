/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 좋아요 목록 디자인 수정

import React, { ChangeEvent, useState } from "react";
import PostSettings from "./PostSettings";

import { Post } from "@/app/social/page";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import EmptyHeart from "@/public/social/EmptyHeart";
import FullHeart from "@/public/social/FullHeart";
import Comments from "@/public/social/Comments";
import Send from "@/public/social/Send";

interface SocialPostProps {
  post: Post;
}

export default function SocialPost({ post }: SocialPostProps) {
  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  // 좋아요 목록 (modal)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 댓글 보기 상태
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  // 댓글 입력 상태
  const [comment, setComment] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="mb-5 flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200  pl-5 pr-5">
      {/* 유저 프로필 & 목표 */}
      <div className="flex items-center">
        <img
          src={post.profile}
          alt="User Image"
          className="h-10  w-10 rounded-full object-cover"
        />
        <div className="flex-col pl-3">
          <div className="text-base font-bold text-default-700">do_e</div>
          <div className="text-sm font-semibold text-default-500">
            {post.goal}
          </div>
        </div>

        <div className="ml-auto pt-5">
          {/* (···) 나의 게시물 or 친구 게시물 -> boolean값 전달 */}
          <PostSettings isMyPost={true} />
        </div>
      </div>

      {/* Image && 게시물 사진 */}
      <div className="mt-1">
        <img
          src={post.imageUrl}
          alt="Post Image"
          className="h-[500px] w-full rounded-sm  "
        />
      </div>

      {/* 게시물 body */}
      <div className="pt-2 text-sm font-medium text-default-700">
        {post.contents}
      </div>

      {/* 게시글 작성시간 */}
      <div className="flex justify-end text-xs  text-default-500">
        {post.time}
      </div>

      {/* 좋아요 & 댓글 */}
      <div className="flex items-center">
        <div
          className="mr-2 flex cursor-pointer  items-center"
          onClick={toggleLike}
        >
          {liked ? (
            <EmptyHeart className="h-6 w-5 fill-current text-default-600" />
          ) : (
            <FullHeart className="h-6 w-5 fill-current text-red-500" />
          )}
        </div>

        <div className="flex items-center" onClick={toggleComments}>
          <Comments className="ml-1 h-6 w-5 cursor-pointer fill-current text-default-600" />
        </div>
      </div>

      {/* 좋아요 목록 modal*/}
      <div className="items-centers mt-2 flex ">
        <div
          className="mr-2 flex cursor-pointer text-xs font-medium text-default-500"
          onClick={handleOpen}
        >
          {post.likes.length} Likes
        </div>
        <div
          className="cursor-pointer text-xs font-medium text-default-500"
          onClick={toggleComments}
        >
          {post.comments.length} Comments
        </div>
      </div>

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
            bgcolor: "background.paper",
            borderRadius: "16px",
            p: 4,
          }}
        >
          {post.likes.map((like, index) => (
            <section key={index} className="mb-3 flex items-center">
              <div>
                <img
                  src={like.profile}
                  alt="User Image"
                  className="mr-3 h-8 w-8 rounded-full"
                />
              </div>

              <div className="text-base font-semibold text-default-700">
                {like.user}
              </div>
            </section>
          ))}
        </Box>
      </Modal>

      {/* 댓글 & 좋아요 보기 */}
      {showComments && (
        <section className="mt-4 ">
          {/* 댓글 개수만큼 */}

          {post.comments.map((comment, index) => (
            <div key={index} className="mb-2 flex items-center">
              <div>
                <img
                  src={comment.profile}
                  alt="User Image"
                  className="h-8 w-8 rounded-full"
                />
              </div>

              <div className="w-full flex-col pl-3">
                <div className="flex  items-center justify-between">
                  <div className="text-base font-semibold text-default-700">
                    {comment.user}
                  </div>
                  <div className="flex justify-end text-xs  text-default-500">
                    {comment.time}
                  </div>
                </div>
                <div className="text-sm font-medium text-default-500">
                  {comment.comment}
                </div>
              </div>
            </div>
          ))}

          {/* 댓글 작성 */}
          <div className="mb-2 mt-5 flex items-center">
            <div>
              <img
                src="https://i.pinimg.com/736x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg"
                alt="User Image"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <div className="w-full flex-col pl-3">
              <div className="flex h-8 items-center rounded-full border-2 border-default-400 p-0.5 ">
                <InputBase
                  sx={{
                    ml: 2,
                    flex: 1,
                    color: "#928c7f",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  placeholder="댓글 작성"
                  inputProps={{ "aria-label": "댓글 남기기..." }}
                  onChange={handleInputChange}
                  value={comment}
                />
                {/* onClick 이벤트 */}
                {comment && (
                  <Send className="mr-1 h-5 w-5 fill-current text-default-600" />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Divider className="mt-5" />
    </div>
  );
}
