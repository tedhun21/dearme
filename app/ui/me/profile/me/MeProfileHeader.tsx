import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";

import BackButton from "../../../backbutton";
import { updateUserPhoto } from "@/store/api";
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
    mutationFn: updateUserPhoto,
    onSuccess: (data: any) => {
      window.alert(data.message);
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
            <div className="flex flex-col items-start justify-center gap-1">
              {me?.nickname ? (
                <span className="rounded-md bg-white bg-opacity-50 px-2 text-xl font-semibold text-default-800 text-opacity-100">
                  {me.nickname}
                </span>
              ) : null}
              <span className="flex items-center justify-center rounded-md bg-white bg-opacity-50 px-2 text-default-800">
                {(me as any)?.body}
              </span>
            </div>
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
