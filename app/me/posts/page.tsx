"use client";

import Image from "next/image";

export default function MePost() {
  return (
    <section>
      <h1 className="mx-5 mb-3 text-base font-semibold">포스트</h1>
      <section>
        <div className="grid grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5">
          <div className="relative flex items-center justify-center">
            <Image
              fill
              src="/me/chu.png"
              style={{ objectFit: "cover" }}
              alt="user"
              // sizes="(max-width:400px) 33vw (max-width:500px) 25vw (max-width:600px) 20vw"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/me/petmily.png"
              width={200}
              height={200}
              alt="petmily"
            />
          </div>
          <div className="bg-default-800 text-center">03</div>
          <div className="bg-default-800 text-center">04</div>
          <div className="bg-default-800 text-center">05</div>
          <div className="bg-default-800 text-center">06</div>
          <div className="bg-default-800 text-center">07</div>
          <div className="bg-default-800 text-center">08</div>
        </div>
      </section>
    </section>
  );
}
