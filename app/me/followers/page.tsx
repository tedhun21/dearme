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
    <section className="mb-20">
      <div className="px-4">
        <div>
          <h1 className="mb-3 border-b-2 border-default-400 text-lg font-semibold">
            Follow Request
          </h1>
          <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-default-400">
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-full bg-default-500" />
              <span className="font-semibold">ryan</span>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-default-500 px-3 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
                Confirm
              </button>
              <button className="rounded-lg bg-default-500 px-3 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 border-b-2 border-default-400">
            <h1 className="text-lg font-semibold">Followers</h1>
            <span className="text-lg font-semibold">4</span>
          </div>
          <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-default-400">
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-full bg-default-500" />
              <span className="font-semibold">ryan</span>
            </div>
            <button className="rounded-lg bg-default-500 px-3 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700">
              Block
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
