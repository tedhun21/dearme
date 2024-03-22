"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { CircularProgress, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BackButton from "@/app/ui/backbutton";

import { getMyFriendsAndBlock } from "@/store/api";
import FollowList from "@/app/ui/me/followers/FollowList";

export default function Friends() {
  const [ref, inView] = useInView();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    data: friendData,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["getMyFriendsAndBlock"],
    queryFn: ({ pageParam }) =>
      getMyFriendsAndBlock({
        pageParam,
        searchParam: searchKeyword,
        size: 20,
      }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.length / 4;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  // 무한 스크롤 설정
  useEffect(() => {
    if (!inView) {
      return;
    }

    fetchNextPage();
  }, [inView]);

  // 디바운스
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // 검색 요청을 보낼 함수를 여기에 작성
      refetch();
    }, 500); // 0.5초 지연 후에 검색 요청 보내도록 설정

    return () => {
      clearTimeout(debounceTimer); // 이펙트 정리 시 타이머 제거
    };
  }, [searchKeyword]);

  return (
    <section className="mb-20 px-4 py-3">
      <div className="flex flex-col items-start gap-3">
        <BackButton />
        <div className="relative w-full">
          <input
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full rounded-3xl border-2 border-default-300 px-4 py-2 focus:border-default-500 focus:outline-none"
          />
          <SearchIcon className="absolute right-4 top-2.5" />
        </div>
      </div>
      <Divider sx={{ my: "20px" }} />

      {!isLoading || !isRefetching ? (
        friendData?.pages.map((page) =>
          page.map((friend: any) => (
            <FollowList key={friend.id} user={friend} isRequest={false} />
          )),
        )
      ) : (
        <div>Loading...</div>
      )}

      {hasNextPage && (
        <div ref={ref}>
          <CircularProgress />
        </div>
      )}
    </section>
  );
}
