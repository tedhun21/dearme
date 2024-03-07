import { ISetting, settingState } from "@/store/atoms";
import { Button } from "@mui/material";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useRecoilState } from "recoil";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function TodogoalHeader({ me }: any) {
  const [{ todogoalTitle }, setSetting] =
    useRecoilState<ISetting>(settingState);

  return (
    <section className="flex w-full items-center justify-between">
      {me && me?.nickname ? (
        <span className="text-xl font-semibold">Hi! {me?.nickname}</span>
      ) : (
        <Link href="/me/edit">Set Nickname</Link>
      )}
      <div className="flex">
        <div className="relative rounded-3xl bg-default-800">
          <div
            className={clsx(
              "absolute h-[40px] w-[100px] transform rounded-3xl bg-default-400 transition-all",
              todogoalTitle === "Todo"
                ? "translate-x-0"
                : "translate-x-[100px]",
            )}
          />
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              color: todogoalTitle === "Todo" ? "#143422" : "#ffffff",
              transition: "all 0.2s 0.1s ease",
            }}
            onClick={() =>
              setSetting((prev) => ({ ...prev, todogoalTitle: "Todo" }))
            }
          >
            Todo
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              color: todogoalTitle === "Todo" ? "#ffffff" : "#143422",
              transition: "all 0.2s 0.1s ease",
            }}
            onClick={() =>
              setSetting((prev) => ({ ...prev, todogoalTitle: "Goal" }))
            }
          >
            Goal
          </Button>
        </div>
      </div>
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        {me && me.photo?.url ? (
          <Image
            src={`${BUCKET_URL}${me?.photo?.url}`}
            alt="user profile"
            fill
            className="object-cover object-center"
          />
        ) : (
          <Link href="/me/edit">
            <div className="h-full w-full bg-default-400"></div>
          </Link>
        )}
      </div>
    </section>
  );
}
