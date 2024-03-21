import { useState } from "react";
import AskModal from "../AskModal";
import { deleteCookie } from "@/util/tokenCookie";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { diaryListState, settingState, todoListState } from "@/store/atoms";

export default function SignOut() {
  const setTodos = useSetRecoilState(todoListState);
  const setDiaries = useSetRecoilState(diaryListState);
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleSignOut = async () => {
    setTodos([]);
    setDiaries([]);

    await deleteCookie("access_token");

    router.push("/");
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="font-semibold hover:text-default-800 active:text-default-900"
      >
        Sign Out
      </button>
      <AskModal
        type="signout"
        openModal={openModal}
        setOpenModal={setOpenModal}
        clickAction={handleSignOut}
      />
    </>
  );
}
