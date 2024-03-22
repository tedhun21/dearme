"use client";

import Image from "next/image";

import MeProfileHeader from "./MeProfileHeader";
import { usePathname } from "next/navigation";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MeProfile({ me, route }: any) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/me/friends" && pathname !== "/me/edit" ? (
        <section className="h-80 w-full">
          <div className="relative flex h-full w-full p-5">
            <MeProfileHeader me={me} />
            {me?.background ? (
              <Image
                src={`${BUCKET_URL}${me.background?.url}`}
                alt="background image"
                fill
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            ) : (
              <Image
                src={"/me/DefaultBackground.png"}
                alt="default background image"
                fill
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            )}
          </div>
        </section>
      ) : pathname === "/me/edit" ? (
        <section className="h-80 w-full">
          <div className="relative flex h-full w-full p-5">
            <MeProfileHeader me={me} route="edit" />

            {me?.background ? (
              <Image
                src={`${BUCKET_URL}${me.background?.url}`}
                alt="background image"
                fill
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            ) : (
              <Image
                src={"/me/DefaultBackground.png"}
                alt="default background image"
                fill
                quality={80}
                priority
                className="z-0 object-cover object-center"
              />
            )}
          </div>
        </section>
      ) : null}
    </>
  );
}
