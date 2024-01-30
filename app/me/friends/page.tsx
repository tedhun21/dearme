"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  Autocomplete,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BackButton from "@/app/ui/backbutton";
import FollowList from "@/app/ui/me/FollowList";
import { getMyFriendWithPage } from "@/store/api";
import { getCookie } from "@/util/tokenCookie";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const access_token = getCookie("access_token");

export default function Friends() {
  const [ref, inView] = useInView();
  const [searchKeyword, setsearchKeyword] = useState("");

  const {
    hasNextPage,
    fetchNextPage,
    data: friendData,
  } = useInfiniteQuery({
    queryKey: ["getMyFriendWithPage"],
    queryFn: ({ pageParam }) =>
      getMyFriendWithPage({ pageParam, size: 20, access_token }),
    getNextPageParam: (lastPage, allPages: any) => {
      const maxPage = lastPage.users.length / 4;
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
  }, []);

  return (
    <section className="mb-20 px-4 py-3">
      <div className="flex flex-col items-start gap-3">
        <BackButton />
        {/* <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#FBFAF2",
            borderRadius: "12px",
            borderColor: "#EBE3D5",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Your Friend"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper> */}
      </div>
      <Divider sx={{ my: "20px" }} />

      {friendData?.pages.map((page) =>
        page.users.map((friend: any) => (
          <FollowList key={friend.id} user={friend} isRequest={false} />
        )),
      )}

      {hasNextPage && (
        <div ref={ref}>
          <CircularProgress />
        </div>
      )}
    </section>
  );
}
