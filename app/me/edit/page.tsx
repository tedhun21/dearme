import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import UserProfile from "@/app/ui/me/UserProfile";
import UserIcon from "@/public/me/UserIcon";
import { Switch } from "@mui/material";

export default function MeEdit() {
  return (
    <div>
      {/* <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-default-600">비공개</span>
          <Switch
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
        </div> */}

      <UserProfile route={"edit"} />
      {/* <article className="flex flex-col items-center justify-center p-5">
        <section className="flex w-full flex-col items-center justify-center gap-5 p-5">
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              이름
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 focus:outline-none"
              defaultValue="김코딩"
              readOnly
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              닉네임
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="코딩맨"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              연락처
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="010839405552"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              주소
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="서울시 중구"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label className="mr-5 w-12 flex-none text-xs font-semibold">
              상세주소
            </label>
            <input
              className="flex-auto border-b-2 border-default-400 bg-transparent text-center text-xs text-default-700 hover:border-default-600 focus:border-default-800 focus:outline-none"
              value="새록새록아파트 202동 1105호"
            />
          </div>
        </section>
        <section className="flex w-full flex-col items-center p-5">
          <div className="flex w-2/3 flex-col">
            <button className="w-full rounded-lg border-2 border-default-500 bg-default-100 p-2 text-xs font-semibold hover:border-default-700 hover:bg-default-500 hover:text-default-300 active:border-default-800">
              수정하기
            </button>
            <div className="flex justify-between pt-4">
              <button className="text-xs font-semibold text-default-500 hover:text-default-700">
                로그아웃
              </button>
              <button className="text-xs font-semibold text-default-500 hover:text-default-700">
                회원탈퇴
              </button>
            </div>
          </div>
        </section>
      </article> */}
    </div>
  );
}
