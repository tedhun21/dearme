/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSearchUsers, getSearchGoals } from "@/store/api";

import RecentSearches from "./RecentSearches";

import InputBase from "@mui/material/InputBase";

import Find from "@/public/search/Find";
import Delete from "@/public/search/Delete";
import GoalTag from "@/public/search/GoalTag";
import UserWithNoImage from "@/public/social/UserWithNoImage";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function SearchBar() {
  // input focus
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  // 검색어 (Debounce)
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search !== "") {
        setDebouncedSearch(search);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  const handleDelete = () => {
    setSearch("");
  };

  // 유저 검색
  const { data: searchResult } = useQuery({
    queryKey: ["getSearchResult", debouncedSearch],
    queryFn: () => getSearchUsers(debouncedSearch),
    enabled: Boolean(search),
    staleTime: 0,
  });
  const users = searchResult || [];

  // # 목표 검색
  const { data: getGoalSearchResult } = useQuery({
    queryKey: ["getGoalSearchResult", debouncedSearch],
    queryFn: () => getSearchGoals(debouncedSearch.substring(1), false),
    enabled: Boolean(search) && search.startsWith("#"),
    staleTime: 0,
  });
  const searchedGoals = getGoalSearchResult || [];

  // 최근 검색어
  interface recentSearch {
    id: number;
    text: string;
    userId?: number;
    photo?: string;
  }

  const [recentSearches, setRecentSearches] = useState<recentSearch[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("recentSearches") || "[]";
      setRecentSearches(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleAddRecent = (text: string, photo: string, userId?: number) => {
    const newRecent = {
      id: Date.now(),
      text: text,
      ...(photo && { photo: photo }),
      userId: userId,
    };
    const updatedRecentSearches = [newRecent, ...recentSearches.slice(0, 9)];

    setRecentSearches(updatedRecentSearches);
  };

  const handleRemoveRecent = (id: number) => {
    const newRecent = recentSearches.filter((recent) => {
      return recent.id !== id;
    });
    setRecentSearches(newRecent);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <>
      {/* 검색 상자*/}
      <section className="flex w-full items-center">
        <div
          className={`flex h-12 w-full items-center ${
            search !== "" ? "rounded-t-lg" : "rounded-lg"
          } border-2 border-default-300 bg-default-100 p-0.5`}
        >
          <Find
            className={`ml-5 h-4 w-4 fill-current ${
              isInputFocused ? "text-default-700" : "text-default-400"
            }`}
          />
          <InputBase
            sx={{
              ml: 1,
              color: isInputFocused ? "black" : "#DED0B6",
              fontSize: 14,
              width: "85%",
            }}
            placeholder="user, #goal and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleFocus}
          />
          {search && (
            <button onClick={handleDelete} className="ml-1 mr-5">
              <Delete className="h-4 w-4 cursor-pointer fill-current text-default-400" />
            </button>
          )}
        </div>
      </section>

      {/* !input Focus ? 최근 검색어 : 추천 검색어 */}
      {search === "" ? (
        <RecentSearches
          recentSearches={recentSearches}
          onRecentRemove={(id) => handleRemoveRecent(id)}
          onClearRecent={handleClearRecent}
        />
      ) : (
        <section className="mb-5 flex w-full flex-col  rounded-b-lg border-x-2 border-b-2 border-default-300 bg-default-100 px-5 pt-5">
          {/* 검색 결과 */}
          {/* #목표 검색 */}
          {search.trim() !== "" && search.startsWith("#") ? (
            <div>
              <div className="mb-3 text-sm font-medium text-default-400">
                Goals
              </div>
              {Array.isArray(searchedGoals) && searchedGoals.length > 0 ? (
                searchedGoals.map((goal: any) => (
                  <a
                    key={goal.id}
                    href={`/search/${goal.title}`}
                    onClick={() => {
                      handleAddRecent(`#${goal.title}`, "");
                    }}
                  >
                    <div className="mb-3 flex items-center">
                      <GoalTag className="h-10 w-10 rounded-full" />
                      <div className="flex items-center">
                        <div className="ml-3 text-sm font-medium">
                          {goal.title}
                        </div>
                        <div className="ml-3 text-xs font-medium">
                          {goal.postsCount.toLocaleString() +
                            (goal.postsCount <= 1 ? " post" : " posts")}
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="mb-5 flex w-full justify-center  text-xs font-normal text-default-300">
                  No goals found
                </div>
              )}
            </div>
          ) : (
            //  유저 검색
            <div>
              <div className="mb-3 text-sm font-medium text-default-400">
                Users
              </div>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <a
                    key={user.id}
                    href={`/profile/${user.id}`}
                    onClick={() => {
                      handleAddRecent(user.nickname, user.photo, user.id);
                    }}
                  >
                    <div className="mb-3 flex items-center">
                      {user.photo ? (
                        <img
                          src={`${BUCKET_URL}${user.photo}`}
                          alt="User image"
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <UserWithNoImage />
                      )}

                      <div className="ml-3 text-sm font-medium">
                        {user.nickname}
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="mb-5 flex w-full justify-center  text-xs font-normal text-default-300">
                  No users found
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}
