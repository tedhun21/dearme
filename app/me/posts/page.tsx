"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";

import { getMyPostsWithPage } from "@/store/api";
import MePostCard from "@/app/ui/me/MePostCard";

export default function MePost() {
  const [ref, inView] = useInView();

  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getMyPostsWithPage"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyPostsWithPage({ pageParam }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const maxPage = lastPage.results.length / 20;
      const nextPage = allPages.length + 1;

      return maxPage < 1 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchNextPage();
  }, [inView]);

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
