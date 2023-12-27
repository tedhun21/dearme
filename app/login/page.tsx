import BackIcon from "@/public/login/BackIcon";
import DearmeLogo from "@/public/login/DearmeLogo";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import GoogleLogo from "@/public/login/GoogleLogo";

import Footer from "@/app/ui/footer";

export default function Login() {
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);

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
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <header className="pl-8 pt-8">
          <a href="/">
            <BackIcon />
          </a>
        </header>
        <div className="flex justify-center pt-[66px]">
          <DearmeLogo />
        </div>
        <article className="flex w-full flex-col items-center">
          <section className="flex w-full flex-col items-center gap-4">
            <div className="w-full min-w-[220px] max-w-[280px] flex-col items-center">
              <label
                htmlFor="ID"
                className="font-small block text-sm leading-8 text-gray-500"
              >
                ID
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
            <div className="w-full min-w-[220px] max-w-[280px] flex-col items-center">
              <label
                htmlFor="Password"
                className="font-small block text-sm leading-8 text-gray-500"
              >
                PW
              </label>
              <Input
                type="password"
                // value={password}
                variant="plain"
                // onChange={(e) => setPassword(e.target.value)}
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
                로그인 상태 유지
              </label>
            </div>
            <div className="mt-4 flex w-full min-w-[220px] max-w-[280px] flex-col">
              <Button
                variant="outlined"
                className="rounded-sm border-2 border-solid border-default-800 py-2 text-default-800 hover:bg-default-300"
              >
                Log in
              </Button>
            </div>
            <div className="flex w-full min-w-[220px] max-w-[280px] flex-col justify-center">
              <Button
                variant="plain"
                className="rounded-sm bg-default-800 py-2 text-default-100 hover:bg-default-700"
              >
                <div className="mr-2">
                  <GoogleLogo />
                </div>
                Log in with Google
              </Button>
            </div>
          </section>
          <article className="mt-2 flex w-full min-w-[220px] max-w-[280px] justify-center text-sm">
            <h1 className="flex w-full justify-center text-default-800">
              회원이 아니신가요?
            </h1>
            <a
              href="/signup"
              className="flex w-full justify-center text-default-600"
            >
              회원가입 하기
            </a>
          </article>
        </article>
      </article>
      <Footer />
    </main>
  );
}
