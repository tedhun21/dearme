"use client";

import { useState } from "react";

import BackIcon from "@/public/signup/BackIcon";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SignupTitle from "@/public/signup/SignupTitle";

export default function Signup() {
  const [FocusedInput, setFocusedInput] = useState("");
  const [inputValues, setInputValues] = useState({
    nameInput: "",
    contactNumberInput: "",
    addressInput: "",
    detailedAddressInput: "",
    emailInput: "",
    nicknameInput: "",
    passwordInput: "",
    confirmPasswordInput: "",
  });

  // input이 focus되었을 때
  const handleFocus = (e: any) => {
    setFocusedInput(e.target.id);
  };

  // input이 focus를 해제되었을 때
  const handleBlur = () => {
    setFocusedInput("");
  };

  // input의 value를 state에 저장
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // 라벨의 클래스를 동적으로 변경
  const labelClass = (inputId: string) => {
    return `absolute left-16 top-2 text-default-500 transition-all duration-300 ${
      FocusedInput === inputId ||
      inputValues[inputId as keyof typeof inputValues]
        ? "left-[48px] top-[-16px] text-sm"
        : ""
    }`;
  };

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <section className="flex w-full pb-[36px] pl-[64px] pt-[36px]">
          <SignupTitle />
        </section>
        <article className="flex w-full flex-col items-center gap-4">
          <section className="relative flex w-full justify-center px-12">
            <label htmlFor="nameInput" className={labelClass("nameInput")}>
              name
            </label>
            <Input
              id="nameInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.nameInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="contactNumberInput"
              className={labelClass("contactNumberInput")}
            >
              Contact Number
            </label>
            <Input
              id="contactNumberInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.contactNumberInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="addressInput"
              className={labelClass("addressInput")}
            >
              Address
            </label>
            <Input
              id="addressInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.addressInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="detailedAddressInput"
              className={labelClass("detailedAddressInput")}
            >
              Detailed Address
            </label>
            <Input
              id="detailedAddressInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.detailedAddressInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label htmlFor="emailInput" className={labelClass("emailInput")}>
              Email
            </label>
            <Input
              id="emailInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.emailInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="nicknameInput"
              className={labelClass("nicknameInput")}
            >
              Nickname
            </label>
            <Input
              id="nicknameInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.nicknameInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="passwordInput"
              className={labelClass("passwordInput")}
            >
              Password
            </label>
            <Input
              id="passwordInput"
              type="password"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.passwordInput}
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

          <section className="relative flex w-full justify-center px-12">
            <label
              htmlFor="confirmPasswordInput"
              className={labelClass("confirmPasswordInput")}
            >
              Confirm Password
            </label>
            <Input
              id="confirmPasswordInput"
              type="password"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.confirmPasswordInput}
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

          <div className="flex w-full min-w-[220px] max-w-[280px] content-center justify-center pt-4">
            <input
              id="agreeToTermsAndServices"
              className="mr-2"
              type="checkbox"
            />
            <label
              htmlFor="agreeToTermsAndServices"
              className="text-defalut-800 text-sm underline hover:text-default-600"
            >
              AGREE TO TERMS AND SERVICES
            </label>
          </div>

          <section className="flex w-full flex-col items-center gap-4 px-12">
            <div className="mt-2 flex w-full flex-col">
              <Button
                variant="outlined"
                className="rounded-[20px] border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
              >
                Create account
              </Button>
            </div>
          </section>
          <section className="mb-4 flex w-full min-w-[220px] max-w-[280px] justify-center space-x-16 pb-[36px] text-xs">
            <h1 className="flex w-full whitespace-nowrap text-gray-500">
              Already have an account?
            </h1>
            <a href="/login" className="flex w-full text-default-900">
              Login here
            </a>
          </section>
        </article>
      </article>
    </main>
  );
}
