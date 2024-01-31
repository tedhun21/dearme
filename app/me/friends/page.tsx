"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { CircularProgress, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BackButton from "@/app/ui/backbutton";
import FollowList from "@/app/ui/me/FollowList";
import { getMyFriendWithPageAndSearch } from "@/store/api";
import { getCookie } from "@/util/tokenCookie";
import AutoComplete from "@/app/ui/me/AutoComplete";

const access_token = getCookie("access_token");

export default function Friends() {
  const [ref, inView] = useInView();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    data: friendData,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["getMyFriendWithPageAndSearch"],
    queryFn: ({ pageParam }) =>
      getMyFriendWithPageAndSearch({
        pageParam,
        searchParam: searchKeyword,
        size: 20,
        access_token,
      }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.users.length / 4;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  // 무한 스크롤 설정
  useEffect(() => {
    if (inView) {
      return;
    }

    fetchNextPage();
  }, [inView]);

  // 디바운스
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // 검색 요청을 보낼 함수를 여기에 작성
      refetch();
    }, 1000); // 1초 지연 후에 검색 요청 보내도록 설정

    return () => {
      clearTimeout(debounceTimer); // 이펙트 정리 시 타이머 제거
    };
  }, [searchKeyword]);

  console.log(friendData);

  return (
    <section className="mb-20 px-4 py-3">
      <div className="flex flex-col items-start gap-3">
        <BackButton />
        {/* <div className="relative w-full">
          <input
            className="w-full rounded-3xl border-2 border-default-300 px-4 py-2 focus:border-default-500 focus:outline-none"
            onFocus={() => setOpenInput(true)}
            onBlur={() => setOpenInput(false)}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="absolute right-4 top-1.5 rounded-full p-1 hover:bg-default-200 active:bg-default-400">
            <SearchIcon />
          </button>
          {openInput && (
            <AutoComplete searchKeyword={searchKeyword} friends={friends} />
          )}
        </div> */}

        <div className="relative w-full">
          <input
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full rounded-3xl border-2 border-default-300 px-4 py-2 focus:border-default-500 focus:outline-none"
          />
          <SearchIcon className="absolute right-4 top-2.5" />
        </div>
      </div>
      <Divider sx={{ my: "20px" }} />

      {!isLoading ? (
        friendData?.pages.map((page) =>
          page.users.map((friend: any) => (
            <FollowList key={friend.id} user={friend} isRequest={false} />
          )),
        )
      ) : (
        <div>No Followers</div>
      )}

      {hasNextPage && (
        <div ref={ref}>
          <CircularProgress />
        </div>
      )}
    </section>
  );
}
