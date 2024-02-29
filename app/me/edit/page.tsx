"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilValueLoadable } from "recoil";
import { useMutation } from "@tanstack/react-query";

import { FormControl, Input } from "@mui/joy";
import PillSwitch from "@/app/ui/me/Switch";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { updateMe } from "@/store/api";
import { meState } from "@/store/atoms";

export default function MeEdit() {
  // 초기값이 undefined여서 업데이트되면 초기값으로 설정
  const me = useRecoilValueLoadable(meState);

  // 초기값이 undefined여서 업데이트되면 초기값으로 설정
  const [userPrivate, setUserPrivate] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // console.log(watch());

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateMe,
    onSuccess: ({ data }) => {
      window.alert(data.message);
      window.location.reload();
    },
    onError: ({
      response: {
        data: { error },
      },
    }: any) => {
      setError(error.details.field, { type: "manual", message: error.message });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPrivate(e.target.checked);
  };

  const onSubmit = (updateData: any) => {
    // 빈 스트링 제거
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === "" || updateData[key] == null) {
        delete updateData[key];
      }
    });

    if (me.state === "hasValue" && me.contents.id)
      updateProfileMutate({
        userId: me.contents.id,
        updateData: { ...updateData, private: userPrivate },
      } as any);
  };

  useEffect(() => {
    if (me.state === "hasValue") {
      setUserPrivate(me.contents?.private);
    }
  }, [me.state, me.contents]);

  return (
    <section className="mb-20 mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-5"
      >
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold">Private</span>
          <PillSwitch checked={userPrivate ?? false} onChange={handleChange} />
        </div>
        <div>
          <div className="flex w-full flex-col gap-5">
            <FormControl>
              <label
                htmlFor="username"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Name
              </label>
              <Input
                id="username"
                variant="plain"
                defaultValue={me.contents?.username}
                readOnly
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
                htmlFor="email"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Email
              </label>
              <Input
                id="email"
                variant="plain"
                defaultValue={me.contents?.email}
                readOnly
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
                htmlFor="nickname"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Nickname
              </label>
              <Input
                id="nickname"
                {...register("nickname")}
                variant="plain"
                defaultValue={me.contents?.nickname}
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
              {errors.nickname && (
                <p className="text-red-500">
                  {(errors as any).nickname.message}
                </p>
              )}
            </FormControl>
            <FormControl>
              <label
                htmlFor="phone"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Phone
              </label>
              <Input
                id="phone"
                {...register("phone")}
                variant="plain"
                defaultValue={me.contents?.phone}
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
              {errors.phone && (
                <p className="text-red-500">{(errors as any).phone.message}</p>
              )}
            </FormControl>
            <FormControl>
              <label
                htmlFor="body"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Introduce
              </label>
              <TextareaAutosize
                id="body"
                {...register("body")}
                defaultValue={me.contents?.body}
                minRows={3}
                maxRows={6}
                className="rounded-md border border-solid hover:border-default-800 focus:border-default-900 focus:shadow-lg focus-visible:outline-0"
              ></TextareaAutosize>
            </FormControl>
            <div className="mx-8 flex flex-col items-center justify-center gap-4">
              <button
                className="w-full rounded-3xl border-2 border-default-800 bg-default-300 py-3 font-bold hover:bg-default-400 active:bg-default-800 active:text-default-900"
                type="submit"
              >
                Edit Profile
              </button>
              <div className="flex w-full justify-between">
                <button
                  type="button"
                  className="font-semibold hover:text-default-800 active:text-default-900"
                >
                  Log out
                </button>
                <button
                  type="button"
                  className="font-semibold hover:text-default-800 active:text-default-900"
                >
                  Withdrawal
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
