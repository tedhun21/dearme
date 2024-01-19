"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import FollowerIcon from "@/public/me/Follower";
import PlanIcon from "@/public/me/PlanIcon";
import PostIcon from "@/public/me/PostIcon";
import RememberIcon from "@/public/me/RememberIcon";

export default function MeNav() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <section className="mb-3 flex justify-between bg-default-300">
      <Link
        href="/me"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-1 py-3",
          pathname === "/me"
            ? "border-b-4 border-b-default-800"
            : "group-hover:border-b-default-500",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me"
              ? "text-default-900"
              : "text-default-500 group-hover:text-default-700",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <PlanIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === "/me"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
          <span
            className={clsx(
              "text-sm font-semibold",
              pathname === "/me"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          >
            Plans
          </span>
        </div>
      </Link>
      <Link
        href="/me/posts"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-1 py-3",
          pathname === "/me/posts" ? "border-b-4 border-b-default-800" : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me/posts"
              ? "text-default-900"
              : "text-default-500 group-hover:text-default-700",
          )}
        >
          4
        </span>
        <div className="flex items-center gap-1">
          <PostIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === "/me/posts"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
          <span
            className={clsx(
              "text-sm font-semibold",
              pathname === "/me/posts"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          >
            Posts
          </span>
        </div>
      </Link>
      <Link
        href="/me/followers"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-1 py-3",
          pathname === "/me/followers" ? "border-b-4 border-b-default-800" : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me/followers"
              ? "text-default-900"
              : "text-default-500 group-hover:text-default-700",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <FollowerIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === "/me/followers"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
          <span
            className={clsx(
              "text-sm font-semibold",
              pathname === "/me/followers"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          >
            Followers
          </span>
        </div>
      </Link>
      <Link
        href="/diary/remember"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-1 ",
          pathname === "/diary/remember"
            ? "border-b-4 border-b-default-800"
            : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/diary/remember"
              ? "text-default-900"
              : "text-default-500 group-hover:text-default-700",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <RememberIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === "/diary/remember"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
          <span
            className={clsx(
              "text-sm font-semibold",
              pathname === "/diary/remember"
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          >
            Remember
          </span>
        </div>
      </Link>
    </section>
  );
}
