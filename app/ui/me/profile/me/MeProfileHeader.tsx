import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import BackButton from "../../../backbutton";
import { deleteImage, updateUserPhoto } from "@/store/api";
import PencilIcon from "@/public/me/PencilIcon";
import MeProfileHeaderMeatball from "./MeProfileHeaderMeatball";
import UserWithNoImage from "@/public/social/UserWithNoImage";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MeProfileHeader({ me, route }: any) {
  const queryClient = useQueryClient();

  const [deleteHover, setDeleteHover] = useState(false);
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
    },
  });

  // 유저 이미지 삭제
  const { mutate: deleteUserPhotoMutate } = useMutation({
    mutationKey: ["deleteUserImage"],
    mutationFn: deleteImage,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getMe"] });

      const prevMe = queryClient.getQueryData(["getMe"]);

      queryClient.setQueryData(["getMe"], (old: any) => ({
        ...old,
        photo: null,
      }));

      return { prevMe };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getMe"], context?.prevMe);
    },
  });

  // 유저 사진 바꾸기, 바꾸면서 업데이트 통신을 같이
  const handleUserPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me) {
        // 유저 프로필 사진 업데이트
        updateUserPhotoMutate({
          userId: me.id,
          selectedFile,
        });
      }
    }
  };

  const handleDeleteUserPhoto = () => {
    deleteUserPhotoMutate(me.photo.id);
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
        <MeProfileHeaderMeatball me={me} route={route} />
      </div>
      {route === "edit" ? (
        <div className="relative flex">
          <Image src="/me/Edit.svg" width={110} height={48} alt="edit" />
        </div>
      ) : (
        // edit 상태가 아닐 때 유저 프로필 사진
        <div className="px-4">
          <button
            type="button"
            className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-default-300"
            onClick={() => {
              (userfileInput.current as any).click();
            }}
          >
            {me?.photo?.url ? (
              <Image
                src={`${BUCKET_URL}${(me as any).photo.url}`}
                alt="profile default image"
                fill
                sizes="80px"
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            ) : (
              <UserWithNoImage className="h-full w-full" />
            )}
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
      {/* edit에서의 유저 프로필 사진 */}
      {route === "edit" && me?.photo?.url ? (
        <div
          className="absolute -bottom-10 right-10"
          onMouseEnter={() => setDeleteHover(true)}
          onMouseLeave={() => setDeleteHover(false)}
        >
          <div className="relative z-10 h-48 w-48 overflow-hidden rounded-full">
            <Image
              src={`${BUCKET_URL}${(me as any).photo.url}`}
              alt="user photo"
              fill
              quality={80}
              priority
              className="z-0 object-cover"
            />
          </div>
          <input
            className="hidden"
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={userfileInput}
            onChange={handleUserPhotoChange}
          />
          {deleteHover ? (
            <button
              type="button"
              className="absolute left-5 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-700"
              onClick={() => handleDeleteUserPhoto()}
            >
              &times;
            </button>
          ) : null}
          <button
            onClick={() => {
              (userfileInput.current as any).click();
            }}
            className="group absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-default-900 shadow-2xl hover:bg-default-800"
          >
            <PencilIcon className="h-5 w-5 fill-current group-hover:text-default-100" />
          </button>
        </div>
      ) : route === "edit" && !me?.photo?.url ? (
        <div className="absolute -bottom-10 right-10">
          <UserWithNoImage className=" z-10 h-48 w-48" />
          <input
            className="hidden"
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={userfileInput}
            onChange={handleUserPhotoChange}
          />
          <button
            onClick={() => {
              (userfileInput.current as any).click();
            }}
            className="group absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-default-900 shadow-2xl hover:bg-default-800"
          >
            <PencilIcon className="h-5 w-5 fill-current group-hover:text-default-100" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

{
  /* {deleteHover ? (
              <button
                type="button"
                className="absolute top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-700"
                onClick={() => handleDeleteUserPhoto()}
              >
                &times;
              </button>
            ) : null} */
}

{
  /* <div className="absolute -bottom-10 right-10 z-10 h-48 w-48">
          {userPhoto ? (
            <div className="relative h-full w-full overflow-hidden rounded-full bg-default-300 shadow-2xl">
              <Image
                src={userPhoto && URL.createObjectURL(userPhoto)}
                alt="user photo"
                fill
                quality={80}
                priority
                className="z-0 object-cover"
              />
              <div>hi</div>
            </div>
          ) : (me as any)?.photo ? (
            <div className="h-full w-full">
              <div className="h-full w-full overflow-hidden rounded-full bg-default-300 shadow-2xl">
                <Image
                  src={`${BUCKET_URL}${(me as any).photo.url}`}
                  alt="user photo"
                  fill
                  className="object-z-0 object-cover"
                />
              </div>
              <button>delete photo</button>
            </div>
          ) : (
            <UserWithNoImage className="h-full w-full" />
          )}

          <input
            className="hidden"
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={userfileInput}
            onChange={handleUserPhotoChange}
          />

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
    </div> */
}
