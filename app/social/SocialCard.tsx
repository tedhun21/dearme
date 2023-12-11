/* eslint-disable @next/next/no-img-element */
export default function SocialCard() {
  return (
    <div className="max-w-[360px] pl-5 pr-5">
      {/* 유저 프로필 & 목표 */}
      <div className="flex">
        <div>
          <img
            src="https://i.pinimg.com/736x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg"
            alt="User Image"
            className="h-10 w-10 rounded-full"
          />
        </div>

        <div className="flex-col pl-3">
          <div className="text-default-700 text-base font-bold">do_e</div>
          <div className="text-xs font-semibold text-default-500">
            #영화감상
          </div>
        </div>

        <div className="ml-auto pt-5">
          <img src="/social/threedots.svg" alt="About this post" />
        </div>
      </div>

      {/* Image && 게시물 사진 */}
      <div className="mt-2">
        <img
          src="https://i.pinimg.com/564x/07/f6/e3/07f6e391953f5c682cd6d7727057a94b.jpg"
          alt="Post Image"
          className="h-auto w-full max-w-[320px]"
        />
      </div>
    </div>
  );
}
