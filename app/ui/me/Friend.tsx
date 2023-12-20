"use client";

import UserIcon from "@/public/me/UserIcon";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Friend({ friend, myId }: any) {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(friend.friends) &&
      friend.friends.length !== 0 &&
      friend.friends.findIndex((friend: any) => friend.id === myId) !== -1
    ) {
      setIsFriend(true);
    }
  }, []);

  return (
    <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
      <div className="flex items-center gap-6">
        <Link href={`/profile/${friend.id}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
            <UserIcon />
          </div>
        </Link>
        <div className="text-base font-semibold">{friend.username}</div>
      </div>
      {isFriend ? (
        <div>
          <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
            차단
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
            수락
          </button>
          <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
