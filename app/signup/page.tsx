"use client";

import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import BackIcon from "@/public/signup/BackIcon";
import X from "@/public/signup/X";
import Check from "@/public/signup/Check";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SignupTitle from "@/public/signup/SignupTitle";
import { FormHelperText } from "@mui/joy";

export default function Signup() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState(false); // 약관 동의 체크박스 상태를 저장
  const [FocusedInput, setFocusedInput] = useState(""); // input의 focus 상태를 저장
  const [duplicateCheck, setDuplicateCheck] = useState({
    // 중복 검사 상태를 저장
    nickname: false,
    email: false,
  });
  const [inputValues, setInputValues] = useState({
    // input의 value를 저장
    nameInput: "",
    emailInput: "",
    nicknameInput: "",
    passwordInput: "",
    confirmPasswordInput: "",
  });

  // yup을 이용한 유효성검사
  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "이름은 2자 이상이어야 합니다.")
      .required("이름을 입력해주세요."),
    email: yup
      .string()
      .email("이메일 형식을 지켜주세요.")
      .required("이메일을 입력해주세요."),
    nickname: yup
      .string()
      .min(2, "닉네임은 2자 이상부터 가능합니다.")
      .required("닉네임을 입력해주세요."),
    password: yup.string().required("비밀번호를 입력해주세요."),
    confirmPassword: yup.lazy(() => {
      return yup
        .string()
        .required("비밀번호를 입력해주세요.")
        .oneOf([yup.ref("password"), ""], "비밀번호가 서로 다릅니다.");
    }),
  });
  type IFormSignupInputs = yup.InferType<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange", // 실시간 유효성 검사를 위해 onChange 모드 설정
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

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (e: any) => {
    setIsCheck(e.target.checked);
  };

  // 입력 필드의 onChange 핸들러
  const handleNicknameInputChange = (e: any) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, nicknameInput: value });
    checkNickname(value); // 닉네임 중복 검사 호출
  };

  const handleEmailInputChange = (e: any) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, emailInput: value });
    checkEmail(value); // 이메일 중복 검사 호출
  };

  // 중복 검사 결과 메시지 표시
  const renderDuplicateMessage = (type: string) => {
    if (type === "nickname" && duplicateCheck.nickname) {
      return (
        <FormHelperText className="text-red-500">
          닉네임이 이미 사용 중입니다.
        </FormHelperText>
      );
    }
    if (type === "email" && duplicateCheck.email) {
      return (
        <FormHelperText className="text-red-500">
          이메일이 이미 사용 중입니다.
        </FormHelperText>
      );
    }
    return null;
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

  // Debouncing 함수 (연속적인 API 호출을 방지하기 위해)
  const debounce = (func: any, delay: any) => {
    let inDebounce: any;
    return function (...args: any) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // 닉네임 중복 검사 함수
  const checkNickname = debounce(async (nickname: string) => {
    if (!nickname) return; // 비어있는 경우 검사하지 않음
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/check-nickname?nickname=${nickname}`,
        { params: { nickname } },
      );
      // 중복 여부에 따른 처리
      if (response.data.duplicate) {
        setDuplicateCheck({ ...duplicateCheck, nickname: true });
      } else {
        setDuplicateCheck({ ...duplicateCheck, nickname: false });
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  }, 500); // 500ms의 디바운스 시간 설정

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

  // 회원가입 처리하는 로직
  const onSubmit = async (data: IFormSignupInputs) => {
    const { name, email, nickname, password } = data;

    if (!isCheck) {
      alert("약관에 동의해야 회원가입이 가능합니다");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
        {
          username: name,
          email,
          nickname,
          password,
        },
      );

      if (
        response.data.status === 201 ||
        response.data.message === "Successfully create a user."
      ) {
        alert("회원가입이 완료되었습니다");
        router.push("/login");
      }
    } catch (error) {
      alert("회원 가입에 실패하였습니다. 다시 시도해 주세요.");
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
        <section className="flex w-full pb-[36px] pl-[64px] pt-[36px]">
          <SignupTitle />
        </section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          name="loginForm"
          className="flex w-full flex-col items-center gap-4"
        >
          <section className="relative flex w-full justify-center px-12">
            <label htmlFor="nameInput" className={labelClass("nameInput")}>
              name
            </label>
            <Input
              id="nameInput"
              className="focus:border-neutral-outlinedHoverBorder w-full border-b-2 border-gray-300 bg-transparent"
              {...register("name", {
                onChange: (e) => {
                  handleChange(e);
                },
                onBlur: handleBlur,
              })}
              onFocus={handleFocus}
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
            {inputValues.nameInput && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-16 pt-1 leading-5">
                {errors.name ? <X /> : <Check />}
              </div>
            )}
          </section>
          {errors.name && (
            <FormHelperText className="text-red-500">
              {errors.name.message}
            </FormHelperText>
          )}

          <section className="relative flex w-full justify-center px-12">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-16 pt-1 leading-5">
                {duplicateCheck.email ? <X /> : <Check />}
              </div>
            )}
          </section>
          {errors.email && (
            <FormHelperText className="text-red-500">
              {errors.email.message}
            </FormHelperText>
          )}
          {renderDuplicateMessage("email")}

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
              {...register("nickname", {
                onChange: (e) => {
                  handleChange(e);
                  handleNicknameInputChange(e);
                },
                onBlur: handleBlur,
              })}
              onFocus={handleFocus}
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
            {inputValues.nicknameInput && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-16 pt-1 leading-5">
                {duplicateCheck.nickname ? <X /> : <Check />}
              </div>
            )}
          </section>
          {errors.nickname && (
            <FormHelperText className="text-red-500">
              {errors.nickname.message}
            </FormHelperText>
          )}
          {renderDuplicateMessage("nickname")}

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
              {...register("password", {
                onChange: (e) => {
                  handleChange(e);
                },
                onBlur: handleBlur,
              })}
              onFocus={handleFocus}
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
            {inputValues.passwordInput && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-16 pt-1 leading-5">
                {errors.password ? <X /> : <Check />}
              </div>
            )}
          </section>
          {errors.password && (
            <FormHelperText className="text-red-500">
              {errors.password.message}
            </FormHelperText>
          )}

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
              {...register("confirmPassword", {
                onChange: (e) => {
                  handleChange(e);
                },
                onBlur: handleBlur,
              })}
              onFocus={handleFocus}
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
            {inputValues.confirmPasswordInput && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-16 pt-1 leading-5">
                {errors.confirmPassword ? <X /> : <Check />}
              </div>
            )}
          </section>
          {errors.confirmPassword && (
            <FormHelperText className="text-red-500">
              {errors.confirmPassword.message}
            </FormHelperText>
          )}

          <div className="flex w-full min-w-[220px] max-w-[280px] content-center justify-center pt-4">
            <input
              id="agreeToTermsAndServices"
              className="mr-2"
              type="checkbox"
              checked={isCheck}
              onChange={handleCheckboxChange}
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
                type="submit"
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
        </form>
      </article>
    </main>
  );
}
