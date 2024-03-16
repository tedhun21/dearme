"use client";

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
import WeatherIcons from "@/app/ui/diary/WeatherIcons";
import ButtonExit from "@/public/diary/ButtonExit";

export default function DiaryModal({ type, getValues, setValue }: any) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // // 입력된 제목의 길이가 25자를 초과 X
  // const handleTitleChange = (e: any) => {
  //   const input = e.target.value;
  //   if (input.length <= 25) {
  //     setTitle(input);
  //   }
  // };

  const handleDeleteDiary = (e: any) => {
    e.stopPropagation();

    setTitle("");
    setBody("");

    setValue("title", "");
    setValue("body", "");
  };

  const handleComplete = (e: any) => {
    e.stopPropagation();

    setValue("title", title);
    setValue("body", body);
    setOpen(false);
  };

  const handleCancel = () => {
    setTitle("");
    setBody("");

    setValue("title", "");
    setValue("body", "");
    setOpen(false);
  };

  // 날씨 정보 가져오기
  useEffect(() => {
    setTitle(getValues().title || "");
    setBody(getValues().body || "");
    if (open && type === "create") {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`;

        try {
          const {
            data: { main, name, weather },
          } = await axios.get(url);

          const temp = main.temp.toFixed(1); // 소수점 첫째 자리에서 반올림
          setValue("weather", `${name}, ${temp}°C`);
          setValue("weatherId", weather[0].id);
        } catch (error) {
          console.error("날씨 정보를 가져오는 데 실패했습니다.", error);
        }
      });
    }
  }, [open]);

  return (
    <>
      {getValues().title !== "" || getValues().body !== "" ? (
        <div className="group relative">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full flex-col rounded-md bg-white px-5 py-4 group-hover:bg-default-900"
          >
            <div className="flex flex-col items-start gap-4 py-8">
              <h3 className="text-lg font-bold">{getValues().title}</h3>
              <p className="pl-1 text-left">{getValues().body}</p>
            </div>
          </button>
          <div className="absolute bottom-4 right-8 flex items-center text-default-800">
            <WeatherIcons
              weatherId={getValues().weatherId}
              className="h-4 w-4 fill-current"
            />
            <h4 className="flex justify-end text-xs font-medium text-default-800">
              {getValues().weather || "날씨 정보를 가져오는 중입니다."}
            </h4>
          </div>
          <button
            onClick={(e) => handleDeleteDiary(e)}
            className="absolute right-4 top-4"
          >
            <ButtonExit />
          </button>
        </div>
      ) : (
        <>
          <button
            className="group px-8 py-20 text-base text-default-800 transition-all duration-300 hover:bg-default-900"
            onClick={() => setOpen(true)}
          >
            <div className="flex flex-col items-center gap-4">
              <CirclePlus className="h-10 w-10 fill-current text-default-800 group-hover:text-white" />
              <span className="font-semibold group-hover:text-white">
                Feel free to share your precious story with us :)
              </span>
            </div>
            <div className="absolute bottom-4 right-8 flex items-center">
              <span className="mr-2">
                <WeatherIcons
                  weatherId={getValues().weatherId}
                  className="h-4 w-4 fill-current text-black"
                />
              </span>
              <h4 className="text-xs font-medium text-default-800 group-hover:text-white">
                {getValues().weather || "날씨 정보를 가져오는 중입니다."}
              </h4>
            </div>
          </button>
        </>
      )}
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
              className="flex flex-col"
              sx={{
                p: 4,
                minWidth: "360px",
                maxWidth: "600px",
                width: "100%",
                backGroundColor: "#FBFAF2",
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-semibold">
                  Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please write within 25 characters."
                  className="w-full rounded-md border-2 border-default-300 px-3 py-1 outline-none hover:border-default-400 hover:bg-default-100 focus:border-default-900 focus:bg-default-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Content</label>
                <textarea
                  id="content"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Please write a diary"
                  className="min-h-60 rounded-md border-2 border-default-300 px-3 py-1 outline-none hover:border-default-400 hover:bg-default-100 focus:border-default-900 focus:bg-default-200"
                />
              </div>

              <div className="flex justify-center gap-8 px-4 py-2">
                <button
                  type="button"
                  className="rounded-md bg-default-300 px-5 text-center text-sm font-semibold text-default-800 hover:bg-default-400"
                  onClick={() => handleCancel()}
                >
                  Erase
                </button>

                <button
                  type="button"
                  onClick={(e) => handleComplete(e)}
                  className="rounded-md bg-default-800 px-4 py-2 text-sm font-semibold text-default-100 hover:bg-default-900"
                >
                  Write
                </button>
              </div>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
    // 모달창을 띄우는 버튼
    // <>
    //   {diaryEntry ? (
    //     <div className="flex flex-col rounded bg-white p-4 py-8 pl-8 shadow hover:bg-default-400">
    //       <button
    //         onClick={handleDeleteDiary}
    //         className="mr-2 flex items-center justify-end"
    //       >
    //         <ButtonExit />
    //       </button>
    //       <h3 className="mb-2 text-lg font-bold">{diaryEntry.title}</h3>
    //       <p className="mb-8">{diaryEntry.content}</p>
    //       <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
    //         <span className="mr-2">
    //           <WeatherIcons
    //             weatherId={weatherId}
    //             className="h-4 w-4 fill-current text-black"
    //           />
    //         </span>
    //         <h4 className="flex justify-end text-xs font-medium text-default-800">
    //           {weather || "날씨 정보를 가져오는 중입니다."}
    //         </h4>
    //       </section>
    //     </div>
    //   ) : (
    //     <>
    //       <Button
    //         className="flex flex-col px-8 py-28 text-base text-default-800"
    //         variant="plain"
    //         color="primary"
    //         onClick={() => setOpen(true)}
    //       >
    //         <CirclePlus />
    //         당신의 소중한 이야기를 기록해주세요:)
    //       </Button>
    //       <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
    //         <span className="mr-2">
    //           <WeatherIcons
    //             weatherId={weatherId}
    //             className="h-4 w-4 fill-current text-black"
    //           />{" "}
    //         </span>
    //         <h4 className="flex justify-end text-xs font-medium text-default-800">
    //           {weather || "날씨 정보를 가져오는 중입니다."}
    //         </h4>
    //       </section>
    //     </>
    //   )}
    //   <Transition in={open} timeout={400}>
    //     {(state: string) => (
    //       <Modal
    //         keepMounted
    //         open={!["exited", "exiting"].includes(state)}
    //         onClose={() => setOpen(false)}
    //         slotProps={{
    //           backdrop: {
    //             sx: {
    //               opacity: 0,
    //               backdropFilter: "none",
    //               transition: `opacity 400ms, backdrop-filter 400ms`,
    //               ...{
    //                 entering: { opacity: 1, backdropFilter: "blur(8px)" },
    //                 entered: { opacity: 1, backdropFilter: "blur(8px)" },
    //               }[state],
    //             },
    //           },
    //         }}
    //         sx={{
    //           visibility: state === "exited" ? "hidden" : "visible",
    //         }}
    //       >
    //         <ModalDialog // 여기서부터는 모달창 안에 들어가는 컴포넌트
    //           className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-100"
    //           sx={{
    //             opacity: 0,
    //             transition: `opacity 300ms`,
    //             ...{
    //               entering: { opacity: 1 },
    //               entered: { opacity: 1 },
    //             }[state],
    //           }}
    //         >
    //           <DialogTitle className="text-sm">제목</DialogTitle>
    //           <DialogContent>
    //             <Input
    //               className="flex border-2 border-default-300 bg-default-200 text-center"
    //               variant="soft"
    //               value={title}
    //               placeholder="최대 25자 내외로 작성해주세요."
    //               // onChange={(e) => setTitle(e.target.value)} // 제목 입력 처리
    //               onChange={handleTitleChange}
    //               sx={{ minHeight: "40px", justifyItems: "center" }}
    //             />
    //           </DialogContent>
    //           <DialogTitle className="text-sm">내용</DialogTitle>
    //           <DialogContent>
    //             <Textarea
    //               className="flex justify-center border-2 border-default-300 bg-default-200"
    //               variant="soft"
    //               value={content}
    //               onChange={(e) => setContent(e.target.value)} // 내용 입력 처리
    //               sx={{ minHeight: "200px" }}
    //             />
    //           </DialogContent>
    //           <section className="flex justify-center gap-8 px-4 py-2">
    //             <Button
    //               className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
    //               onClick={() => setOpen(false)}
    //             >
    //               취소
    //             </Button>
    //             <Button
    //               className="flex bg-default-800 px-5 text-default-100"
    //               onClick={handleComplete}
    //             >
    //               작성 완료
    //             </Button>
    //           </section>
    //         </ModalDialog>
    //       </Modal>
    //     )}
    //   </Transition>
    // </>
  );
}
