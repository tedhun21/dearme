import { useState } from "react";
import AskModal from "../../AskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockFriend } from "@/store/api";

export default function UnblockButton({ userId }: any) {
  const queryClient = useQueryClient();
  const [openUnblockModal, setOpenUnblockModal] = useState(false);

  const { mutate: unblockFriendMutate } = useMutation({
    mutationKey: ["unblockFriend"],
    mutationFn: unblockFriend,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getFriendship"] });

      const prevFriendship = queryClient.getQueryData(["getFriendship"]);

      if ((prevFriendship as any)?.status === "BLOCK_ONE") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "FRIEND",
        }));
      } else if ((prevFriendship as any)?.status === "BLOCK_BOTH") {
        queryClient.setQueryData(["getFriendship"], (old: any) => ({
          ...old,
          status: "BLOCK_ONE",
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
      <button onClick={() => setOpenUnblockModal(true)}>Unblock</button>
      <AskModal
        type="block"
        openModal={openUnblockModal}
        setOpenModal={setOpenUnblockModal}
        clickAction={handleUnblockFriend}
      />
    </>
  );
}
