"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";

import MePostCard from "@/app/ui/me/MePostCard";
import { getCookie } from "@/util/tokenCookie";
import { getMyPostsWithPage } from "@/store/api";
import { useRecoilState } from "recoil";
import { postListState } from "@/store/atoms";

const access_token = getCookie("access_token");

export default function MePost() {
  const [ref, inView] = useInView();
  const [posts, setPosts] = useRecoilState(postListState);

  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getMyPostsWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyPostsWithPage({ pageParam, access_token }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const maxPage = lastPage.results?.length / 12;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView) {
      return;
    }

    fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (postData) {
      setPosts({
        results: postData.pages,
        pagination: postData.pages[0].pagination,
      });
    }
  }, []);

  return (
    <section className="mb-20 mt-4">
      <h1 className="mx-5 mb-3 text-base font-semibold">포스트</h1>
      <section>
        <div className="grid grid-cols-3 xs:grid-cols-4">
          {postData?.pages.map((page: any) =>
            page.results.map((post: any) => (
              <MePostCard key={post.id} post={post} />
            )),
          )}
          {hasNextPage ? (
            <div ref={ref}>
              <CircularProgress />
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
}
