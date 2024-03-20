"use client";

import Link from "next/link";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getMyFriendsWithPage, getMyRequestsWithPage } from "@/store/api";
import FollowList from "@/app/ui/me/followers/FollowList";

export default function MeFriend() {
  const queryClient = useQueryClient();

  // const me = queryClient.getQueryData(["getMe"]);

  const {
    hasNextPage: hasNextRequestPage,
    fetchNextPage: fetchNextRequestPage,
    data: requestData,
  } = useInfiniteQuery({
    queryKey: ["getMyRequestsWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyRequestsWithPage({ pageParam }),
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
    queryKey: ["getMyFriendsWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyFriendsWithPage({ pageParam, size: 12 }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.length / 12;
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
          {requestData?.pages[0].length !== 0 ? (
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
            <div className="w-full p-5 text-center">
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
              {/* <span className="text-lg font-semibold text-default-900">
                {(me as any)?.friendCount}
              </span> */}
            </div>
            <Link
              href="/me/friends"
              className="font-semibold text-default-500 hover:text-default-800 active:text-default-900"
            >
              View More
            </Link>
          </div>
          {friendData?.pages.map(
            (page: any) =>
              Array.isArray(page) &&
              page.map((friend: any) => (
                <FollowList key={friend.id} user={friend} isRequest={false} />
              )),
          )
          //  : (
          //   <div className="w-full py-5 text-center">
          //     <span>No Friend</span>
          //   </div>
          // )
          }

          {hasNextFriendPage && friendData?.pages[0].length !== 0 ? (
            <button onClick={() => fetchNextFriendPage()}>View More</button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
