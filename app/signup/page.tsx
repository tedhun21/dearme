"use client";

import { useState } from "react";

import BackIcon from "@/public/signup/BackIcon";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SignupTitle from "@/public/signup/SignupTitle";

export default function Signup() {
  const [FocusedInput, setFocusedInput] = useState("");

  const handleFocus = (e: any) => {
    setFocusedInput(e.target.id);
  };

  const handleBlur = (e: any) => {
    // e.target.value가 없을 때만 (인풋 필드에 내용이 없을 때만) 포커스 상태를 초기화합니다.
    if (!e.target.value) {
      setFocusedInput("");
    }
  };

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <section className="flex w-full pb-[40px] pl-[64px] pt-[36px]">
          <SignupTitle />
        </section>
        <article className="flex w-full flex-col items-center gap-4">
          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="nameInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "nameInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              name
            </label>
            <Input
              id="nameInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="contactNumberInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "contactNumberInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Contact Number
            </label>
            <Input
              id="contactNumberInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="addressInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "addressInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Address
            </label>
            <Input
              id="addressInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="detailedAddressInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "detailedAddressInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Detailed Address
            </label>
            <Input
              id="detailedAddressInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="emailInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "emailInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Email
            </label>
            <Input
              id="emailInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="nicknameInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "nicknameInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Nickname
            </label>
            <Input
              id="nicknameInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="passwordInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "passwordInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Password
            </label>
            <Input
              id="passwordInput"
              type="password"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>

          <section className="relative flex w-full justify-center px-16">
            <label
              htmlFor="confirmPasswordInput"
              className={`absolute left-20 top-2 text-default-500 transition-all duration-300 ${
                FocusedInput === "confirmPasswordInput"
                  ? "left-[64px] top-[-16px] text-sm"
                  : ""
              }`}
            >
              Confirm Password
            </label>
            <Input
              id="confirmPasswordInput"
              type="password"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              variant="plain"
              sx={{
                width: "100%",
                "--Input-radius": "0px",
                borderBottom: "2px solid #DED0B6",
                backgroundColor: "transparent",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid #000000", // focusedHighlight색상
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
          </section>
          <section className="flex w-full flex-col items-center gap-4 px-16">
            <div className="mt-8 flex w-full flex-col">
              <Button
                variant="outlined"
                className="rounded-[20px] border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
              >
                Create account
              </Button>
            </div>
          </section>
          <section className="mb-4 flex w-full min-w-[220px] max-w-[280px] justify-center text-xs">
            <h1 className="flex w-full justify-center text-gray-500">
              Already have an account?
            </h1>
            <a
              href="/login"
              className="flex w-full justify-center text-default-900"
            >
              Login here
            </a>
          </section>
        </article>
      </article>
    </main>
  );
}
