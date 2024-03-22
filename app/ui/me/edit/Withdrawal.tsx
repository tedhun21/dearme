import { Modal } from "@mui/material";
import AskModal from "../AskModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteMe } from "@/store/api";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/util/tokenCookie";

export default function Withdrawal({ me }: any) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const { mutate: deleteMeMutate } = useMutation({
    mutationKey: ["deleteMe"],
    mutationFn: deleteMe,
    onSuccess: ({ data }: any) => {
      window.alert(data.message);
      deleteCookie("access_token");
      router.push("/");
    },
    onError: (data: any) => {
      window.alert(data.response.data.error.message);
    },
  });

  const handleWithdraw = () => {
    deleteMeMutate({ userId: me.id });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="font-semibold hover:text-default-800 active:text-default-900"
      >
        Withdraw
      </button>
      <AskModal
        type="withdraw"
        openModal={openModal}
        setOpenModal={setOpenModal}
        clickAction={handleWithdraw}
      />
    </>
  );
}
