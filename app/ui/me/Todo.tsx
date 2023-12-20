import CheckFalseIcon from "@/public/me/CheckFalseIcon";
import CheckTrueIcon from "@/public/me/CheckTrueIcon";
import ThreeDots from "@/public/me/ThreeDots";
import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTrueIcon";
import { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: {
    id: number;
    body: string;
    checked: boolean;
  };
}

export default function Todo({ todo }: TodoProps) {
  const [isChecked, setIsChecked] = useState("비공개");
  const [popup, setPopup] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleToggleClick = () => {};

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    setPopup(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      popup &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setPopup(false);
    }
  };

  useEffect(() => {
    if (popup) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [popup]);

  return (
    <div className="flex justify-between rounded-xl bg-default-100 px-3 py-2">
      <div className="flex gap-3">
        {todo.checked ? (
          <button onClick={() => handleToggleClick()}>
            <TodoCheckTrueIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        ) : (
          <button onClick={() => handleToggleClick()}>
            <TodoCheckFalseIcon className="hover:tedxt-default-700 h-5 w-5 fill-current text-default-600" />
          </button>
        )}
        <span className="text-semibold text-sm text-default-700">
          {todo.body}
        </span>
      </div>
      <button className="relative" onClick={(e) => handleOpenClick(e)}>
        {popup && (
          <div
            ref={modalRef}
            className="z-100 absolute right-2 top-3 flex w-32 flex-col items-start rounded-xl bg-white"
          >
            <div className="p-2 text-2xs font-semibold">공개 설정</div>
            <div className="flex w-full items-center gap-2 border-b-2 px-3 py-1">
              <button onClick={() => setIsChecked("모두")}>
                {isChecked === "모두" ? (
                  <CheckTrueIcon className="h-4 w-4 fill-current text-default-700" />
                ) : (
                  <CheckFalseIcon className="h-4 w-4 fill-current text-default-700" />
                )}
              </button>
              <div className="text-2xs font-semibold">모두</div>
            </div>
            <div className="flex w-full items-center gap-2 border-b-2 px-3 py-1">
              <button onClick={() => setIsChecked("친구만")}>
                {isChecked === "친구만" ? (
                  <CheckTrueIcon className="h-4 w-4 fill-current text-default-700" />
                ) : (
                  <CheckFalseIcon className="h-4 w-4 fill-current text-default-700" />
                )}
              </button>
              <div className="text-2xs font-semibold">친구만</div>
            </div>
            <div className="flex w-full items-center gap-2 px-3 py-1">
              <button onClick={() => setIsChecked("비공개")}>
                {isChecked === "비공개" ? (
                  <CheckTrueIcon className="h-4 w-4 fill-current text-default-700" />
                ) : (
                  <CheckFalseIcon className="h-4 w-4 fill-current text-default-700" />
                )}
              </button>
              <div className="text-2xs font-semibold">비공개</div>
            </div>
          </div>
        )}
        <ThreeDots className="h-5 w-5 fill-current text-default-600 hover:text-default-700" />
      </button>
    </div>
  );
}
