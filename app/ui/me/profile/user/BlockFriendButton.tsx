import { useState } from "react";
import AskModal from "../../AskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockFriend } from "@/store/api";

export default function BlockFriendButton({ userId }: any) {
  const queryClient = useQueryClient();
  const [openBlockModal, setOpenBlockModal] = useState(false);

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
        }));
      } else if ((prevFriendship as any)?.status === "BLOCK_ONE") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "BLOCK_BOTH",
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
      <button onClick={() => setOpenBlockModal(true)}>Block</button>
      <AskModal
        type="friend"
        openModal={openBlockModal}
        setOpenModal={setOpenBlockModal}
        clickAction={handleBlockFriend}
      />
    </>
  );
}
