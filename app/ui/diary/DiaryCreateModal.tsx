import React from "react";
import { Transition } from "react-transition-group";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

import CirclePlus from "../../../public/diary/CirclePlus";
import Weather from "../../../public/diary/Weather";

export default function DiaryCreateModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    // 모달창을 띄우는 버튼
    <>
      <Button
        className="flex flex-col px-8 py-28 text-base text-default-800"
        variant="plain"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <CirclePlus />
        당신의 소중한 이야기를 기록해주세요:)
      </Button>
      <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
        <span className="mr-2">
          <Weather />
        </span>
        <h4 className="flex justify-end text-xs font-medium text-default-800">
          서울 마포구, 9.2°C
        </h4>
      </section>
      <Transition in={open} timeout={400}>
        {(state: string) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog // 여기서부터는 모달창 안에 들어가는 컴포넌트
              className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-100"
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle className="text-sm">제목</DialogTitle>
              <DialogContent>
                <Input
                  className="flex border-2 border-default-300 bg-default-200 text-center"
                  variant="soft"
                  placeholder="최대 25자 내외로 작성해주세요."
                  sx={{ minHeight: "40px", justifyItems: "center" }}
                />
              </DialogContent>
              <DialogTitle className="text-sm">내용</DialogTitle>
              <DialogContent>
                <Textarea
                  className="flex justify-center border-2 border-default-300 bg-default-200"
                  variant="soft"
                  sx={{ minHeight: "200px" }}
                />
              </DialogContent>
              <section className="flex justify-center gap-8 px-4 py-2">
                <Button className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800">
                  취소
                </Button>
                <Button className="flex bg-default-800 px-5 text-default-100">
                  작성 완료
                </Button>
              </section>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
}
