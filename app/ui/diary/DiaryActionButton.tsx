import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteDiary } from "@/store/api";

import EditPost from "@/public/social/EditPost";
import Delete from "@/public/social/Delete";

export default function DiaryActionButton({
  diaryId,
  actionType,
}: {
  diaryId: string;
  actionType: "Edit" | "Delete";
}) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["deleteDiary", diaryId],
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => {
      if (actionType === "Delete") window.alert("Diary deleted successfully");
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(
        `Error ${actionType === "Delete" ? "deleting" : "editing"} the diary:`,
        error.message,
      );
    },
  });

  const handleClick = () => {
    if (
      actionType === "Delete" &&
      window.confirm("Are you sure you want to delete this diary?")
    ) {
      mutate();
    } else if (actionType === "Edit") {
      router.push(`/diary/${diaryId}/edit`);
    }
  };

  return (
    <button
      className={`h-10 rounded-lg border-2 ${
        actionType === "Delete"
          ? "border-black bg-default-800 hover:bg-default-700"
          : "border-default-400 bg-default-300 hover:bg-default-400"
      } pl-2 pr-2`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center">
        {actionType === "Delete" ? (
          <>
            <Delete className="mr-1 h-4 w-4 fill-current text-white" />
            <span className="text-sm font-semibold text-white">삭제하기</span>
          </>
        ) : (
          <>
            <EditPost className="mr-1 h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">수정하기</span>
          </>
        )}
      </div>
    </button>
  );
}
