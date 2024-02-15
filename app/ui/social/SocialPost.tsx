/* eslint-disable @next/next/no-img-element */
"use client";
//TODO 이미지 크기 수정 react-cropper
import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { meState } from "@/store/atoms";
import { likePost } from "@/store/api";

import { Post } from "@/app/social/page";
import LikeModal from "./LikeModal";
import CommentsSection from "./CommentsSection";
import PostSettings from "./PostSettings";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import EmptyHeart from "@/public/social/EmptyHeart";
import FullHeart from "@/public/social/FullHeart";
import Comments from "@/public/social/Comments";
import UserWithNoImage from "@/public/social/UserWithNoImage";

interface SocialPostProps {
  post: Post;
}

// 게시물 작성 시간
export function timeSince(date: string): string {
  const now = new Date();
  const postDate = new Date(date);
  const secondsPast = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (secondsPast < 60) {
    return "just now";
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast <= 2629800) {
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
  if (secondsPast <= 31557600) {
    return `${Math.floor(secondsPast / 2629800)} months ago`;
  }
  return `${Math.floor(secondsPast / 31557600)} years ago`;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function SocialPost({ post }: SocialPostProps) {
  const queryClient = useQueryClient();

  const me = useRecoilValue(meState);

  // 나의 게시물 (boolean)
  const isMe = me.id === post.user.id;

  // 좋아요 상태
  const [liked, setLiked] = useState(
    post.likes.length >= 1 && post.likes.some((like) => like.id === me.id),
  );

  const likeMutation = useMutation({
    mutationKey: ["likedPost"],
    mutationFn: ({ postId }: { postId: number }) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    likeMutation.mutate({ postId: post.id });
  };

  // 좋아요 목록 (LikeModal)
  const [isLikeModalOpen, setIsLikedModalOpen] = useState(false);
  const openLikeModal = () => setIsLikedModalOpen(true);
  const closeLikeModal = () => setIsLikedModalOpen(false);

  // 포스트 body 더보기 (more)
  const maxChars = 70;
  const [isExpanded, setIsExpanded] = useState(false);

  // 댓글 보기 상태
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <>
      <div className="mb-5 flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 ">
        {/* 유저 프로필 & 목표 */}
        <div className="relative mb-2 flex  items-center px-5">
          <div className="h-10 w-10 rounded-full">
            {post.user?.photo?.url ? (
              <img
                src={`${BUCKET_URL}${post?.user?.photo?.url}`}
                alt="User Image"
                className="h-10  w-10 rounded-full object-cover"
                width={10}
                height={10}
              />
            ) : (
              <UserWithNoImage className="mr-4 h-8 w-8 " />
            )}
          </div>

          <div className="flex-col pl-3">
            <div className=" text-base font-bold text-default-700">
              {post.user?.nickname || "Unknown User"}
            </div>
            <div
              className="text-xs font-semibold text-default-500"
              style={{ marginTop: "-4px" }}
            >
              #{post.goal.body}
            </div>
          </div>

          <div className="ml-auto ">
            <PostSettings isMyPost={isMe} postId={post.id} postData={post} />
          </div>
        </div>
        {/* Image && 게시물 사진 */}
        <div className="relative mb-2 mt-1  px-5">
          {post.photo?.url && (
            <Image
              src={`${BUCKET_URL}${post.photo?.url}`}
              alt="Post Image"
              priority
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "680px",
                borderRadius: "4px",
              }}
            />
          )}
        </div>
        <div className="flex items-center justify-between px-5">
          {/* 좋아요 & 댓글 아이콘 */}
          <div className="flex">
            <div
              className="mr-2 flex cursor-pointer  items-center"
              onClick={toggleLike}
            >
              {liked ? (
                <FullHeart className="h-6 w-5 fill-current text-red-500" />
              ) : (
                <EmptyHeart className="h-6 w-5 fill-current text-default-600" />
              )}
            </div>
            {post.commentSettings !== "OFF" && (
              <div className="flex items-center" onClick={toggleComments}>
                <Comments className="ml-1 h-6 w-5 cursor-pointer fill-current text-default-600" />
              </div>
            )}
          </div>
          {/* 게시글 작성시간 */}
          <div className=" flex justify-end  text-xs  text-default-500">
            {timeSince(post.createdAt)}
          </div>
        </div>

        {/* Likes 목록 */}
        <div className="items-centers my-2 flex px-5">
          <div className="flex">
            {post.likes.slice(0, 3).map((like, index) => {
              return like.photo?.url ? (
                <img
                  key={index}
                  className={` h-7 w-7 rounded-full border-2 border-solid border-default-200 ${
                    index > 0 ? "-ml-4" : ""
                  }`}
                  alt="likes"
                  src={`${BUCKET_URL}${like.photo?.url}`}
                  style={{ borderColor: "#F5F3EB" }}
                />
              ) : (
                <UserWithNoImage
                  className={`m-0 h-7 w-7 rounded-full border-2 border-solid border-default-200 ${
                    index > 0 ? "-ml-4" : ""
                  }`}
                />
              );
            })}
            {/* {post.likes.length > 4 && (
                 <div className="-ml-2 flex h-8 w-8 items-center  justify-center rounded-md bg-default-900 text-xs">
                   +{post.likes.length - 2}
                 </div>
               )} */}
            <div
              className="ml-2 flex cursor-pointer items-center text-xs font-medium text-default-900"
              onClick={openLikeModal}
            >
              {post.likes.length === 0
                ? ""
                : post.likes.length === 1
                  ? `${post.likes.length} Like`
                  : `${post.likes.length} Likes`}
            </div>
          </div>
        </div>

        {/* Like Modal */}
        <LikeModal
          open={isLikeModalOpen}
          handleClose={closeLikeModal}
          postId={post.id}
          // likes={post.likes}
        />

        {/* 게시물 body */}
        <div className="flex w-full items-start gap-2 px-5 py-4 text-sm font-medium text-default-700">
          <div className="text-sm font-semibold">
            {post.body && post.user?.nickname}
          </div>

          <div
            className={clsx(
              "flex-auto text-sm font-normal",
              isExpanded ? "break-words" : "line-clamp-1",
            )}
          >
            {post.body}
          </div>

          <div>
            {!isExpanded && post.body.length > maxChars && (
              <button
                className="flex-1  text-xs"
                onClick={() => setIsExpanded(true)}
              >
                more
              </button>
            )}
            {isExpanded && post.body.length > maxChars && (
              <button
                className="flex-1  text-xs"
                onClick={() => setIsExpanded(false)}
              >
                hide
              </button>
            )}
          </div>
        </div>

        {/* View n Comments */}
        {post.commentSettings !== "OFF" && (
          <div
            className="cursor-pointer px-5 text-xs font-medium text-default-500"
            onClick={toggleComments}
          >
            {!showComments &&
              (post.comments === 0
                ? ""
                : post.comments === 1
                  ? "View 1 comment"
                  : `View all ${post.comments} comments`)}
          </div>
        )}

        {/* 댓글 보기 */}
        {showComments && (
          <CommentsSection
            postId={post.id}
            commentSettings={post.commentSettings}
          />
        )}
        <Divider className="mt-5" sx={{ border: "1px solid #EBE3D5" }} />
      </div>
    </>
  );
}
