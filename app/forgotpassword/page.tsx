"use client";

import { useState } from "react";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import BackIcon from "@/public/forgotpassword/BackIcon";
import FPTitle from "@/public/forgotpassword/FPTitle";
import Arrow from "@/public/forgotpassword/Arrow";
import PageLevel from "@/public/forgotpassword/PageLevel";
import SelectedPhone from "@/public/forgotpassword/SelectedPhone";
import SelectedEmail from "@/public/forgotpassword/SelectedEmail";
import PageLevel2 from "@/public/forgotpassword/PageLevel2";
import PhoneCodeTitle from "@/public/forgotpassword/PhoneCodeTitle";
import EmailCodeTitle from "@/public/forgotpassword/EmailCodeTitle";
import SetNewPasswordTitle from "@/public/forgotpassword/SetNewPasswordTitle";
import PageLevel3 from "@/public/forgotpassword/PageLevel3";

export default function ForgotPassword() {
  const [currentStep, setCurrentstep] = useState("1단계");
  const [FocusedInput, setFocusedInput] = useState("");
  const [inputValues, setInputValues] = useState({
    emailInput: "",
    passwordInput: "",
    confirmPasswordInput: "",
  });

  // 비밀번호 찾기 위한 선택한 옵션에 따라 다음 단계로 이동
  const handleOptionClick = (method: any) => {
    setCurrentstep(method === "sms" ? "sms단계" : "email단계");
  };

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
    return `absolute left-20 top-14 text-default-500 transition-all duration-300 ${
      FocusedInput === inputId ||
      inputValues[inputId as keyof typeof inputValues]
        ? "left-[59px] top-[32px] text-sm"
        : ""
    }`;
  };

  return (
    <main className="flex min-h-screen justify-center">
      {currentStep === "1단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/">
              <BackIcon />
            </a>
          </header>
          <section className="flex w-full pb-[32px] pl-[64px] pt-[36px]">
            <FPTitle />
          </section>
          <article>
            <section className="flex w-full flex-col pl-[64px]">
              <p className="text-lg font-normal text-default-800">
                no worries,
              </p>
              <p className="text-lg font-normal text-default-800">
                {`we'll send you reset`}
              </p>
              <p className="text-lg font-normal text-default-800">
                instructions.
              </p>
            </section>

            <section className="relative flex w-full justify-center px-16 pt-12">
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

            <section className="flex w-full flex-col items-center gap-4 px-16 pt-8">
              <div className="mt-2 flex w-full flex-col">
                <Button
                  variant="outlined"
                  onClick={() => setCurrentstep("2단계")}
                  className="rounded-[20px] border-2 border-solid border-default-800 bg-black py-2 text-default-100 hover:bg-default-700"
                >
                  Continue
                </Button>
              </div>
            </section>

            <section className="flex justify-center">
              <a
                href="/login"
                className="inline-flex items-center gap-4 pt-4 text-sm font-semibold text-default-500"
              >
                <Arrow />
                Back to log in
              </a>
            </section>
            <section className="flex w-full justify-center pt-24">
              <PageLevel />
            </section>
          </article>
        </article>
      )}

      {currentStep === "2단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/">
              <BackIcon />
            </a>
          </header>
          <section className="flex w-full pb-[32px] pl-[64px] pt-[36px]">
            <FPTitle />
          </section>
          <article>
            <section className="flex w-full flex-col pb-[20px] pl-[64px]">
              <p className="text-lg font-normal text-default-800">
                Select which contact details
              </p>
              <p className="text-lg font-normal text-default-800">
                Should we use to reset your
              </p>
              <p className="text-lg font-normal text-default-800">password</p>
            </section>
            <section className="flex w-full flex-col justify-center gap-4 px-16">
              <figure
                className="flex items-center justify-center gap-8 rounded-[20px] bg-default-400 pb-16 pr-8 pt-16 hover:bg-default-500"
                onClick={() => handleOptionClick("sms")}
              >
                <SelectedPhone />
                <div className="flex flex-col">
                  <p className="text-default-100">via sms:</p>
                  <p>*** **** 1234</p>
                </div>
              </figure>
              <figure
                className="flex items-center justify-center gap-6 rounded-[20px] bg-default-400 pb-16 pl-8 pr-8 pt-16 hover:bg-default-500"
                onClick={() => handleOptionClick("email")}
              >
                <SelectedEmail />
                <div className="flex flex-col">
                  <p className="text-default-100">via email:</p>
                  <p>****yu@gmail.com</p>
                </div>
              </figure>
            </section>
          </article>
          <section className="flex w-full justify-center pb-12 pt-12">
            <PageLevel2 />
          </section>
        </article>
      )}

      {currentStep === "sms단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/">
              <BackIcon />
            </a>
          </header>
          <section className="flex w-full pb-[32px] pl-[64px] pt-[36px]">
            <PhoneCodeTitle />
          </section>
          <section className="flex w-full flex-col pb-[20px] pl-[64px]">
            <p className="text-lg font-normal text-default-800">
              The recovery code was sent to
            </p>
            <p className="text-lg font-normal text-default-800">
              your mobile number.
            </p>
            <p className="text-lg font-normal text-default-800">
              Please enter the code:
            </p>
          </section>

          <section className="flex w-full justify-center gap-1 pb-12 pt-4">
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              1
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              4
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              3
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              8
            </span>
          </section>

          <section className="flex w-full flex-col items-center gap-4 px-16">
            <div className="mt-2 flex w-full flex-col">
              <Button
                variant="outlined"
                onClick={() => setCurrentstep("3단계")}
                className="rounded-[20px] border-2 border-solid border-default-800 bg-black  py-2 text-default-100 hover:bg-default-700"
              >
                Continue
              </Button>
            </div>
          </section>

          <section className="mt-4 flex w-full justify-center text-xs">
            <span className="flex min-w-[220px] max-w-[280px] space-x-4">
              <h1 className="flex w-full whitespace-nowrap text-default-500">
                {`Didn't receive the code?`}
              </h1>
              <a href="/login" className="flex w-full font-semibold text-black">
                Click to resend
              </a>
            </span>
          </section>

          <section className="flex justify-center">
            <a
              href="/login"
              className="inline-flex items-center gap-4 pt-4 text-sm font-semibold text-default-500"
            >
              <Arrow />
              Back to log in
            </a>
          </section>

          <section className="flex w-full justify-center pb-12 pt-12">
            <PageLevel2 />
          </section>
        </article>
      )}

      {currentStep === "email단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/">
              <BackIcon />
            </a>
          </header>
          <section className="flex w-full pb-[32px] pl-[64px] pt-[36px]">
            <EmailCodeTitle />
          </section>
          <section className="flex w-full flex-col pb-[20px] pl-[64px]">
            <p className="text-lg font-normal text-default-800">
              We sent a code to
            </p>
            <p className="text-lg font-semibold text-default-900">
              amelie@gmail.com
            </p>
          </section>

          <section className="flex w-full justify-center gap-1 pb-12 pt-8">
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              1
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              4
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              3
            </span>
            <span className="inline-flex h-20 w-16 items-center justify-center border-2 border-default-400 text-4xl">
              8
            </span>
          </section>

          <section className="flex w-full flex-col items-center gap-4 px-16">
            <div className="mt-2 flex w-full flex-col">
              <Button
                variant="outlined"
                onClick={() => setCurrentstep("3단계")}
                className="rounded-[20px] border-2 border-solid border-default-800 bg-black py-2 text-default-100 hover:bg-default-700"
              >
                Continue
              </Button>
            </div>
          </section>
          <section className="mt-4 flex w-full justify-center text-xs">
            <span className="flex min-w-[220px] max-w-[280px] space-x-4">
              <h1 className="flex w-full whitespace-nowrap text-default-500">
                {`Didn't receive the email?`}
              </h1>
              <a href="/login" className="flex w-full font-semibold text-black">
                Click to resend
              </a>
            </span>
          </section>

          <section className="flex justify-center">
            <a
              href="/login"
              className="inline-flex items-center gap-4 pt-4 text-sm font-semibold text-default-500"
            >
              <Arrow />
              Back to log in
            </a>
          </section>

          <section className="flex w-full justify-center pb-12 pt-12">
            <PageLevel2 />
          </section>
        </article>
      )}

      {currentStep === "3단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/">
              <BackIcon />
            </a>
          </header>
          <section className="flex w-full pb-[32px] pl-[64px] pt-[36px]">
            <SetNewPasswordTitle />
          </section>
          <section className="flex w-full flex-col pl-[64px]">
            <p className="text-lg font-normal text-default-800">
              Must be at least 8 characters.
            </p>
          </section>

          <section className="relative flex w-full justify-center px-16 pt-12">
            <label
              htmlFor="passwordInput"
              className={labelClass("passwordInput")}
            >
              Password
            </label>
            <Input
              id="passwordInput"
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

          <section className="relative flex w-full justify-center px-16 pt-12">
            <label
              htmlFor="confirmPasswordInput"
              className={labelClass("confirmPasswordInput")}
            >
              Confirm Password
            </label>
            <Input
              id="confirmPasswordInput"
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

          <section className="flex w-full flex-col items-center gap-4 px-16 pt-8">
            <div className="mt-2 flex w-full flex-col">
              <Button
                variant="outlined"
                onClick={() => setCurrentstep("4단계")}
                className="rounded-[20px] border-2 border-solid border-default-800 bg-black py-2 text-default-100 hover:bg-default-700"
              >
                Reset password
              </Button>
            </div>
          </section>

          <section className="flex justify-center">
            <a
              href="/login"
              className="inline-flex items-center gap-4 pt-4 text-sm font-semibold text-default-500"
            >
              <Arrow />
              Back to log in
            </a>
          </section>

          <section className="flex w-full justify-center pt-24">
            <PageLevel3 />
          </section>
        </article>
      )}
    </main>
  );
}
