import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function FollowList({ user, isRequest }: any) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-default-300">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          {user?.photo ? (
            <Image
              src={`${BUCKET_URL}${user.photo.url}`}
              fill
              className="object-cover object-center"
              alt="user photo"
            />
          ) : (
            <div className="h-full w-full bg-default-500" />
          )}
        </div>
        <span className="font-semibold">{user?.nickname}</span>
      </div>
      {isRequest ? (
        <div className="flex gap-2">
          <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
            Confirm
          </button>
          <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
            Delete
          </button>
        </div>
      ) : (
        <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
          Block
        </button>
      )}
    </div>
  );
}
