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
    <section className="flex justify-between">
      <Link
        href="/me"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-2  py-4",
          pathname === "/me" ? "border-b-4 border-b-default-800" : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me"
              ? "text-default-900"
              : "text-default-400 group-hover:text-default-600",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <PlanIcon
            className={clsx(
              "h-5 w-5 fill-current",
              pathname === "/me"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          />
          <span
            className={clsx(
              "text-sm font-extrabold",
              pathname === "/me"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          >
            Plans
          </span>
        </div>
      </Link>
      <Link
        href="/me/posts"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-2  py-4",
          pathname === "/me/posts" ? "border-b-4 border-b-default-800" : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me/posts"
              ? "text-default-900"
              : "text-default-400 group-hover:text-default-600",
          )}
        >
          4
        </span>
        <div className="flex items-center gap-1">
          <PostIcon
            className={clsx(
              "h-5 w-5 fill-current",
              pathname === "/me/posts"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          />
          <span
            className={clsx(
              "text-sm font-extrabold",
              pathname === "/me/posts"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          >
            Posts
          </span>
        </div>
      </Link>
      <Link
        href="/me/followers"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-2  py-4",
          pathname === "/me/friends" ? "border-b-4 border-b-default-800" : "",
        )}
      >
        <span
          className={clsx(
            "text-2xl font-extrabold",
            pathname === "/me/friends"
              ? "text-default-900"
              : "text-default-400 group-hover:text-default-600",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <FollowerIcon
            className={clsx(
              "h-5 w-5 fill-current",
              pathname === "/me/friends"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          />
          <span
            className={clsx(
              "text-sm font-extrabold",
              pathname === "/me/followers"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          >
            Followers
          </span>
        </div>
      </Link>
      <Link
        href="/diary/remember"
        className={clsx(
          "group flex flex-1 flex-col items-center justify-center gap-2  py-4",
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
              : "text-default-400 group-hover:text-default-600",
          )}
        >
          3
        </span>
        <div className="flex items-center gap-1">
          <RememberIcon
            className={clsx(
              "h-5 w-5 fill-current",
              pathname === "/diary/remember"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          />
          <span
            className={clsx(
              "text-sm font-extrabold",
              pathname === "/me/followers"
                ? "text-black"
                : "text-default-400 group-hover:text-default-600",
            )}
          >
            Remember
          </span>
        </div>
      </Link>
    </section>
  );
}
