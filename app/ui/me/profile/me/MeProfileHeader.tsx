import clsx from "clsx";
import BackButton from "../../../backbutton";
import Link from "next/link";
import Image from "next/image";
import { IconButton, Menu } from "@mui/material";
import ShareIcon from "@/public/me/ShareIcon";
import BackGroundIcon from "@/public/me/BackGroundIcon";
import EditIcon from "@/public/me/EditIcon";

import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateBackGroundPhoto, updateUserPhoto } from "@/store/api";
import PencilIcon from "@/public/me/PencilIcon";
import MeProfileHeaderMeatball from "./MeProfileHeaderMeatball";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MeProfileHeader({
  me,
  route,
  setBackGroundPhoto,
}: any) {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);

  const userfileInput = useRef(null);

  // 유저 프로필 사진 바꾸기
  const { mutate: updateUserPhotoMutate } = useMutation({
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

  return (
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
        <MeProfileHeaderMeatball
          me={me}
          route={route}
          setBackGroundPhoto={setBackGroundPhoto}
        />
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
              (userfileInput.current as any).click();
            }}
          >
            {userPhoto ? (
              <Image
                src={userPhoto && URL.createObjectURL(userPhoto)}
                alt="profile default image"
                fill
                sizes="80px"
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            ) : (me as any)?.photo ? (
              <Image
                src={`${BUCKET_URL}${(me as any).photo.url}`}
                alt="userPhoto"
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : null}
          </button>
          <input
            hidden
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={userfileInput}
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
              ref={userfileInput}
              onChange={handleUserPhotoChange}
            />
          </div>
          <button
            onClick={() => {
              (userfileInput.current as any).click();
            }}
            className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-default-900 shadow-2xl hover:bg-default-800"
          >
            <PencilIcon className="h-5 w-5 fill-current group-hover:text-default-100" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
