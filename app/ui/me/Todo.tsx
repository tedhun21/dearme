import ThreeDots from "@/public/me/ThreeDots";
import TodoCheckFalseIcon from "@/public/me/TodoCheckFalseIcon";
import TodoCheckTrueIcon from "@/public/me/TodoCheckTureIcon";
import { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: {
    id: number;
    body: string;
    checked: boolean;
  };
}

export default function Todo({ todo }: TodoProps) {
  const [isChecked, setIsChecked] = useState(false);
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
    <div
      key={todo.id}
      className="flex justify-between rounded-xl bg-default-100 px-3 py-2"
    >
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
            className="absolute right-2 top-3 w-32 rounded-lg bg-white"
          >
            hi
          </div>
        )}
        <ThreeDots className="h-5 w-5 fill-current text-default-600 hover:text-default-700" />
      </button>
    </div>
  );
}
