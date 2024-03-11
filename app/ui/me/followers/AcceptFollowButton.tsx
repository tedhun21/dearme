import { useState } from "react";
import AskModal from "../AskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest } from "@/store/api";

export default function AcceptFollowButton({ user }: any) {
  const queryClient = useQueryClient();
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  // Accept (요청 수락)
  // 이 부분은 react-query: optimistic updates 기술을 이용
  const { mutate: requestAcceptMutate } = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: acceptRequest,

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
      setOpenAcceptModal(false);
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["getMyFriendsWithPage"], context?.prevFriends);
      queryClient.setQueryData(
        ["getMyRequestsWithPage"],
        context?.prevRequests,
      );
      // queryClient.setQueryData(["getMe"], context?.prevMe);

      setOpenAcceptModal(false);
      window.alert(err);
    },
  });

  // 친구 수락 핸들러
  const handleAcceptRequest = () => {
    requestAcceptMutate(user.id);
  };
  return (
    <>
      <button
        onClick={() => setOpenAcceptModal(true)}
        className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700"
      >
        Accept
      </button>
      {/* <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
  Delete
</button> */}
      <AskModal
        type="request"
        openModal={openAcceptModal}
        setOpenModal={setOpenAcceptModal}
        clickAction={handleAcceptRequest}
      />
    </>
  );
}
