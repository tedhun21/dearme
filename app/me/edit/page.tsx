"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FormControl, Input } from "@mui/joy";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { getMe, updateMe } from "@/store/api";
import { Switch } from "@mui/material";

import SignOut from "@/app/ui/me/edit/SignOut";
import Withdrawal from "@/app/ui/me/edit/Withdrawal";

export default function MeEdit() {
  const router = useRouter();

  const { isSuccess, data: me } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateMe,

    onSuccess: ({ data }: any) => {
      window.alert(data.message);
    },
    onError: (err: any, _, context) => {
      setError(err.response.data.error.details.field, {
        type: "manual",
        message: err.response.data.error.message,
      });
    },
  });

  const onSubmit = (updateData: any) => {
    // 빈 스트링 제거
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === "" || updateData[key] == null) {
        delete updateData[key];
      }
    });

    updateProfileMutate({
      userId: me.id,
      updateData: { ...updateData },
    } as any);
  };

  useEffect(() => {
    if (isSuccess && !me) {
      window.alert("login again");
      router.push("/");
    } else if (isSuccess && me) {
      setValue("private", me.private ?? false);
      setValue("username", me.username ?? "");
      setValue("email", me.email ?? "");
      setValue("nickname", me.nickname ?? "");
      setValue("phone", me.phone ?? "");
      setValue("body", me.body ?? "");
    }
  }, [isSuccess, me]);

  return (
    <section className="mb-20 mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-5"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="private" className="text-xl font-semibold">
            Private
          </label>
          <Controller
            name="private"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value ?? false}
                onChange={field.onChange}
                sx={{
                  /// switch 기본 박스 크기
                  padding: 0,
                  width: "32px",
                  height: "20px",
                  "& .MuiSwitch-switchBase": {
                    padding: 0,
                    margin: "2px",
                    transitionDuration: "300ms",
                    /// 체크될때
                    "&.Mui-checked": {
                      transform: "translateX(12px)",
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#143422",
                        opacity: 1,
                        border: 0,
                      },
                      "&.Mui-disabled + .MuiSwitch-track": {
                        opacity: 0.5,
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    boxSizing: "border-box",
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    backgroundColor: "#b6b6c0",
                    opacity: 1,
                  },
                }}
              />
            )}
          />
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
                {...register("username")}
                variant="plain"
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
              />
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
                {...register("email")}
                variant="plain"
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
              />
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
                defaultValue={me?.nickname}
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
              />
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
                defaultValue={me?.phone}
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
              />
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
                minRows={3}
                maxRows={6}
                className="rounded-md border border-solid hover:border-default-800 focus:border-default-900 focus:shadow-lg focus-visible:outline-0"
              />
            </FormControl>
            <div className="mx-8 flex flex-col items-center justify-center gap-4">
              <button
                className="w-full rounded-3xl border-2 border-default-800 bg-default-300 py-3 font-bold hover:bg-default-400 active:bg-default-800 active:text-default-900"
                type="submit"
              >
                Edit Profile
              </button>
              <div className="flex w-full justify-between">
                <SignOut />
                <Withdrawal me={me} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
