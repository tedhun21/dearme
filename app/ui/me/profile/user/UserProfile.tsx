"use client";

import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { findFriendship } from "@/store/api";
import FollowButton from "./FollowButton";

import CancelFollowButton from "./CancelFollowButton";
import BlockFriendButton from "./BlockFriendButton";
import UnblockButton from "./UnblockButton";
import AcceptButton from "./AcceptFollowButton";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function UserProfile({ user, me }: any) {
  // 유저와 나와의 관계
  const { data: friendshipData } = useQuery({
    queryKey: ["getFriendship"],
    queryFn: () => findFriendship(user.id),
  });

  return (
    <section className="h-80 w-full">
      <div className="relative flex h-full p-5">
        <div className="z-10 flex w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/header/logo.png"
                alt="logo"
                width={80}
                height={20}
                quality={80}
                priority
              />
            </Link>
          </div>

          <div className="px-4">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-default-300">
              {(user as any)?.photo ? (
                <Image
                  src={`${BUCKET_URL}${(user as any).photo.url}`}
                  alt="userPhoto"
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-bg-800 text-xl font-semibold">
                  {(user as any)?.nickname}
                </span>
                <span className="text-white">{(user as any)?.body}</span>
              </div>
              {friendshipData?.status === "NOTHING" ? (
                <FollowButton userId={user?.id} />
              ) : friendshipData?.status === "PENDING" &&
                friendshipData?.follow_receiver?.id === me.id ? (
                <AcceptButton userId={user?.id} />
              ) : friendshipData?.status === "PENDING" &&
                friendshipData?.follow_receiver?.id === user.id ? (
                <CancelFollowButton userId={user?.id} />
              ) : friendshipData?.status === "FRIEND" ? (
                <BlockFriendButton userId={user?.id} />
              ) : friendshipData?.status === "BLOCK_ONE" ||
                friendshipData?.status === "BLOCK_BOTH" ? (
                <UnblockButton userId={user?.id} />
              ) : null}
            </div>
          </div>
        </div>

        <Image
          src="/me/DefaultBackground.png"
          alt="profile default image"
          fill
          quality={80}
          priority
          className="z-0 object-cover object-center"
        />
      </div>
    </section>
  );
}
