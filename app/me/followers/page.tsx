"use client";

import Link from "next/link";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import FollowList from "@/app/ui/me/FollowList";
import { getCookie } from "@/util/tokenCookie";
import { getMyFriendWithPage, getMyRequestWithPage } from "@/store/api";

const access_token = getCookie("access_token");

export default function MeFriend() {
  const {
    hasNextPage: hasNextRequestPage,
    fetchNextPage: fetchNextRequestPage,
    data: requestData,
  } = useInfiniteQuery({
    queryKey: ["getMyRequestWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyRequestWithPage({ pageParam, access_token }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.length / 4;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  const {
    hasNextPage: hasNextFriendPage,
    fetchNextPage: fetchNextFriendPage,
    data: friendData,
  } = useInfiniteQuery({
    queryKey: ["getMyFriendWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyFriendWithPage({ pageParam, size: 12, access_token }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.users.length / 12;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  return (
    <section className="mb-20 mt-4">
      <div className="flex flex-col gap-3 px-4">
        <div>
          <h1 className="mb-3 border-b-2 border-default-400 text-lg font-semibold">
            Follow Request
          </h1>
          {Array.isArray(requestData) && requestData.length !== 0 ? (
            requestData?.pages.map((page: any) =>
              page.map((requestUser: any) => (
                <FollowList
                  key={requestUser.id}
                  user={requestUser}
                  isRequest={true}
                />
              )),
            )
          ) : (
            <div className="w-full py-5 text-center">
              <span>No Request</span>
            </div>
          )}

          {hasNextRequestPage && requestData?.pages[0].length !== 0 ? (
            <button onClick={() => fetchNextRequestPage()}>View More</button>
          ) : null}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-2 border-b-2 border-default-400">
            <div className="flex gap-1">
              <h1 className="text-lg font-semibold">Followers</h1>
              <span className="text-lg font-semibold text-default-900">
                {friendData?.pages[0].pagination.total}
              </span>
            </div>
            <Link
              href="/me/friends"
              className="font-semibold text-default-500 hover:text-default-800 active:text-default-900"
            >
              View More
            </Link>
          </div>
          {friendData?.pages.map((page) =>
            page.users.map((friendUser: any) => (
              <FollowList
                key={friendUser.id}
                user={friendUser}
                isRequst={false}
              />
            )),
          )}
          {hasNextFriendPage && friendData?.pages[0].users.length !== 0 ? (
            <button onClick={() => fetchNextFriendPage()}>View More</button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
