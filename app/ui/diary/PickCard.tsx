import DearmeLogo from "@/public/login/DearmeLogo";
import Image from "next/image";

export default function PickCard({ pick, handleDeletePick }: any) {
  return (
    <article className="relative p-1 text-white">
      {pick.image ? (
        <div className="relative h-[200px] w-[180px]">
          <Image
            alt={`pick Image ${pick.id}`}
            src={URL.createObjectURL(pick.image)}
            className="object-contain"
            fill
          />
        </div>
      ) : (
        <div>
          <DearmeLogo />
        </div>
      )}
      <div className="flex flex-col">
        <span>{pick.title}</span>
        <span>{pick.date}</span>
        <span>{pick.contributors}</span>
      </div>

      <button
        onClick={() => handleDeletePick(pick.id)}
        className="absolute right-[-8px] top-[-8px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] hover:bg-red-600"
      >
        <span>&times;</span>
      </button>
    </article>
  );
}
