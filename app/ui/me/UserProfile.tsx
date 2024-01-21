"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";

import ThreeDots from "@/public/me/ThreeDots";
import UserIcon from "@/public/me/UserIcon";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function UserProfile() {
  const [me, setMe] = useState<any>();
  const fileInput = useRef(null);

  const [userPhoto, setUserPhoto] = useState<File | null>(null);

  const handleUserPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      setUserPhoto(selectedFile);

      postUserPhoto(selectedFile);
    }
  };

  const postUserPhoto = async (selectedFile: File) => {
    if (me) {
      const formData = new FormData();
      formData.append("data", JSON.stringify({}));
      formData.append("photo", selectedFile);

      const data = await axios.put(`${API_URL}/users/${me.id}`, formData, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1NDczOTUxLCJleHAiOjE3MDgwNjU5NTF9.PNFtWEKj1PqDOrtYgnCQyZ86lZhjH2ETfx1lWw9mt6c"}`,
        },
      });
      console.log(data);
    }
  };

  const getMe = async () => {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1NDczOTUxLCJleHAiOjE3MDgwNjU5NTF9.PNFtWEKj1PqDOrtYgnCQyZ86lZhjH2ETfx1lWw9mt6c"}`,
      },
    });
    setMe(data);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <section className="h-80 w-full">
      <div className="relative flex h-full p-5">
        <div className="z-10 flex w-full flex-col justify-between">
          <div className="flex justify-between">
            <Image
              src="/header/logo.png"
              alt="logo"
              width={77}
              height={20}
              quality={80}
              priority
            />
            <ThreeDots className="h-5 w-5" />
          </div>
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
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={80}
                  priority
                  className="z-0"
                />
              ) : me?.photo ? (
                <Image
                  src={`${BUCKET_URL}${me.photo.url}`}
                  alt="userPhoto"
                  fill
                  objectFit="cover"
                />
              ) : (
                <UserIcon className="h-8 w-8" />
              )}
            </div>
            <input
              className="hidden"
              type="file"
              accept="image/jpg,image/png, image/jpeg"
              ref={fileInput}
              onChange={handleUserPhotoChange}
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-bg-800 text-xl font-semibold">Doe</span>
                <span className="text-white">INFP💕</span>
              </div>
              <button className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
                Follow
              </button>
            </div>
          </div>
        </div>

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
