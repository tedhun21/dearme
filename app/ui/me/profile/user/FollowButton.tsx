import { followUser } from "@/store/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AskModal from "../../AskModal";
import { useState } from "react";

export default function FollowButton({ userId }: any) {
  const queryClient = useQueryClient();
  const [openFollowModal, setOpenFollowModal] = useState(false);

  const { mutate: followMutate } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: () => followUser(userId),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["getFriendship"] });

      const prevFriendship = queryClient.getQueryData(["getFriendship"]);

      queryClient.setQueryData(["getFriendship"], () => ({
        status: "PENDING",
        follow_receiver: { id: data },
      }));

      return { prevFriendship };
    },
    onSuccess: () => {
      setOpenFollowModal(false);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getFriendship"], context?.prevFriendship);
      window.alert(err);
      setOpenFollowModal(false);
    },
  });
  const handleFollow = () => {
    if (userId) {
      followMutate(userId);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenFollowModal(true)}
        className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700"
      >
        Follow
      </button>
      <AskModal
        type="nothing"
        openModal={openFollowModal}
        setOpenModal={setOpenFollowModal}
        clickAction={handleFollow}
      />
    </>
  );
}
