"use client";

import { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import { getMe, updateBackGroundPhoto, updateUserPhoto } from "@/store/api";

import { IconButton, Menu } from "@mui/material";

import BackButton from "../backbutton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PencilIcon from "@/public/me/PencilIcon";
import ShareIcon from "@/public/me/ShareIcon";
import EditIcon from "@/public/me/EditIcon";
import BackGroundIcon from "@/public/me/BackGroundIcon";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MeProfile({ route }: { route?: string }) {
  const pathname = usePathname();
  const { data: me } = useQuery({ queryKey: ["getMe"], queryFn: getMe });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [backGroundPhoto, setBackGroundPhoto] = useState<File | null>(null);

  const fileInput = useRef(null);
  const BackGroundfileInput = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 유저 프로필 사진 바꾸기
  const { mutate: updateUserPhotoMutate, data: updateUserPhotoData } =
    useMutation({
      mutationKey: ["updateUserPhoto"],
      mutationFn: (variables: { userId: number; selectedFile: File }) =>
        updateUserPhoto(variables),
      onSuccess: ({ message }: any) => {
        window.alert(message);
      },
      onError: ({ response }: any) => {
        window.alert(response.data.error.message);
      },
    });

  // 유저 백그라운드 사진 바꾸기
  const { mutate: updateBackGroundMutate, data: updateBackGroundData } =
    useMutation({
      mutationKey: ["updateBackGroundPhoto"],
      mutationFn: ({
        userId,
        selectedFile,
      }: {
        userId: number;
        selectedFile: File;
      }) => updateBackGroundPhoto({ userId, selectedFile }),
      onSuccess: ({ data: { message } }) => {
        window.alert(message);
      },
      onError: ({ response }: any) => {
        window.alert(response.data.error.message);
      },
    });

  // 유저 사진 바꾸기, 바꾸면서 업데이트 통신을 같이
  const handleUserPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me) {
        setUserPhoto(selectedFile);

        // 유저 프로필 사진 업데이트
        updateUserPhotoMutate({
          userId: me.id,
          selectedFile,
        });
      }
    }
  };

  const handleUserBackGroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me) {
        setBackGroundPhoto(selectedFile);

        // 유저 백그라운드 사진 업데이트
        updateBackGroundMutate({ userId: me.id, selectedFile });
      }
    }
  };

  return (
    <section className="h-80 w-full">
      <div className="relative flex h-full p-5">
        <div
          className={clsx(
            "z-10 flex w-full flex-col",
            route === "edit" ? "" : "justify-between",
          )}
        >
          <div className="flex items-center justify-between">
            {route === "edit" ? (
              <BackButton />
            ) : (
              <Link href="/">
                <Image
                  src="/header/logo.png"
                  alt="logo"
                  width={80}
                  height={20}
                  quality={80}
                  priority
                />
              </Link>
            )}
            {/* Meatballs */}
            <div>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon sx={{ color: "#2D2422" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                  "& .MuiMenu-paper": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                <div className="flex flex-col items-end gap-4 pr-1">
                  <button className="group flex items-center gap-2">
                    <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
                      Share
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
                      <ShareIcon className="h-5 w-5" />
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      (BackGroundfileInput.current as any).click();
                    }}
                    className="group flex items-center gap-2"
                  >
                    <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
                      BackGround
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl hover:drop-shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
                      <BackGroundIcon className="h-5 w-5" />
                    </div>
                  </button>
                  <input
                    hidden
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    ref={BackGroundfileInput}
                    onChange={handleUserBackGroundChange}
                  />
                  {pathname !== "/me/edit" && (
                    <Link
                      href="/me/edit"
                      onClick={handleClose}
                      className="group flex items-center gap-2"
                    >
                      <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
                        Edit
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl hover:drop-shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
                        <EditIcon className="h-5 w-5" />
                      </div>
                    </Link>
                  )}
                </div>
              </Menu>
            </div>
            {/* Meatballs */}
          </div>
          {route === "edit" ? (
            <div className="relative flex">
              <Image src="/me/Edit.svg" width={110} height={48} alt="edit" />
            </div>
          ) : (
            <div className="px-4">
              <button
                className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-default-300"
                onClick={() => {
                  (fileInput.current as any).click();
                }}
              >
                {userPhoto ? (
                  <Image
                    src={userPhoto && URL.createObjectURL(userPhoto)}
                    alt="profile default image"
                    fill
                    quality={80}
                    priority
                    className="z-0 object-cover object-center"
                  />
                ) : (me as any)?.photo ? (
                  <Image
                    src={`${BUCKET_URL}${(me as any).photo.url}`}
                    alt="userPhoto"
                    fill
                    className="object-cover"
                  />
                ) : null}
              </button>
              <input
                hidden
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                ref={fileInput}
                onChange={handleUserPhotoChange}
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-bg-800 text-xl font-semibold">
                    {(me as any)?.nickname}
                  </span>
                  <span className="text-white">{(me as any)?.body}</span>
                </div>
                {/* <button className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
                  Follow
                </button> */}
              </div>
            </div>
          )}
        </div>
        {route === "edit" ? (
          <div className="absolute -bottom-10 right-10 z-10 h-48 w-48">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-default-300 shadow-2xl">
              {userPhoto ? (
                <Image
                  src={userPhoto && URL.createObjectURL(userPhoto)}
                  alt="user photo"
                  fill
                  quality={80}
                  priority
                  className="z-0 object-cover object-center"
                />
              ) : (me as any)?.photo ? (
                <Image
                  src={`${BUCKET_URL}${(me as any).photo.url}`}
                  alt="user photo"
                  fill
                  className="object-cover"
                />
              ) : null}

              <input
                className="hidden"
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                ref={fileInput}
                onChange={handleUserPhotoChange}
              />
            </div>
            <button
              onClick={() => {
                (fileInput.current as any).click();
              }}
              className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-default-900 shadow-2xl hover:bg-default-800"
            >
              <PencilIcon className="h-5 w-5 fill-current group-hover:text-default-100" />
            </button>
          </div>
        ) : null}
        {backGroundPhoto ? (
          <Image
            src={backGroundPhoto && URL.createObjectURL(backGroundPhoto)}
            alt="background image"
          ></Image>
        ) : me?.background ? (
          <Image
            src={`${BUCKET_URL}${me.background.url}`}
            alt="background image"
            fill
            quality={80}
            priority
            className="z-0 object-cover object-center"
          />
        ) : (
          <Image
            src={"/me/DefaultBackground.png"}
            alt="default background image"
            fill
            quality={80}
            priority
            className="z-0 object-cover object-center"
          />
        )}
      </div>
    </section>
  );
}
