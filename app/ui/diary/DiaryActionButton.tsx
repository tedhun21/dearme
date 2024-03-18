import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteDiary } from "@/store/api";

import EditPost from "@/public/social/EditPost";
import Delete from "@/public/social/Delete";
import clsx from "clsx";

export default function DiaryActionButton({
  date,
  diaryId,
  actionType,
}: {
  date: any;
  diaryId: string;
  actionType: "Edit" | "Delete";
}) {
  const router = useRouter();

  const { mutate: deleteDairyMutate } = useMutation({
    mutationKey: ["deleteDiary", diaryId],
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => {
      if (actionType === "Delete") window.alert("Diary deleted successfully");
      window.location.reload();
    },
    onError: (error: Error) => {
      window.alert(
        `Error ${actionType === "Delete" ? "deleting" : "editing"} the diary: ,
        ${error.message}`,
      );
    },
  });

  const handleDeleteClick = () => {
    if (
      actionType === "Delete" &&
      window.confirm("Are you sure you want to delete this diary?")
    ) {
      deleteDairyMutate();
    } else if (actionType === "Edit") {
      router.push(`/${date}/diary/edit`);
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        "rounded-lg border-2 p-2",
        actionType === "Delete"
          ? "border-black bg-default-800 hover:bg-default-700"
          : "border-default-400 bg-default-300 hover:bg-default-400",
      )}
      onClick={() => handleDeleteClick()}
    >
      <div className="flex items-center justify-center">
        {actionType === "Delete" ? (
          <div className="flex items-center gap-1">
            <Delete className="h-4 w-4 fill-current text-white" />
            <span className="text-sm font-semibold text-white">Delete</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <EditPost className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">Edit</span>
          </div>
        )}
      </div>
    </button>
  );
}
