import { useState } from "react";
import AskModal from "../../AskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockFriend } from "@/store/api";

export default function BlockFriendButton({ meId, userId }: any) {
  const queryClient = useQueryClient();
  const [openBlockModal, setOpenBlockModal] = useState(false);

  // Block Mutate
  const { mutate: blockFriendMutate } = useMutation({
    mutationKey: ["BlockFriend"],
    mutationFn: blockFriend,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getFriendship"] });

      const prevFriendship = queryClient.getQueryData(["getFriendship"]);

      if ((prevFriendship as any)?.status === "FRIEND") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "BLOCK_ONE",
          block: [{ id: meId }],
          blocked: [{ id: userId }],
        }));
      } else if ((prevFriendship as any)?.status === "BLOCK_ONE") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "BLOCK_BOTH",
          block: [...old.block, { id: meId }],
          blocked: [...old.blocked, { id: userId }],
        }));
      }

      return { prevFriendship };
    },
    onSuccess: () => {
      setOpenBlockModal(false);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getFriendship"], context?.prevFriendship);
      window.alert(err);
      setOpenBlockModal(false);
    },
  });

  const handleBlockFriend = () => {
    blockFriendMutate(userId);
  };
  return (
    <>
      <button
        onClick={() => setOpenBlockModal(true)}
        className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700"
      >
        Block
      </button>
      <AskModal
        type="friend"
        openModal={openBlockModal}
        setOpenModal={setOpenBlockModal}
        clickAction={handleBlockFriend}
      />
    </>
  );
}
