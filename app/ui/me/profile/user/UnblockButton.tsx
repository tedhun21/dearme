import { useState } from "react";
import AskModal from "../../AskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockFriend } from "@/store/api";

export default function UnblockButton({ meId, userId }: any) {
  const queryClient = useQueryClient();
  const [openUnblockModal, setOpenUnblockModal] = useState(false);

  const { mutate: unblockFriendMutate } = useMutation({
    mutationKey: ["unblockFriend"],
    mutationFn: unblockFriend,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getFriendship"] });

      const prevFriendship = queryClient.getQueryData(["getFriendship"]);

      console.log(prevFriendship);
      if ((prevFriendship as any)?.status === "BLOCK_ONE") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "FRIEND",
          block: old.block.filter((block: any) => block.id !== meId),
          blocked: old.blocked.filter((blocked: any) => blocked.id !== userId),
        }));
      } else if ((prevFriendship as any)?.status === "BLOCK_BOTH") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "BLOCK_ONE",
          block: old.block.filter((block: any) => block.id !== meId),
          blocked: old.blocked.filter((blocked: any) => blocked.id !== userId),
        }));
      }
      return { prevFriendship };
    },
    onSuccess: () => {
      setOpenUnblockModal(false);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getFriendship"], context?.prevFriendship);

      window.alert(err);
      setOpenUnblockModal(false);
    },
  });

  const handleUnblockFriend = () => {
    unblockFriendMutate(userId);
  };

  return (
    <>
      <button
        onClick={() => setOpenUnblockModal(true)}
        className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700"
      >
        Unblock
      </button>
      <AskModal
        type="block"
        openModal={openUnblockModal}
        setOpenModal={setOpenUnblockModal}
        clickAction={handleUnblockFriend}
      />
    </>
  );
}
