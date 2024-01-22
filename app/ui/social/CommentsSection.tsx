/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useState } from "react";
import { Comment } from "@/app/social/page";
import { timeSince } from "./SocialPost";

import InputBase from "@mui/material/InputBase";

import Send from "@/public/social/Send";

interface CommentProps {
  comments: Comment[];
  onCommentSubmit: (comment: string) => void;
  postId: number;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function CommentsSection({
  comments,
  onCommentSubmit,
  postId,
}: CommentProps) {
  // 댓글 입력 상태
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onCommentSubmit(comment);
    setComment("");
  };

  // console.log(comments[0]);
  // console.log(postId);

  return (
    <section className="mt-4 ">
      {comments.map((comment, index) => (
        <div key={index} className="mb-2 flex items-center px-5">
          <div>
            <img
              src={`${BUCKET_URL}${(comment.user as any).photo.url}`}
              alt="User Image"
              className="h-8 w-8 rounded-full"
            />
          </div>

          <div className="w-full flex-col  pl-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-default-700">
                {comment.user.nickname}
              </div>
              <div className="flex justify-end text-xs  text-default-500">
                {timeSince(comment.createdAt)}
              </div>
            </div>
            <div className="text-xs font-medium text-default-500">
              {comment.body}
            </div>
          </div>
        </div>
      ))}

      {/* 댓글 작성 */}
      {/* TODO 로그인 유저 프로필 이미지로 변경 */}
      <div className="mb-2 mt-5 flex items-center px-5">
        <div>
          <img
            src="https://i.pinimg.com/564x/e3/5b/90/e35b90f73b94757a55448aa157d5891e.jpg"
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
  );
}
