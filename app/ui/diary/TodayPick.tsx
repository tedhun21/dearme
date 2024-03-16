import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export default function TodayPick({ pick }: any) {
  return (
    <div>
      <div className="relative flex h-[320px] w-[220px] flex-shrink-0 flex-col justify-center">
        <Image
          src={`${BUCKET_URL}${pick.image.url}`}
          alt="Today's Pick"
          className="object-cover"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="flex flex-col text-white">
        <div className="text-base font-semibold">{pick.title}</div>
        <div className="text-sm">{pick.contributors}</div>
        <div className="text-sm">{pick.date}</div>
      </div>
    </div>
  );
}
