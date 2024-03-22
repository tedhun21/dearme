import DearmeLogo from "@/public/login/DearmeLogo";
import { deleteTodayPick } from "@/store/api";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export default function PickCard({
  type,
  pick,
  setPicks,
  setSelectedPicks,
}: any) {
  const { mutate: deleteTodayPickMutate } = useMutation({
    mutationKey: ["deleteTodayPick"],
    mutationFn: deleteTodayPick,
    onSuccess: ({ data }) => {
      setPicks((prev: any) => prev.filter((pick: any) => pick.id !== data.id));
    },
  });

  const handleRemovePick = (index: number) => {
    if (type === "url") {
      deleteTodayPickMutate(index);
    } else if (type === "blob") {
      setSelectedPicks((prev: any) =>
        prev.filter((pick: any) => pick.id !== index),
      );
    }
  };
  return (
    <article className="relative text-white">
      {pick.image && type === "url" ? (
        <div className="relative h-[180px] w-[140px]">
          <Image
            alt={`pick Image ${pick.id}`}
            src={`${BUCKET_URL}${pick.image.url}`}
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
      ) : pick.image && type === "blob" ? (
        <div className="relative h-[180px] w-[140px] ">
          <Image
            alt={`pick Image ${pick.id}`}
            src={URL.createObjectURL(pick.image)}
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="flex h-[180px] w-[140px] items-center justify-center">
          <DearmeLogo />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-bold">{pick.title}</span>
        <span className="text-xs">{pick.contributors}</span>
        <span className="text-2xs">{pick.date}</span>
      </div>

      <button
        type="button"
        onClick={() => handleRemovePick(pick.id)}
        className="absolute right-[-8px] top-[-8px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px]"
      >
        <span>&times;</span>
      </button>
    </article>
  );
}
