import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import Friend from "@/app/ui/me/Friend";
import PlusFriendIcon from "@/public/me/PlusFriendIcon";
import SearchIcon from "@/public/me/SearchIcon";
import UserIcon from "@/public/me/UserIcon";
import Link from "next/link";

const me = {
  id: 1,
  username: "doe",
  posts: [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ],
  friends: [{ id: 2, username: "ryan", friends: [{ id: 1, username: "doe" }] }],
  friends_request_from: [{ id: 3, username: "donut" }],
};

export default function MeFriend() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-default-500">
            <UserIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{me.username}</span>
            <div className="flex gap-5">
              <div className="text-xs font-semibold text-default-500">
                {me.posts.length > 1
                  ? `${me.posts.length} Posts`
                  : `${me.posts.length} Post`}
              </div>
              <div className="text-xs font-semibold text-default-500">
                {me.friends.length > 1
                  ? `${me.friends.length} Friends`
                  : `${me.friends.length} Friend`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5 px-6 py-3">
          <input className="w-full rounded-lg border-2 border-default-400 px-3 text-base font-normal hover:border-default-500 focus:border-default-500 focus:outline-none" />
          <button>
            <SearchIcon className="h-5 w-5 fill-current text-default-400 hover:text-default-500 active:text-default-700" />
          </button>
        </div>
        <article className="flex flex-col gap-3 px-5 py-3">
          <section>
            <h1 className="text-base font-semibold">
              친구 요청 {me.friends_request_from.length}
            </h1>
            <div className="flex flex-col gap-1 py-2">
              {me.friends_request_from.map((friend) => (
                <Friend key={friend.id} friend={friend} myId={me.id} />
              ))}
            </div>
          </section>
          <section>
            <div className="flex justify-between">
              <h1 className="text-base font-semibold">
                친구 {me.friends.length}
              </h1>
              <button>
                <PlusFriendIcon className="h-5 w-5 fill-current text-default-700 hover:text-default-800" />
              </button>
            </div>
            <div className="flex flex-col gap-1 py-2 ">
              {me.friends.map((friend) => (
                <Friend key={friend.id} friend={friend} myId={me.id} />
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
