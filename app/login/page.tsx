"use client";

import { useState } from "react";

import BackIcon from "@/public/login/BackIcon";
import DearmeLogo from "@/public/login/DearmeLogo";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import InputAdornment from "@mui/material/InputAdornment";

import GoogleLogo from "@/public/login/GoogleLogo";
import EyeOffIcon from "@/public/login/EyeOffIcon";
import EyeIcon from "@/public/login/EyeIcon";

// import Footer from "@/app/ui/footer";

export default function Login() {
  // const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleLogin = () => {
  //   if (remember) {
  //     localStorage.setItem("id", id);
  //     localStorage.setItem("password", password);
  //     localStorage.setItem("remember", remember);
  //   } else {
  //     localStorage.removeItem("id");
  //     localStorage.removeItem("password");
  //     localStorage.removeItem("remember");
  //   }
  //   // 로그인 처리 로직
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("remember") === "true") {
  //     setId(localStorage.getItem("id"));
  //     setPassword(localStorage.getItem("password"));
  //     setRemember(true);
  //   }
  // }, []);

  return (
    <main className="flex min-h-screen justify-center">
      <article className="bg-BGImg bg-top-custom bg-flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 bg-cover bg-no-repeat">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <div className="flex justify-center pb-[24px] pt-[52px]">
          <DearmeLogo />
        </div>
        <article className="flex w-full flex-col items-center">
          <section className="flex w-full flex-col items-center gap-4">
            <div className="w-full min-w-[220px] max-w-[280px] flex-col items-center pb-4">
              <label
                htmlFor="ID"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Email
              </label>
              <Input
                variant="plain"
                // value={id}
                // onChange={(e) => setId(e.target.value)}
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
            </div>
            <div className="password-container relative w-full min-w-[220px] max-w-[280px] flex-col items-center">
              <label
                htmlFor="Password"
                className="font-small block text-sm leading-4 text-gray-500"
              >
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
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
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                  // '&:focus-within .password-icon': {
                  //   visibility: 'visible',
                  //   },
                  //   '&.password-icon': {
                  //     visibility:'hidden'
                  //   },
                }}
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 pt-4 leading-5"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </section>
          <section className="mt-4 flex w-full flex-col items-center gap-4">
            <div className="flex w-full min-w-[220px] max-w-[280px]">
              <input
                className="mr-2"
                type="checkbox"
                // checked={remember}
                // onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className="text-defalut-800 text-sm">
                Remember me
              </label>
            </div>
            <div className="mt-4 flex w-full min-w-[220px] max-w-[280px] flex-col">
              <Button
                variant="outlined"
                className="rounded-[20px] border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
              >
                Log in
              </Button>
            </div>
            <div className="flex w-full min-w-[220px] max-w-[280px] flex-col justify-center">
              <Button
                variant="plain"
                className="rounded-[20px] bg-default-800 py-2 text-default-100 hover:bg-default-700"
              >
                <div className="mr-2">
                  <GoogleLogo />
                </div>
                Log in with Google
              </Button>
            </div>
          </section>
          <section className="flex w-full justify-center pt-12">
            <a href="/forgot" className="text-sm font-medium text-default-900">
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
      {/* <Footer /> */}
    </main>
  );
}
