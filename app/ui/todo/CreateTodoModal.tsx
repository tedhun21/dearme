import XIcon from "@/public/todo/XIcon";
import { Modal } from "@mui/joy";
import { Switch } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateTodoModal({
  date,
  todo,
  modalOpen,
  handleAnchorModalClose,
}: any) {
  console.log(todo);
  const [isPublicTodo, setPublicTodo] = useState(true);
  const { register: updateRegister } = useForm();

  return (
    <Modal
      className="flex items-center justify-center"
      open={modalOpen}
      onClose={() => handleAnchorModalClose()}
    >
      <div className="flex h-[400px] w-[300px] flex-col justify-between rounded-2xl bg-default-300 p-6 xxs:w-[360px] xs:w-[500px]">
        <form className="flex h-full flex-col gap-8">
          <div className="flex w-full items-center gap-4">
            <input
              className="w-full rounded-lg border-2 border-default-400 bg-default-300 p-1 font-semibold outline-none focus:border-default-900"
              placeholder="Please wrtie your goal..."
            />
            <button
              onClick={() => handleAnchorModalClose()}
              className="rounded-full p-2 hover:bg-default-400"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="h-full w-full">
            <div>{date}</div>
            <textarea
              className="h-[150px] w-full rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none focus:border-default-900"
              placeholder="please write the content..."
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>PUBLIC</div>
              <Switch
                value={isPublicTodo}
                onChange={() => setPublicTodo((prev) => !prev)}
                sx={{
                  /// switch 기본 박스 크기
                  padding: 0,
                  width: "32px",
                  height: "20px",
                  "& .MuiSwitch-switchBase": {
                    padding: 0,
                    margin: "2px",
                    transitionDuration: "300ms",
                    /// 체크될때
                    "&.Mui-checked": {
                      transform: "translateX(12px)",
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#143422",
                        opacity: 1,
                        border: 0,
                      },
                      "&.Mui-disabled + .MuiSwitch-track": {
                        opacity: 0.5,
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    boxSizing: "border-box",
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    backgroundColor: "#b6b6c0",
                    opacity: 1,
                  },
                }}
              />
            </div>
            <button className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900">
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
