"use client";

import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from "firebase/auth";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FormHelperText } from "@mui/joy";

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
import PasswordRestSuccessfulTitle from "@/public/forgotpassword/PasswordRestSuccessfulTitle";
import SuccessfulCheck from "@/public/forgotpassword/SuccessfulCheck";
import PageLevel4 from "@/public/forgotpassword/PageLevel4";
import X from "@/public/signup/X";
import Check from "@/public/signup/Check";

// Firebase 초기화
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export default function ForgotPassword() {
  const [currentStep, setCurrentstep] = useState("1단계");
  const [FocusedInput, setFocusedInput] = useState("");
  const [userInfo, setUserInfo] = useState({ email: "", phone: "" });
  const [duplicateCheck, setDuplicateCheck] = useState({
    // 중복 검사 상태를 저장
    email: false,
  });
  const [inputValues, setInputValues] = useState({
    emailInput: "",
    passwordInput: "",
    confirmPasswordInput: "",
  });

  // yup을 이용한 유효성 검사
  const Schema = yup.object().shape({
    email: yup
      .string()
      .email("이메일 형식이 아닙니다.")
      .required("이메일을 입력해주세요."),
    password: yup.string().required("비밀번호를 입력해주세요."),
    confirmPassword: yup.lazy(() => {
      return yup
        .string()
        .required("비밀번호를 입력해주세요.")
        .oneOf([yup.ref("password"), ""], "비밀번호가 서로 다릅니다.");
    }),
  });
  type IFormForgotPasswordInputs = yup.InferType<typeof Schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    mode: "onChange", // 실시간 유효성 검사를 위해 onChange 모드 설정
  });

  // Email 인증 링크를 보내는 함수
  const sendEmailVerification = (email: string) => {
    const auth = getAuth(app);

    const emailVerificationUrl = `http://${process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_URL}:1337/verifyEmail`;
    const actionCodeSettings = {
      // 사용자가 인증 링크를 클릭한 후 이동할 URL
      // 사용자가 이메일 인증을 완료한 후 돌아올 로그인 페이지 URL을 명시
      url: emailVerificationUrl,
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email); // 추후 인증 과정에서 사용하기 위해 이메일 저장
        // 사용자에게 인증 이메일이 전송되었음을 알립니다.
      })
      .catch((error) => {
        console.error("Error sending email verification link", error);
      });
  };

  // Debouncing 함수 (연속적인 API 호출을 방지하기 위해)
  const debounce = (func: any, delay: any) => {
    let inDebounce: any;
    return function (...args: any) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const checkEmail = debounce(async (email: string) => {
    if (!email) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/check-email?email=${email}`,
        { params: { email } },
      );

      // 중복 여부에 따른 처리
      if (response.data.duplicate) {
        setDuplicateCheck({ ...duplicateCheck, email: true });
      } else {
        setDuplicateCheck({ ...duplicateCheck, email: false });
      }
    } catch (error) {
      console.error("Error during email check:", error);
    }
  }, 500);

  // 중복 검사 결과 메시지 표시
  const renderDuplicateMessage = (type: string) => {
    if (inputValues.emailInput && !duplicateCheck.email) {
      return (
        <FormHelperText className="mt-2 justify-center text-red-500">
          등록되지 않은 이메일입니다.
        </FormHelperText>
      );
    }
    return null;
  };

  // 비밀번호 찾기 위한 선택한 옵션에 따라 다음 단계로 이동
  const handleOptionClick = (method: any) => {
    setCurrentstep(method === "sms" ? "sms단계" : "email단계");
  };

  // 입력 필드의 onChange 핸들러
  const handleEmailInputChange = (e: any) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, emailInput: value });
    checkEmail(value); // 이메일 중복 검사 호출
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

  // 첫 번째 단계에서 이메일 검증 후 사용자 정보 조회
  const handleEmailCheck = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/find-by-email?email=${inputValues.emailInput}`,
      );
      setUserInfo(response.data);
      setCurrentstep("2단계");
    } catch (error) {
      console.error("Error during email verification:", error);
    }
  };

  // 이메일 마스킹 처리
  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    return `${username.slice(0, 4)}****@${domain}`;
  };
  // 휴대폰 번호 마스킹 처리
  const maskPhone = (phone: string) => {
    return `${phone.slice(0, 3)}****${phone.slice(7, 11)}`;
  };

  // 첫 번째 단계 Continue 버튼 클릭 핸들러
  const handleContinue = () => {
    handleEmailCheck()
      .then(() => {
        sendEmailVerification(inputValues.emailInput);
      })
      .catch((error) => {
        console.error("Error sending email verification link", error);
      });
  };

  return (
    <main className="flex min-h-screen justify-center">
      {currentStep === "1단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
          <header className="pl-8 pt-8">
            <a href="/login">
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
                {...register("email", {
                  onChange: (e) => {
                    handleChange(e);
                    handleEmailInputChange(e);
                  },
                  onBlur: handleBlur,
                })}
                onFocus={handleFocus}
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
              {inputValues.emailInput && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-[70px] pt-12 leading-5">
                  {duplicateCheck.email ? <Check /> : <X />}
                </div>
              )}
            </section>
            {errors.email && inputValues.emailInput && (
              <FormHelperText className="mt-2 justify-center text-red-500">
                {errors.email.message}
              </FormHelperText>
            )}
            {renderDuplicateMessage("email")}

            <section className="flex w-full flex-col items-center gap-4 px-16 pt-8">
              <div className="mt-2 flex w-full flex-col">
                <Button
                  variant="outlined"
                  onClick={handleContinue}
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
            <a href="/forgotpassword">
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
                  <p>{maskPhone(userInfo.phone)}</p>
                </div>
              </figure>
              <figure
                className="flex items-center justify-center gap-6 rounded-[20px] bg-default-400 pb-16 pl-8 pr-8 pt-16 hover:bg-default-500"
                onClick={() => handleOptionClick("email")}
              >
                <SelectedEmail />
                <div className="flex flex-col">
                  <p className="text-default-100">via email:</p>
                  <p>{maskEmail(userInfo.email)}</p>
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

          <section className="relative flex w-full justify-center px-16 pt-12">
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

      {currentStep === "4단계" && (
        <article className="flex w-full min-w-[360px] max-w-[600px] flex-col items-center justify-center bg-default-200 shadow-lg">
          <header>
            <SuccessfulCheck />
          </header>
          <section className="flex w-full justify-center pb-[32px] pt-[36px]">
            <PasswordRestSuccessfulTitle />
          </section>
          <article>
            <section className="flex w-full flex-col items-center justify-center">
              <p className="text-lg font-normal text-default-800">
                You have successfully reset your
              </p>
              <p className="text-lg font-normal text-default-800">
                password. Please use your new
              </p>
              <p className="text-lg font-normal text-default-800">
                password when logging in.
              </p>
            </section>
          </article>

          <section className="flex w-full flex-col items-center gap-4 px-28 pt-8">
            <div className="mt-2 flex w-full flex-col">
              <Button
                variant="outlined"
                onClick={() => setCurrentstep("2단계")}
                className="rounded-[20px] border-2 border-solid border-default-800 bg-black py-4 text-default-100 hover:bg-default-700"
              >
                Login
              </Button>
            </div>
          </section>

          <section className="flex w-full justify-center pt-24">
            <PageLevel4 />
          </section>
        </article>
      )}
    </main>
  );
}
