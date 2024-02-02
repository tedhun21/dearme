"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import clsx from "clsx";

import { getMe, updateUserPhoto } from "@/store/api";
import { IMe, meState } from "@/store/atoms";

import ProfileSetting from "./ProfileSetting";
import BackButton from "../backbutton";
import PencilIcon from "@/public/me/PencilIcon";
import { getCookie } from "@/util/tokenCookie";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
const access_token = getCookie("access_token");

export default function MeProfile({ route }: { route?: string }) {
  const [me, setMe] = useRecoilState<IMe>(meState);

  const fileInput = useRef(null);
  const [userPhoto, setUserPhoto] = useState<File | null>(null);

  const { isSuccess, data: meData } = useQuery({
    queryKey: ["getMe", { access_token }],
    queryFn: getMe,
  });

  const { mutate: updateUserPhotoMutate, data: updateUserPhotoData } =
    useMutation({
      mutationKey: ["updateUserPhoto"],
      mutationFn: (variables: {
        userId: number;
        selectedFile: File;
        access_token: string | null | undefined;
      }) => updateUserPhoto(variables),
      onSuccess: ({ message }: any) => {
        window.alert(message);
      },
    });

  // 유저 사진 바꾸기, 바꾸면서 업데이트 통신을 같이
  const handleUserPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me && access_token) {
        setUserPhoto(selectedFile);

        postUserPhoto(selectedFile);
      }
    }
  };

  // 유저 사진 업데이트
  const postUserPhoto = async (selectedFile: File) => {
    updateUserPhotoMutate({
      userId: me.id,
      selectedFile,
      access_token,
    });
  };

  useEffect(() => {
    if (meData) {
      setMe(meData);
    }
  }, [isSuccess]);

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
            <ProfileSetting />
          </div>
          {route === "edit" ? (
            <div className="relative flex">
              <Image src="/me/Edit.svg" width={110} height={48} alt="edit" />
            </div>
          ) : (
            <div className="px-4">
              <div
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
              </div>
              <input
                className="hidden"
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
        <Image
          src="/me/DefaultBackground.png"
          alt="profile default image"
          fill
          quality={80}
          priority
          className="z-0 object-cover object-center"
        />
      </div>
    </section>
  );
}
