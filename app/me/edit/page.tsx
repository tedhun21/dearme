"use client";

import { ChangeEvent, useState } from "react";

import PillSwitch from "@/app/ui/me/Switch";

import { FormControl, Input } from "@mui/joy";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";
import { Switch } from "@mui/material";

type UpdateDataProps = {
  id: number;
  updateData: IUpdateData;
};

type IUpdateData = {
  name: string;
  nickname: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MeEdit() {
  const [userPrivate, setUserPrivate] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // console.log(watch());

  const updateProfile = async ({ id, updateData }: UpdateDataProps) => {
    console.log(id, updateData);
    return await axios.put(
      `${API_URL}/users/${id}`,
      { data: updateData },
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1OTcwNjk5LCJleHAiOjE3MDg1NjI2OTl9.LStQcwTesyzRLOmgknKbPqw1MPHRldtzW_M9126rKJE"}`,
        },
      },
    );
  };

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateProfile,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPrivate(e.target.checked);
  };

  const onSubmit = (updateData: any) => {
    updateProfileMutate({ id: 1, updateData } as any);
  };

  return (
    <section className="mb-20 mt-4">
      <div className="flex flex-col gap-6 p-5">
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold">Private</span>
          <PillSwitch checked={userPrivate} onChange={handleChange} />
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormControl>
              <label
                htmlFor="id"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Name
              </label>
              <Input
                {...register("name")}
                variant="plain"
                sx={{
                  "--Input-radius": "0px",
                  borderBottom: "2px solid #DED0B6",
                  backgroundColor: "transparent",
                  "&:hover": {
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                  "&::before": {
                    border: "2px solid #000000", // focusedHighlight색상
                    transform: "scaleX(0)",
                    left: 0,
                    right: 0,
                    bottom: "-2px",
                    top: "unset",
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              ></Input>
            </FormControl>
            <FormControl>
              <label
                htmlFor="id"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Nickname
              </label>
              <Input
                {...register("nickname")}
                variant="plain"
                sx={{
                  "--Input-radius": "0px",
                  borderBottom: "2px solid #DED0B6",
                  backgroundColor: "transparent",
                  "&:hover": {
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                  "&::before": {
                    border: "2px solid #000000", // focusedHighlight색상
                    transform: "scaleX(0)",
                    left: 0,
                    right: 0,
                    bottom: "-2px",
                    top: "unset",
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              ></Input>
            </FormControl>
            <button
              className="flex w-full items-center justify-center border-2 border-default-800 pt-4"
              type="submit"
            >
              Edit Profile
            </button>
          </form>
        </div>
      </div>

      {/* <article className="flex flex-col items-center justify-center p-5">
        <section className="flex w-full flex-col items-center justify-center gap-5 p-5">
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              이름
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 focus:outline-none"
              defaultValue="김코딩"
              readOnly
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              닉네임
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="코딩맨"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              연락처
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="010839405552"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              주소
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="서울시 중구"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              상세주소
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="새록새록아파트 202동 1105호"
            />
          </div>
        </section>
        <section className="flex w-full flex-col items-center p-5">
          <div className="flex w-2/3 flex-col">
            <button className="w-full rounded-lg border-2 border-default-500 bg-default-100 p-2 text-xs font-semibold hover:border-default-700 hover:bg-default-500 hover:text-default-300 active:border-default-800">
              수정하기
            </button>
            <div className="flex justify-between pt-4">
              <button className="text-xs font-semibold text-default-500 hover:text-default-700">
                로그아웃
              </button>
              <button className="text-xs font-semibold text-default-500 hover:text-default-700">
                회원탈퇴
              </button>
            </div>
          </div>
        </section>
      </article> */}
    </section>
  );
}
