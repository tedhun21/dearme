import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {
  blockFriend,
  unblockFriend,
  updateFriendshipToFriend,
} from "@/store/api";

import AskModal from "../AskModal";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export default function FollowList({ user, isRequest }: any) {
  const queryClient = useQueryClient();

  const [openAskModal, setOpenAskModal] = useState(false);

  // Accept (요청 수락)
  // 이 부분은 react-query: optimistic updates 기술을 이용
  const { mutate: requestAcceptMutate } = useMutation({
    mutationKey: ["updateFriendshipToFriend"],
    mutationFn: updateFriendshipToFriend,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getMyRequestsWithPage"] });
      await queryClient.cancelQueries({
        queryKey: ["getMyFriendsWithPage"],
      });

      const prevRequests = queryClient.getQueryData(["getMyRequestsWithPage"]);
      const prevFriends = queryClient.getQueryData(["getMyFriendsWithPage"]);
      // const prevMe = queryClient.getQueryData(["getMe"]);

      const newFriend = {
        id: user?.id,
        username: user?.username,
        nickname: user?.nickname,
        photo: user.photo
          ? { id: user?.photo?.id, url: user?.photo?.url }
          : null,
        status: "FRIEND",
      };

      queryClient.setQueryData(["getMyRequestsWithPage"], (old: any) => {
        const filteredPages = old.pages.map((page: any) =>
          page.filter((requestUser: any) => requestUser.id !== user.id),
        );

        return { ...old, pages: filteredPages };
      });

      queryClient.setQueryData(["getMyFriendsWithPage"], (old: any) => ({
        ...old,
        pages: [[newFriend], ...old.pages],
      }));

      // queryClient.setQueryData(["getMe"], (old: any) => ({
      //   ...old,
      //   friendCount: old.friendCount + 1,
      // }));

      return { prevFriends, prevRequests };
    },
    onSuccess: () => {
      setOpenAskModal(false);
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["getMyFriendsWithPage"], context?.prevFriends);
      queryClient.setQueryData(
        ["getMyRequestsWithPage"],
        context?.prevRequests,
      );
      // queryClient.setQueryData(["getMe"], context?.prevMe);

      setOpenAskModal(false);
      window.alert(err);
    },
  });

  // 친구 block
  const { mutate: blockFriendMutate } = useMutation({
    mutationKey: ["blockFriend"],
    mutationFn: blockFriend,
    onMutate: async () => {
      // await queryClient.cancelQueries({ queryKey: ["getMe"] });
      await queryClient.cancelQueries({ queryKey: ["getMyFriendsWithPage"] });
      await queryClient.cancelQueries({ queryKey: ["getMyFriendsAndBlock"] });

      // const prevMe = queryClient.getQueryData(["getMe"]);

      const prevFriends = queryClient.getQueryData(["getMyFriendsWithPage"]);
      const prevFriendsAndBlock = queryClient.getQueryData([
        "getMyFriendsAndBlock",
      ]);

      // queryClient.setQueryData(["getMe"], (old: any) => ({
      //   ...old,
      //   friendCount: old.friendCount - 1,
      // }));

      queryClient.setQueryData(["getMyFriendsWithPage"], (old: any) => {
        const filteredPages = old.pages.map((page: any) =>
          page.filter((friendUser: any) => friendUser.id !== user.id),
        );
        return { ...old, pages: filteredPages };
      });

      if (prevFriendsAndBlock) {
        queryClient.setQueryData(["getMyFriendsAndBlock"], (old: any) => {
          const updatedPages = old.pages.map((page: any) =>
            page.map((friendAndBlock: any) => {
              if (
                friendAndBlock.id === user.id &&
                friendAndBlock.status === "FRIEND"
              ) {
                friendAndBlock.status = "BLOCK";
              }
              return friendAndBlock;
            }),
          );
          return { ...old, pages: updatedPages };
        });
        return { prevFriends, prevFriendsAndBlock };
      }

      return { prevFriends };
    },

    onSuccess: () => {
      setOpenAskModal(false);
    },

    onError: (err, _, context: any) => {
      // queryClient.setQueryData(["getMe"], context?.prevMe);
      queryClient.setQueryData(["getMyFriendsWithPage"], context.prevFriends);
      queryClient.setQueryData(
        ["getMyFriendsAndBlock"],
        context.prevFriendsAndBlock,
      );

      window.alert(err);
      setOpenAskModal(false);
    },
  });

  // 친구 unblock
  const { mutate: unblockFriendMutate } = useMutation({
    mutationKey: ["unblockFriend"],
    mutationFn: unblockFriend,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["getMyFriendsAndBlock"],
      });

      const prev = queryClient.getQueryData(["getMyFriendsAndBlock"]);

      queryClient.setQueryData(["getMyFriendsAndBlock"], (old: any) => {
        const updatedPages = old.pages.map((page: any) =>
          page.map((blockUser: any) => {
            if (blockUser.id === user.id && blockUser.status === "BLOCK") {
              blockUser.status = "FRIEND";
            }
            return blockUser;
          }),
        );
        return { ...old, pages: updatedPages };
      });

      return { prev };
    },
    onSuccess: () => {
      setOpenAskModal(false);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getMyFriendsAndBlock"], context?.prev);

      setOpenAskModal(false);
      window.alert(err);
    },
  });

  // 친구 수락 핸들러
  const handleAcceptRequest = () => {
    requestAcceptMutate(user.id);
  };

  // 친구 블락 핸들러
  const handleBlockFriend = () => {
    blockFriendMutate(user.id);
  };

  // 친구 언블락 핸들러
  const handleUnblockFriend = () => {
    unblockFriendMutate(user.id);
  };

  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-default-300">
      <div className="flex items-center gap-4">
        <Link
          href={`/profile/${user.id}`}
          className="relative h-14 w-14 overflow-hidden rounded-full"
        >
          {user.photo && user?.photo.url !== undefined ? (
            <Image
              src={`${BUCKET_URL}${user.photo?.url}`}
              fill
              sizes="56px"
              className="object-cover object-center"
              alt="user photo"
            />
          ) : (
            <div className="h-full w-full bg-default-500" />
          )}
        </Link>
        <span className="font-semibold">{user?.nickname}</span>
      </div>

      {isRequest ? (
        <div className="flex gap-2">
          <button
            onClick={() => setOpenAskModal(true)}
            className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700"
          >
            Accept
          </button>
          {/* <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
        Delete
      </button> */}
          <AskModal
            type="request"
            openModal={openAskModal}
            setOpenModal={setOpenAskModal}
            clickAction={handleAcceptRequest}
          />
        </div>
      ) : user.status === "BLOCK" ||
        user.status === "BLOCK_ONE" ||
        user.status === "BLOCK_BOTH" ? (
        <>
          <button
            onClick={() => setOpenAskModal(true)}
            className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700"
          >
            UnBlock
          </button>
          <AskModal
            type="block"
            openModal={openAskModal}
            setOpenModal={setOpenAskModal}
            clickAction={handleUnblockFriend}
          />
        </>
      ) : (
        user.status === "FRIEND" && (
          <>
            <button
              onClick={() => setOpenAskModal(true)}
              className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700"
            >
              Block
            </button>
            <AskModal
              type="friend"
              openModal={openAskModal}
              setOpenModal={setOpenAskModal}
              clickAction={handleBlockFriend}
            />
          </>
        )
      )}
    </div>
  );
}
