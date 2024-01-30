import FollowerIcon from "@/public/me/Follower";
import PlanIcon from "@/public/me/PlanIcon";
import PostIcon from "@/public/me/PostIcon";
import RememberIcon from "@/public/me/RememberIcon";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MeNavList({ nav }: any) {
  const pathname = usePathname();

  return (
    <Link
      href={nav.href}
      className={clsx(
        "group flex flex-1 flex-col items-center justify-center gap-1 py-5",
        pathname === nav.href
          ? "border-b-4 border-b-default-900"
          : "group-hover:border-b-default-500",
      )}
    >
      {/* <span
      className={clsx(
        "text-2xl font-extrabold",
        pathname === "/me"
          ? "text-default-900"
          : "text-default-500 group-hover:text-default-700",
      )}
    >
      4
    </span> */}
      <div className="flex items-center gap-1">
        {nav.href === "/me" ? (
          <PlanIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === nav.href
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
        ) : nav.href === "/me/posts" ? (
          <PostIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === nav.href
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
        ) : nav.href === "/me/followers" ? (
          <FollowerIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === nav.href
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
        ) : nav.href === "/diary/remembers" ? (
          <RememberIcon
            className={clsx(
              "h-4 w-4 fill-current",
              pathname === nav.href
                ? "text-black"
                : "text-default-500 group-hover:text-default-700",
            )}
          />
        ) : null}
        <span
          className={clsx(
            "text-base font-semibold",
            pathname === nav.href
              ? "text-black"
              : "text-default-500 group-hover:text-default-700",
          )}
        >
          {nav.name}
        </span>
      </div>
    </Link>
  );
}
