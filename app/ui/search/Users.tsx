/* eslint-disable @next/next/no-img-element */

interface UsersProps {
  imageUrl: string;
  nickname: string;
}

export default function Users({ imageUrl, nickname }: UsersProps) {
  return (
    <div className="mb-2 flex h-16 items-center rounded-lg bg-default-100 px-3 py-2">
      <img
        src={imageUrl}
        alt="User Image"
        className="h-12  w-12 rounded-full"
      />
      <span className="ml-3 text-sm font-semibold text-default-700">
        {nickname}
      </span>
    </div>
  );
}
