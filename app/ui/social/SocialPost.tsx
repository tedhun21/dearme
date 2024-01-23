/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 좋아요 목록 디자인 수정

import React, { useState } from "react";
import Image from "next/image";
import PostSettings from "./PostSettings";

import { Post } from "@/app/social/page";
import LikeModal from "./LikeModal";
import CommentsSection from "./CommentsSection";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import EmptyHeart from "@/public/social/EmptyHeart";
import FullHeart from "@/public/social/FullHeart";
import Comments from "@/public/social/Comments";
import Close from "@/public/social/Close";
import Send from "@/public/social/Send";

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
  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  // 좋아요 목록 (LikeModal)
  const [isLikeModalOpen, setIsLikedModalOpen] = useState(false);
  const openLikeModal = () => setIsLikedModalOpen(true);
  const closeLikeModal = () => setIsLikedModalOpen(false);

  // 포스트 body 더보기 (more)
  const maxChars = 100;
  const [isExpanded, setIsExpanded] = useState(false);

  // 댓글 보기 상태
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  // 댓글 작성
  const handleCommentSubmit = (newComment: string) => {};

  // console.log(`${BUCKET_URL}${post.user.photo?.url}`);
  return (
    <div className="mb-5 flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 ">
      {/* 유저 프로필 & 목표 */}
      <div className="relative flex items-center  pl-5 pr-5">
        <div className="h-10 w-10 rounded-full">
          {post.user.photo?.url ? (
            <Image
              src={`${BUCKET_URL}${post?.user?.photo?.url}`}
              alt="User Image"
              className="h-10  w-10 rounded-full object-cover"
              width={10}
              height={10}
              objectFit="fill"
            />
          ) : (
            <div>hi</div>
          )}
        </div>
        <div className="flex-col pl-3">
          <div className=" text-base font-bold text-default-700">
            {post.user.nickname}
          </div>
          <div className="text-xs font-semibold text-default-500">
            #{post.goal.body}
          </div>
        </div>

        <div className="ml-auto pt-5">
          {/* TODO (···) 나의 게시물 or 친구 게시물 -> boolean값 전달 */}
          <PostSettings isMyPost={true} />
        </div>
      </div>
      {/* Image && 게시물 사진 */}
      <div className=" relative mb-2 mt-1 h-[500px] w-full">
        {post.photo?.url ? (
          <Image
            src={`${BUCKET_URL}${post.photo?.url}`}
            alt="Post Image"
            fill
            objectFit="fill"
            className="mb-3 w-full rounded-sm "
          />
        ) : (
          <div>hi</div>
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
              <EmptyHeart className="h-6 w-5 fill-current text-default-600" />
            ) : (
              <FullHeart className="h-6 w-5 fill-current text-red-500" />
            )}
          </div>

          <div className="flex items-center" onClick={toggleComments}>
            <Comments className="ml-1 h-6 w-5 cursor-pointer fill-current text-default-600" />
          </div>
        </div>
        {/* 게시글 작성시간 */}
        <div className=" flex justify-end  text-xs  text-default-500">
          {timeSince(post.createdAt)}
        </div>
      </div>

      {/* Likes 목록 */}
      {/* TODO default image */}
      <div className="items-centers my-2 flex px-5">
        <div className="flex">
          {post.likes.slice(0, 2).map((like, index) => (
            <img
              key={index}
              className={`h-8 w-8 rounded-md border-none ${
                index > 0 ? "-ml-4" : ""
              }`}
              alt="likes"
              src={`${BUCKET_URL}${like.photo?.url}`}
            />
          ))}
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
        likes={post.likes}
      />

      {/* 게시물 body */}
      <div className="mb-3 flex items-start px-5  text-sm font-medium text-default-700">
        <span className="mr-3 text-sm font-semibold">{post.user.nickname}</span>
        <span
          className={`text-sm font-normal ${!isExpanded ? "line-clamp-1" : ""}`}
        >
          {post.body}
        </span>
        {!isExpanded && post.body.length > maxChars && (
          <button
            className="mt-1 cursor-pointer text-xs"
            onClick={() => setIsExpanded(true)}
          >
            more
          </button>
        )}
      </div>

      {/* View n Comments */}
      <div
        className="cursor-pointer px-5 text-xs font-medium text-default-500"
        onClick={toggleComments}
      >
        {!showComments &&
          (post.comments.length === 0
            ? ""
            : post.comments.length === 1
              ? "View 1 comment"
              : `View all ${post.comments.length} comments`)}
      </div>

      {/* 댓글 보기 */}
      {showComments && (
        <CommentsSection
          postId={post.id}
          comments={post.comments}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </div>

    //   {/* 댓글 보기*/}
    //   {showComments && (
    //     <section className="mt-4 ">
    //       {post.comments.map((comment, index) => (
    //         <div key={index} className="mb-2 flex items-center px-5">
    //           <div>
    //             <img
    //               src={(comment.user as any).photo.url}
    //               alt="User Image"
    //               className="h-8 w-8 rounded-full"
    //             />
    //           </div>

    //           <div className="w-full flex-col  pl-3">
    //             <div className="flex  items-center justify-between">
    //               <div className="text-sm font-semibold text-default-700">
    //                 {comment.user.nickname}
    //               </div>
    //               <div className="flex justify-end text-xs  text-default-500">
    //                 {comment.createdAt}
    //               </div>
    //             </div>
    //             <div className="text-xs font-medium text-default-500">
    //               {comment.body}
    //             </div>
    //           </div>
    //         </div>
    //       ))}

    //       {/* 댓글 작성 */}
    //       <div className="mb-2 mt-5 flex items-center px-5">
    //         <div>
    //           <img
    //             src="https://i.pinimg.com/736x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg"
    //             alt="User Image"
    //             className="h-8 w-8 rounded-full"
    //           />
    //         </div>

    //         <div className="w-full flex-col pl-3">
    //           <div className="flex h-8 items-center rounded-full border-2 border-default-400 p-0.5 ">
    //             <InputBase
    //               sx={{
    //                 ml: 2,
    //                 flex: 1,
    //                 color: "#928c7f",
    //                 fontSize: 14,
    //                 fontWeight: 500,
    //               }}
    //               placeholder="댓글 작성"
    //               inputProps={{ "aria-label": "댓글 남기기..." }}
    //               onChange={handleInputChange}
    //               value={comment}
    //             />
    //             {/* onClick 이벤트 */}
    //             {comment && (
    //               <Send className="mr-1 h-5 w-5 fill-current text-default-600" />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   )}
    //   <Divider className="mt-5" sx={{ border: "1px solid #EBE3D5" }} />
  );
}
