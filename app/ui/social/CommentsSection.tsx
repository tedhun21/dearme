/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getMe,
  readCommentsWithPage,
  createComment,
  updateComment,
} from "@/store/api";

import CommentSettings from "./CommentSettings";
import { timeSince } from "./SocialPost";

import InputBase from "@mui/material/InputBase";

import Send from "@/public/social/Send";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function CommentsSection({
  postId,
  commentSettings,
}: {
  postId: number;
  commentSettings: string;
}) {
  const queryClient = useQueryClient();

  // me
  const { data: me } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  // Read _ comments
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<any[], Error>({
    queryKey: ["readCommentsWithPage"],
    queryFn: ({ pageParam }) => readCommentsWithPage({ postId, pageParam }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.length / 5;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  const handleLoadMoreComments = () => {
    fetchNextPage();
  };

  // Create _ comment
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const { mutateAsync: addCommentMutation } = useMutation({
    mutationFn: createComment,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["readCommentsWithPage"] });
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

  // Update _ comment
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    <>
      {data?.pages[0].length !== 0 && (
        <section className="mt-4 max-h-[240px] overflow-y-scroll scrollbar-hide">
          {data?.pages.map((comments: any) =>
            comments.map((comment: any) => (
              <div key={comment.id} className="mb-3 flex w-full gap-2  px-5">
                {/* 이미지*/}
                <img
                  src={`${BUCKET_URL}${(comment.user as any).photo.url}`}
                  alt="User Image"
                  className="h-8 w-8 overflow-hidden rounded-full object-cover"
                />

                <div className="flex w-full flex-col justify-center">
                  {/* 작성자 & 댓글 */}
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold">
                      {comment.user.nickname}
                    </span>
                    <span className="w-full flex-auto whitespace-normal break-all text-sm  font-normal text-default-700">
                      {isEditing && editingCommentId === comment.id ? (
                        <InputBase
                          multiline
                          sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            width: "100%",
                            overflowWrap: "break-word",
                          }}
                          value={editingComment}
                          onChange={(e) => setEditingComment(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        comment.body
                      )}
                    </span>
                  </div>

                  {/* 작성 시간 & 댓글 설정 */}
                  <div className="flex items-center justify-end">
                    <div
                      className="text-2xs  text-default-500"
                      // onMouseEnter={() => setIsHovered(true)}
                      // onMouseLeave={() => setIsHovered(false)}
                    >
                      {timeSince(comment.createdAt)}
                    </div>
                    {comment.user.id === me.id ? (
                      isEditing ? (
                        editingCommentId === comment.id && (
                          <div
                            className="ml-2 cursor-pointer text-xs font-normal text-default-600 hover:text-default-700"
                            onClick={handleEdit}
                          >
                            Edit
                          </div>
                        )
                      ) : (
                        <div>
                          <CommentSettings
                            postId={postId}
                            commentId={comment.id}
                            onEditClick={() => {
                              setIsEditing(true);
                              setEditingCommentId(comment.id);
                              setEditingComment(comment.body);
                            }}
                          />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            )),
          )}
          {/* TODO 댓글 5개  */}
          {hasNextPage && (
            <button
              onClick={handleLoadMoreComments}
              className="flex w-full cursor-pointer justify-center text-xs font-medium text-default-600"
            >
              Show more comments
            </button>
          )}
        </section>
      )}

      {/* 댓글 작성 */}
      {commentSettings !== "OFF" && (
        <section className="mb-2 mt-5 flex items-center px-5">
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
        </section>
      )}
    </>
  );
}
