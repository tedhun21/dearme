import FriendIcon from "@/public/me/FriendIcon";
import LockIcon from "@/public/me/LockIcon";
import PostIcon from "@/public/me/PostIcon";
import RememberIcon from "@/public/me/RememberIcon";
import UserIcon from "@/public/me/UserIcon";
import Link from "next/link";

export default function MeNav() {
  return (
    <section className="mx-5 mb-10 mt-3">
      <div className="flex items-center justify-between gap-1 pb-3">
        <div className="flex items-center">
          <LockIcon className="h-4 w-4" />
          <span className="text-base font-semibold">doe</span>
        </div>
        <Link
          href="/me/edit"
          className="text-xs font-semibold text-default-600 hover:text-default-700"
        >
          프로필 수정
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <UserIcon />
        </div>
        <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
          <RememberIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">3 Remember</span>
        </div>
        <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
          <PostIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">3 Posts</span>
        </div>
        <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
          <FriendIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">4 Friends</span>
        </div>
      </div>
    </section>
  );
}
