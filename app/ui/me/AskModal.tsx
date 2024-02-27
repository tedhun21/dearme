import XIcon from "@/public/todo/XIcon";
import { Modal } from "@mui/material";

export default function AskModal({
  type,
  openModal,
  setOpenModal,
  clickAction,
}: any) {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      className="flex items-center justify-center"
    >
      <div className="flex h-[300px] flex-col justify-between gap-10 rounded-2xl bg-default-200 p-6 xxs:w-[360px] xs:w-[500px]">
        <div className="flex w-full justify-between">
          <span className="flex flex-auto justify-center text-xl font-bold">
            Notice
          </span>
          <button
            onClick={() => setOpenModal(false)}
            className="flex justify-end"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <span className="flex justify-center text-lg">
          {type === "request"
            ? "Would you like to accept the friend request"
            : type === "friend"
              ? "Would you like to block this friend?"
              : type === "block" && "Would you like to unblock this user?"}
        </span>
        <div className="flex justify-between p-4">
          <button
            onClick={() => setOpenModal(false)}
            className="rounded-lg border-2 border-black px-3 py-2 font-semibold hover:bg-default-100"
          >
            Cancel
          </button>
          <button
            onClick={() => clickAction()}
            className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900"
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
}
