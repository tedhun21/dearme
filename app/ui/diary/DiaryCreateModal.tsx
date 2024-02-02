import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import axios from "axios";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

import CirclePlus from "../../../public/diary/CirclePlus";
import Weather from "../../../public/diary/Weather";

export default function DiaryCreateModal({
  onSubmit,
}: {
  onSubmit: (data: { title: string; content: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [weather, setWeather] = useState("");

  const handleComplete = () => {
    onSubmit({ title, content }); // 부모 컴포넌트로 제목과 내용 전달
    setOpen(false); // 모달 닫기
    setTitle(""); // 제목 초기화
    setContent(""); // 내용 초기화
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        const { name, main } = response.data;
        const temp = main.temp.toFixed(1); // 소수점 첫째 자리에서 반올림
        setWeather(`${name}, ${temp}°C`);
      } catch (error) {
        console.error("날씨 정보를 가져오는 데 실패했습니다.", error);
      }
    });
  }, []);

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
          {weather || "날씨 정보를 가져오는 중입니다."}
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
                  value={title}
                  placeholder="최대 25자 내외로 작성해주세요."
                  onChange={(e) => setTitle(e.target.value)} // 제목 입력 처리
                  sx={{ minHeight: "40px", justifyItems: "center" }}
                />
              </DialogContent>
              <DialogTitle className="text-sm">내용</DialogTitle>
              <DialogContent>
                <Textarea
                  className="flex justify-center border-2 border-default-300 bg-default-200"
                  variant="soft"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} // 내용 입력 처리
                  sx={{ minHeight: "200px" }}
                />
              </DialogContent>
              <section className="flex justify-center gap-8 px-4 py-2">
                <Button
                  className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
                  onClick={() => setOpen(false)}
                >
                  취소
                </Button>
                <Button
                  className="flex bg-default-800 px-5 text-default-100"
                  onClick={handleComplete}
                >
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
