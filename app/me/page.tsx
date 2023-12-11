import Image from "next/image";
import Header from "../ui/header";
import BackArrowIcon from "@/public/me/back-arrow";
import RememberIcon from "@/public/me/remember";

export default function Me() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex min-w-[360px] max-w-[600px] flex-col bg-default-200">
        <Header />
        <div className="px-6">
          {/* <Image src="/me/back-arrow.svg" width={8} height={12} alt="back" /> */}
          <BackArrowIcon className="hover:text-default-800 h-3 w-3 fill-current text-default-500" />
        </div>
        <section className="px-5 py-3">
          <div className="flex gap-1 pb-3">
            <Image src="/me/lock.svg" width={14} height={16} alt="lock" />
            <span className="text-base font-semibold">doe</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 justify-center rounded-full bg-gray-300">
              <Image src="/me/user.svg" width={18} height={20} alt="user" />
            </div>
            <div className="hover:text-default-700 flex flex-col items-center gap-1">
              <RememberIcon className="hover:text-default-700 h-5 w-5 fill-current text-default-500" />
              <span className="text-xs font-semibold">3 Remember</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Image src="/me/posts.svg" width={20} height={20} alt="posts" />
              <span className="text-xs font-semibold">3 Posts</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/me/friends.svg"
                width={20}
                height={18}
                alt="friends"
              />
              <span className="text-xs font-semibold">4 Friends</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
