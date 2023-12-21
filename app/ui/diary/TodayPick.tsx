/* eslint-disable @next/next/no-img-element */

export default function TodayPick() {
  return (
    <div>
      <article className="mb-3 rounded bg-default-800">
        <section className="p-5">
          <h1 className="mb-3 text-lg font-semibold text-white">오늘의 PICK</h1>

          <div className="flex overflow-x-scroll whitespace-nowrap  scrollbar-hide">
            {/* 사랑한다고 말해줘 */}
            <div className="mr-10 flex flex-shrink-0 flex-col justify-center">
              <img
                src="https://i.namu.wiki/i/UvSjCQ9Ip4eNYF45gYO1OmGHQYkngAnE2ztZIgMHJBHc1PffPPGQ0OfucZYYC-liHCuVi0__4E2AK6usStPsuw.webp"
                alt="Today's Pick"
                className="mb-3 h-[320px] w-[220px] object-cover"
              />
              <div className="flex flex-col">
                <div className=" text-base font-semibold text-white">
                  사랑한다고 말해줘
                </div>
                <div className=" text-sm font-normal text-white">
                  정우성 | 신현빈
                </div>
                <div className=" text-sm font-normal text-white">
                  (2023 - 2024)
                </div>
              </div>
            </div>

            <div className="mr-10 flex flex-shrink-0 flex-col justify-center">
              <img
                src="https://image.yes24.com/goods/96087459/XL"
                alt="Today's Pick"
                className="mb-3 h-[320px] w-[220px] object-cover"
              />
              <div className="flex flex-col">
                <div className=" text-base font-semibold text-white">
                  부자의 그릇
                </div>
                <div className=" text-sm font-normal text-white">
                  이즈미 마사토
                </div>
                <div className=" text-sm font-normal text-white">
                  (다산북스)
                </div>
              </div>
            </div>

            <div className="mr-10 flex flex-shrink-0 flex-col justify-center">
              <img
                src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/before-sunrise-poster-george-wilson.jpg"
                alt="Today's Pick"
                className="mb-3 h-[320px] w-[220px] object-cover"
              />
              <div className="flex flex-col">
                <div className=" text-base font-semibold text-white">
                  Before sunrise
                </div>
                <div className=" text-sm font-normal text-white">
                  Ethan Hawke | Julie Delpy
                </div>
                <div className=" text-sm font-normal text-white">
                  Richard Linklater
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
