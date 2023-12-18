import FriendIcon from "@/public/me/FriendIcon";
import LockIcon from "@/public/me/LockIcon";
import PostIcon from "@/public/me/PostIcon";
import RememberIcon from "@/public/me/RememberIcon";
import UserIcon from "@/public/me/UserIcon";
import Link from "next/link";

const me = {
  id: 1,
  username: "doe",
  posts: [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ],
  friends: [{ id: 2, username: "ryan" }],
};

export default function MeNav() {
  return (
    <section className="mx-5 mb-10 mt-3">
      <div className="flex items-center justify-between gap-1 pb-3">
        <div className="flex items-center gap-1">
          <LockIcon className="h-4 w-4" />
          <span className="text-base font-semibold">{me.username}</span>
        </div>
        <Link
          href="/me/edit"
          className="text-xs font-semibold text-default-600 hover:text-default-700"
        >
          프로필 수정
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300">
          <UserIcon />
        </div>
        <Link
          href="/diary/remember"
          className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700"
        >
          <RememberIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">3 Remembers</span>
        </Link>
        <Link
          href="/me/posts"
          className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700"
        >
          <PostIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">
            {me.posts.length > 1
              ? `${me.posts.length} Posts`
              : `${me.posts.length} Post`}
          </span>
        </Link>
        <Link
          href="/me/friends"
          className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700"
        >
          <FriendIcon className="h-5 w-5 fill-current" />
          <span className="text-xs font-semibold">
            {me.friends.length > 1
              ? `${me.friends.length} Friends`
              : `${me.friends.length} Friend`}
          </span>
        </Link>
      </div>
    </section>
  );
}
