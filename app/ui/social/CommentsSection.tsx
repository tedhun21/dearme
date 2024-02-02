/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "@/util/tokenCookie";
import { useRecoilState } from "recoil";
import { IMe, meState } from "@/store/atoms";
import { getMe, createComment, updateComment } from "@/store/api";

import { Comment } from "@/app/social/page";
import CommentSettings from "./CommentSettings";
import { timeSince } from "./SocialPost";

import InputBase from "@mui/material/InputBase";

import Send from "@/public/social/Send";

interface CommentProps {
  comments: Comment[];
  postId: number;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function CommentsSection({ comments, postId }: CommentProps) {
  const queryClient = useQueryClient();

  // 유저 정보 가져오기
  const [me, setMe] = useRecoilState<IMe>(meState);
  const access_token = getCookie("access_token");
  const { isSuccess, data: meData } = useQuery({
    queryKey: ["getMe", { access_token }],
    queryFn: getMe,
  });
  useEffect(() => {
    if (meData) {
      setMe(meData);
    }
  }, [isSuccess]);

  // 댓글 입력 상태
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 댓글 Post Request
  const { mutateAsync: addCommentMutation } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async () => {
    try {
      await addCommentMutation({ postId, comment });
    } catch (e) {
      console.error(e);
    }
    setComment("");
  };

  // 댓글 수정 상태
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      setEditingComment(
        comments.find((comment) => comment.id === editingCommentId)?.body || "",
      );
    }
  }, [isEditing, editingCommentId, comments]);

  // 댓글 Edit Request
  const { mutateAsync: updateCommentMutation } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setIsEditing(false);
      setEditingComment("");
      setEditingCommentId(null);
    },
  });

  const handleEdit = async () => {
    try {
      await updateCommentMutation({
        postId,
        commentId: editingCommentId,
        comment: editingComment,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="mt-4 ">
      {comments.map((comment, index) => {
        return (
          <section key={index} className="mb-2 flex items-center px-5">
            {/* 이미지 & id */}
            <div className="flex items-start gap-2">
              <img
                src={`${BUCKET_URL}${(comment.user as any).photo.url}`}
                alt="User Image"
                className="h-8 w-8 rounded-full"
              />
              <div className="mr-2 flex-1 text-sm font-semibold ">
                {comment.user.nickname}
              </div>

              {/* 댓글 */}
              {/* TODO inputbase fullwidth 수정 */}
              <div className=" mb-2 flex w-full flex-col  pl-3">
                <span className="font-norma flex-auto whitespace-normal break-all text-xs text-default-700">
                  {isEditing && editingCommentId === comment.id ? (
                    <InputBase
                      sx={{
                        fontSize: 12,
                        fontWeight: 400,

                        border: 1,
                        borderColor: "grey.500",
                      }}
                      value={editingComment}
                      onChange={(e) => setEditingComment(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    comment.body
                  )}
                </span>

                <div className="text-2xs  text-default-500">
                  {timeSince(comment.createdAt)}
                </div>
              </div>

              {/* TODO if(로그인 유저 === 댓글 작성자) */}
              {isEditing && editingCommentId === comment.id ? (
                <div
                  className="cursor-pointer text-xs font-normal text-default-700"
                  onClick={handleEdit}
                >
                  Edit
                </div>
              ) : (
                <div>
                  <CommentSettings
                    postId={postId}
                    commentId={comment.id}
                    onEditClick={() => {
                      setIsEditing(true);
                      setEditingCommentId(comment.id);
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* 댓글 작성 */}
      <div className="mb-2 mt-5 flex items-center px-5">
        <div>
          <img
            src={`${BUCKET_URL}${me.photo.url}`}
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
              placeholder="Add a comment..."
              inputProps={{ "aria-label": "댓글 남기기..." }}
              onChange={handleInputChange}
              value={comment}
            />
            {comment && (
              <div onClick={handleSubmit}>
                <Send className="mr-1 h-5 w-5 fill-current text-default-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
