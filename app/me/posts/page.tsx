"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";

import MePostCard from "@/app/ui/me/MePostCard";
import { getCookie } from "@/util/tokenCookie";
import { getMyPostsWithPage } from "@/store/api";

const access_token = getCookie("access_token");

export default function MePost() {
  const [ref, inView] = useInView();
  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getMyPostsWithPage", { access_token }],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyPostsWithPage({ pageParam, access_token }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.data?.length / 20;
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

  // console.log(postData?.pages[0].data);

  return (
    <section className="mb-20 mt-4">
      <h1 className="mx-5 mb-3 text-base font-semibold">포스트</h1>
      <section>
        <div className="grid grid-cols-3 xs:grid-cols-4">
          {/* {postData?.pages &&
            postData?.pages.map(
              (page: any) =>
                Array.isArray(page.data) &&
                page.data.map((post: any) => (
                  <MePost key={post.id} post={post} />
                )),
            )} */}

          {postData?.pages.map((page: any) =>
            page.data.map((post: any) => (
              <MePostCard key={post.id} post={post} />
            )),
          )}
          {/* <div className="flex items-center justify-center">
            <Image
              src="/me/petmily.png"
              width={200}
              height={200}
              alt="petmily"
            />
          </div> */}

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
