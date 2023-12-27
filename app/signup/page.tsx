import BackIcon from "@/public/signup/BackIcon";
import DearmeLogo from "@/public/signup/DearmeLogo";
import GoogleLogo from "@/public/login/GoogleLogo";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import Footer from "@/app/ui/footer";

export default function Signup() {
  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <section className="flex w-full justify-center">
          <DearmeLogo />
        </section>
        <article className="flex w-full flex-col items-center gap-4">
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              이름
            </div>
            <Input
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              연락처
            </div>
            <Input
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              주소
            </div>
            <Input
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              상세주소
            </div>
            <Input
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              이메일
            </div>
            <Input
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              비밀번호
            </div>
            <Input
              type="password"
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
          <section className="flex w-full justify-center space-x-12 px-16">
            <div className="flex w-1/3 items-center text-xs font-medium">
              비밀번호 확인
            </div>
            <Input
              type="password"
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
                className="rounded-sm border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
              >
                Sign up
              </Button>
            </div>
            <div className="flex w-full flex-col justify-center">
              <Button
                variant="plain"
                className="rounded-sm bg-default-800 py-2 text-default-100 hover:bg-default-700"
              >
                <div className="mr-2">
                  <GoogleLogo />
                </div>
                Sign up with Google
              </Button>
            </div>
          </section>
          <section className="mb-4 flex w-full min-w-[220px] max-w-[280px] justify-center text-xs">
            <h1 className="flex w-full justify-center text-default-800">
              이미 회원이신가요?
            </h1>
            <a
              href="/login"
              className="flex w-full justify-center text-default-600"
            >
              로그인 하기
            </a>
          </section>
        </article>
      </article>
      <Footer />
    </main>
  );
}
