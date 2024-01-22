import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import FollowList from "@/app/ui/me/FollowList";
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
    <section className="mb-20 mt-4">
      <div className="flex flex-col gap-3 px-4">
        <div>
          <h1 className="mb-3 border-b-2 border-default-400 text-lg font-semibold">
            Follow Request
          </h1>

          <FollowList request={true} />
          <FollowList request={true} />
          <FollowList request={true} />
          <FollowList request={true} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between gap-2 border-b-2 border-default-400">
            <div className="flex gap-1">
              <h1 className="text-lg font-semibold">Followers</h1>
              <span className="text-lg font-semibold">4</span>
            </div>
            <Link
              href="/me/friends"
              className="font-semibold text-default-700 hover:text-default-800 active:text-default-900"
            >
              View More
            </Link>
          </div>
          <FollowList />
        </div>
      </div>
    </section>
  );
}
