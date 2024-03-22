"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import SocialIcon from "@/public/footer/SocialIcon";
import Search from "@/public/footer/Search";
import Home from "@/public/footer/Home";
import AnalysisIcon from "@/public/footer/AnalysisIcon";
import MypageIcon from "@/public/footer/MypageIcon";

export default function Footer({ me }: any) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="fixed inset-x-0 bottom-0 flex justify-center">
      <div
        className={clsx(
          "flex w-full min-w-[360px] max-w-[600px] bg-default-100 shadow-lg",
          pathname.includes("/todogoal") ? "bg-default-800" : "",
        )}
      >
        <div className="mx-8 flex w-full items-center justify-between gap-2">
          <Link // 소셜 버튼
            href="/social"
            className="group flex flex-col items-center gap-2 text-default-500"
          >
            <SocialIcon
              className={clsx(
                "h-6 w-8 fill-current",
                pathname.includes("/todogoal")
                  ? "text-default-100 group-hover:text-default-400"
                  : pathname === "/social"
                    ? "text-default-900"
                    : "group-hover:text-default-800",
              )}
            />
            <span
              className={clsx(
                "text-xs font-bold",
                pathname.includes("/todogoal")
                  ? "text-default-100 group-hover:text-default-400"
                  : pathname === "/social"
                    ? "text-default-900"
                    : "group-hover:text-default-800",
              )}
            >
              SOCIAL
            </span>
          </Link>
          <Link // 검색 버튼
            href="/search"
            className="group flex flex-col items-center gap-2 text-default-500"
          >
            <Search
              className={clsx(
                "h-6 w-8 fill-current",
                pathname.includes("/todogoal")
                  ? "text-default-100 group-hover:text-default-400"
                  : pathname === "/search"
                    ? "text-default-900"
                    : "group-hover:text-default-800",
              )}
            />
            <span
              className={clsx(
                "text-xs font-bold",
                pathname.includes("/todogoal")
                  ? "text-default-100 group-hover:text-default-400"
                  : pathname === "/search"
                    ? "text-default-900"
                    : "group-hover:text-default-800",
              )}
            >
              SEARCH
            </span>
          </Link>
          <div
            className={clsx(
              "relative top-[-20px] mx-[-8px] rounded-full p-1.5",
              pathname.slice(11) === "/todogoal"
                ? "bg-black"
                : "bg-default-200",
            )}
          >
            <Link // 홈 버튼
              href="/"
              className="group flex flex-col items-center text-gray-600 hover:text-gray-900"
            >
              <div
                className={clsx(
                  "rounded-full p-6 shadow-lg",
                  pathname.slice(11) === "/todogoal"
                    ? "bg-default-800 group-hover:bg-default-900"
                    : "bg-default-300 group-hover:bg-default-400",
                )}
              >
                <Home
                  color={pathname.includes("/todogoal") ? "dark" : "white"}
                />
              </div>
            </Link>
          </div>
          <Link // 분석 버튼
            href="/analysis"
            className="group flex flex-col items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnalysisIcon
              className="h-7 w-9 fill-current"
              color={pathname.includes("/todogoal") ? "dark" : "white"}
              isHovered={isHovered}
            />
            <span
              className={clsx(
                "text-xs font-bold",
                pathname.includes("/todogoal")
                  ? "text-default-100 group-hover:text-default-400"
                  : pathname === "/analysis"
                    ? "text-default-900"
                    : "text-default-500 group-hover:text-default-800",
              )}
            >
              ANALYSIS
            </span>
          </Link>
          {me ? (
            <Link // 마이페이지 버튼
              href="/me"
              className="group flex flex-col items-center gap-2 text-default-500 group-hover:text-default-800"
            >
              <MypageIcon
                className={clsx(
                  "h-7 w-9 fill-current",
                  pathname.includes("/todogoal")
                    ? "text-default-100 group-hover:text-default-400"
                    : pathname.includes("/me")
                      ? "text-default-900"
                      : "group-hover:text-default-800",
                )}
              />
              <span
                className={clsx(
                  "text-xs font-bold",
                  pathname.includes("/todogoal")
                    ? "text-default-100 group-hover:text-default-400"
                    : pathname.includes("/me")
                      ? "text-default-900"
                      : "group-hover:text-default-800",
                )}
              >
                MYPAGE
              </span>
            </Link>
          ) : (
            <Link // 로그인 페이지 버튼
              href="/login"
              className="group flex flex-col items-center gap-2 text-default-500 group-hover:text-default-800"
            >
              <MypageIcon
                className={clsx(
                  "h-7 w-9 fill-current",
                  pathname.includes("/todogoal")
                    ? "text-default-100 group-hover:text-default-400"
                    : pathname.includes("/me")
                      ? "text-default-900"
                      : "group-hover:text-default-800",
                )}
              />
              <span
                className={clsx(
                  "text-xs font-bold",
                  pathname.includes("/todogoal")
                    ? "text-default-100 group-hover:text-default-400"
                    : pathname.includes("/me")
                      ? "text-default-900"
                      : "group-hover:text-default-800",
                )}
              >
                LOGIN
              </span>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
