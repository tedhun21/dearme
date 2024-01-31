"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/store/api";
import { getCookie } from "@/util/tokenCookie";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
const access_token = getCookie("access_token");

export default function UserProfile() {
  const { id: profileId } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser({ profileId }),
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
            <div className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-default-300">
              {(userData as any)?.photo ? (
                <Image
                  src={`${BUCKET_URL}${(userData as any).photo.url}`}
                  alt="userPhoto"
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-bg-800 text-xl font-semibold">
                  {(userData as any)?.nickname}
                </span>
                <span className="text-white">{(userData as any)?.body}</span>
              </div>
              <button className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
                Follow
              </button>
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
