import { followCancelFriedship } from "@/store/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CancelFollowButton({ userId }: any) {
  const queryClient = useQueryClient();

  const { mutate: followCancelMutate } = useMutation({
    mutationKey: ["followCancelFriedship"],
    mutationFn: followCancelFriedship,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["getFriendship"] });

      const prevFriendship = queryClient.getQueryData(["getFriendship"]);

      queryClient.setQueryData(["getFriendship"], () => ({
        status: "NOTHING",
      }));

      return { prevFriendship };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getFriendship"], context?.prevFriendship);
      window.alert(err);
    },
  });

  const handleFollowCancel = () => {
    followCancelMutate(userId);
  };

  return (
    <>
      <button
        className="rounded-3xl bg-default-500 px-4 py-1 font-semibold text-white hover:bg-default-600 active:bg-default-700"
        onClick={() => handleFollowCancel()}
      >
        Cancel
      </button>
    </>
  );
}
