import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function MePostCard({ post }: any) {
  return (
    <div className="justify-cente relative flex h-[100px] items-center xs:h-[150px]">
      {post.photo?.url ? (
        <Image
          fill
          src={`${BUCKET_URL}${post.photo.url}`}
          className="object-cover"
          alt="user"
          // sizes="(max-width:400px) 33vw (max-width:500px) 25vw (max-width:600px) 20vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-default-800 text-white">
          No Image
        </div>
      )}
    </div>
  );
}
