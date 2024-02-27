import { getMe } from "@/store/api";
import { ISetting, meState, settingState } from "@/store/atoms";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function TodogoalHeader() {
  const [me, setMe] = useRecoilState(meState);

  const [{ todogoalTitle }, setSetting] =
    useRecoilState<ISetting>(settingState);

  const { isSuccess, data } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
  });

  useEffect(() => {
    if (isSuccess) {
      setMe(data);
    }
  }, [isSuccess]);

  return (
    <section className="flex w-full items-center justify-between">
      {me && <span className="text-xl font-semibold">Hi! {me?.nickname}</span>}
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
        {me && (
          <Image
            src={`/${BUCKET_URL}${me?.photo?.url}`}
            alt="user profile"
            fill
            className="object-cover object-center"
          />
        )}
      </div>
    </section>
  );
}
