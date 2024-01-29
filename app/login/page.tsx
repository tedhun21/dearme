"use client";

import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";

import BackIcon from "@/public/login/BackIcon";
import DearmeLogo from "@/public/login/DearmeLogo";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FormControl, FormHelperText } from "@mui/joy";

import GoogleLogo from "@/public/login/GoogleLogo";
import EyeOffIcon from "@/public/login/EyeOffIcon";
import EyeIcon from "@/public/login/EyeIcon";

const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    const googleLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/google`;

    window.location.href = googleLoginUrl;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // yup을 이용한 유효성검사
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("이메일 주소 양식이 아닙니다.")
      .required("이메일 주소를 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .required("비밀번호를 입력해주세요."),
  });
  type IFormLoginInputs = yup.InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // 로그인 처리하는 로직
  const onSubmit = async (data: IFormLoginInputs) => {
    const { email, password } = data;
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_BUCKET_URL}/api/auth/local`,
        { identifier: email, password: password },
      );

      console.log(data);

      if (status === 200) {
        document.cookie = `access_token=${data.jwt}; Max-age-3600; path=/;`;
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 400) {
          alert("Please check your password");
        }
      }
      console.error("로그인에 실패했습니다", error);
    }
  };

  return (
    <main className="flex min-h-screen justify-center">
      <article className="bg-flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 bg-BGImg bg-cover bg-top-custom bg-no-repeat">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <div className="flex justify-center pb-[24px] pt-[52px]">
          <DearmeLogo />
        </div>
        <article className="flex w-full flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            name="loginForm"
            autoComplete="on"
          >
            <section className="flex w-full flex-col items-center gap-4">
              <div className="w-full items-center pb-4">
                <FormControl error={!!errors.email}>
                  <label
                    htmlFor="ID"
                    className="font-small block text-sm leading-4 text-gray-500"
                  >
                    Email
                  </label>
                  <Input
                    {...register("email")}
                    error={!!errors.email}
                    autoComplete="username" // 웹 양식에서 사용자의 로그인 정보를 저장하고 자동으로 입력하도록 브라우저에 지시하는 기능
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
                        transition:
                          "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                        borderRadius: 0,
                      },
                      "&:focus-within::before": {
                        transform: "scaleX(1)",
                      },
                    }}
                  />
                  {errors.email && (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <FormControl error={!!errors.password}>
                <div className="password-container relative mr-20 w-full items-center">
                  <label
                    htmlFor="Password"
                    className="font-small block text-sm leading-4 text-gray-500"
                  >
                    Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    error={!!errors.password}
                    autoComplete="current-password" // 웹 양식에서 사용자의 로그인 정보를 저장하고 자동으로 입력하도록 브라우저에 지시하는 기능
                    value={password}
                    variant="plain"
                    onChange={(e) => setPassword(e.target.value)}
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
                        transition:
                          "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                        borderRadius: 0,
                      },
                      "&:focus-within::before": {
                        transform: "scaleX(1)",
                      },
                    }}
                  />
                  <button
                    type="button" // 이 부분을 추가하여 기본 submit 동작을 방지.
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 pt-4 leading-5"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </section>
            <section className="mt-8 flex w-full flex-col items-center gap-4">
              <div className="mt-4 flex w-full flex-col">
                <Button
                  type="submit"
                  variant="outlined"
                  className="rounded-[20px] border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
                >
                  Log in
                </Button>
              </div>
              <div className="flex w-full flex-col justify-center">
                <Button
                  variant="plain"
                  onClick={handleGoogleLogin}
                  className="rounded-[20px] bg-default-800 py-2 text-default-100 hover:bg-default-700"
                >
                  <div className="mr-2">
                    <GoogleLogo />
                  </div>
                  Log in with Google
                </Button>
              </div>
            </section>
          </form>
          <section className="flex w-full justify-center pt-12">
            <a
              href="/forgotpassword"
              className="text-sm font-medium text-default-900"
            >
              Forgot Password?
            </a>
          </section>
          <article className="mt-2 flex w-full min-w-[220px] max-w-[280px] justify-center px-2 text-sm">
            <h1 className="flex w-full min-w-[220px] max-w-[280px] pl-8 font-medium text-default-100">
              {"Don't have an account?"}
            </h1>
            <a
              href="/signup"
              className="flex w-full justify-center whitespace-nowrap pr-12 font-medium text-default-800 underline"
            >
              Sign up
            </a>
          </article>
        </article>
      </article>
    </main>
  );
}
