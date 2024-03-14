import { useEffect, useRef, useState } from "react";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";

import BlackPlus from "@/public/diary/BlackPlus";
import AddPhoto from "@/public/diary/AddPhoto";
import CirclePlus from "@/public/diary/CirclePlus";
import DearmeLogo from "@/public/login/DearmeLogo";
import Image from "next/image";
import PickCard from "./PickCard";

type UploadTodayPickProps = {
  id: number;
  title: string;
  date: string;
  contributors: string;
  image: string | null;
};

export default function UploadTodayPick({
  register,
  getValues,
  setValue,
  pickImage,
  setPickImage,
}: any) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [picks, setPicks] = useState<any>([]);

  const [pickTitle, setPickTitle] = useState(getValues().todayPickTitle);
  const [pickDate, setPickDate] = useState(getValues().todayPickDate);
  const [pickContributors, setPickContributors] = useState(
    getValues().todayPickContributors,
  );

  const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPickImage(file);
      if (e.target) {
        // input target value 초기화
        e.target.value = "";
      }
    }
  };

  const handleRemoveImage = (e: any) => {
    e.stopPropagation();
    setPickImage(null);
  };

  const handleCancel = () => {
    setValue("todayPickTitle", "");
    setValue("todayPickDate", "");
    setValue("todayPickContributors", "");

    setPickImage(null);

    setOpen(false);
  };

  const handleComplete = () => {
    setValue("todayPickTitle", pickTitle);
    setValue("todayPickDate", pickDate);
    setValue("todayPickContributors", pickContributors);

    setPicks((prev: any) => [
      ...prev,
      {
        id: prev.length + 1,
        title: pickTitle,
        date: pickDate,
        contributors: pickContributors,
        image: pickImage,
      },
    ]);
    setOpen(false);
  };

  // // 마우스가 이미지 위로 이동했을 때 호출될 핸들러입니다.
  // const handleMouseEnter = (id: number) => {
  //   setHovered((prev) => ({ ...prev, [id]: true }));
  // };

  // // 마우스가 이미지에서 벗어났을 때 호출될 핸들러입니다.
  // const handleMouseLeave = (id: number) => {
  //   setHovered((prev) => ({ ...prev, [id]: false }));
  // };

  const handleDeletePick = (index: number) => {
    console.log(index);
    setPicks((prev: any) => prev.filter((pick: any) => pick.id !== index));

    setValue("todayPickTitle", "");
    setValue("todayPickDate", "");
    setValue("todayPickContributors", "");

    setPickTitle("");
    setPickImage(null);
    setPickDate("");
    setPickContributors("");
  };

  return (
    <>
      {picks.length > 0 ? (
        <div className="flex w-full justify-around">
          {picks.map((pick: any) => (
            <PickCard
              key={pick.id}
              pick={pick}
              handleDeletePick={handleDeletePick}
            />
          ))}
          {/* <button>
            <CirclePlus />
          </button> */}
        </div>
      ) : picks.length === 0 ? (
        <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="flex w-full flex-col items-center rounded-lg border-2 border-dashed border-black bg-default-800 py-24 text-base font-medium text-gray-400 hover:bg-gray-300"
          >
            <span className="mb-2 flex justify-center">
              <BlackPlus />
            </span>
            <span>Cature your</span>
            <span>relaxed cultural adventures of the day.</span>
          </button>
        </span>
      ) : null}
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            width: "400px",
            maxWidth: "400px",
            bgcolor: "background.paper",
            borderRadius: 10,
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogTitle id="modal-title" sx={{ justifyContent: "center" }}>
            {`Add Today's Cultural Activity`}
          </DialogTitle>

          <Box
            sx={{
              border: pickImage ? "none" : "1px dashed #EBE3D5", // 이미지가 있으면 border 없앰
              backgroundColor: pickImage ? "transparent" : "", // 이미지가 있으면 배경색 투명 처리
              // position: "relative",
              // padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 280,
              // overflow: "hidden", // 이미지가 넘치는 경우 잘라줌.
              "&:hover .remove-image-button": {
                // 호버링 시 특정 클래스를 가진 요소의 스타일을 변경
                display: "flex", // 버튼을 flex로 표시합니다.
              },
            }}
            onClick={openFileInput}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
              hidden
            />
            {!pickImage ? (
              <AddPhoto />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={URL.createObjectURL(pickImage)}
                  alt="UploadImage"
                  fill
                  className="object-contain"
                  // style={{
                  //   maxWidth: "100%",
                  //   maxHeight: "100%",
                  //   objectFit: "contain",
                  // }}
                />
                <button
                  onClick={(e) => handleRemoveImage(e)}
                  className="absolute right-[-4px] top-[-4px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            )}
          </Box>
          <DialogContent>
            <Input
              className="mb-4"
              fullWidth
              placeholder="Title (30 characters or less)"
              value={pickTitle}
              onChange={(e) => setPickTitle(e.target.value)}
            />
            <Input
              className="mb-4"
              fullWidth
              placeholder="date (30 characters or less)"
              value={pickDate}
              onChange={(e) => setPickDate(e.target.value)}
            />
            <Input
              className="mb-1"
              fullWidth
              placeholder="Contributors (Production Company, Cast, Author, etc)"
              value={pickContributors}
              onChange={(e) => setPickContributors(e.target.value)}
            />
          </DialogContent>
          <Button
            className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
            onClick={() => handleCancel()}
          >
            취소
          </Button>
          <Button
            className="flex bg-default-800 px-5 text-default-100"
            onClick={() => handleComplete()}
          >
            작성 완료
          </Button>
        </ModalDialog>
      </Modal>
    </>
  );
}

{
  /* <div className="overflow-x-auto">
        <div className="flex flex-row items-start">
          {picks.length > 0 &&
            picks.map((pick, index) => (
              <article key={pick.id} className="flex flex-col">
                <section
                  className="relative flex max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px]"
                  onMouseEnter={() => handleMouseEnter(pick.id)}
                  onMouseLeave={() => handleMouseLeave(pick.id)}
                >
                  {pick.image ? (
                    <img
                      src={pick.image}
                      alt="Uploaded"
                      className="ml-8 flex h-44 w-44 object-cover"
                    />
                  ) : (
                    <div className="ml-8 flex h-44 w-44 flex-col items-center justify-center bg-default-600">
                      <DearmeLogo />
                    </div>
                  )}
                  <Button
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "20%",
                      visibility: hovered[pick.id] ? "visible" : "hidden",
                      opacity: hovered[pick.id] ? 1 : 0,
                      transform: "translateY(-50%)",
                      transition: "visibility 0.3s, opacity 0.3s ease",
                    }}
                    onClick={() => handleRemove(pick.id)}
                  >
                    Remove
                  </Button>
                  {index === picks.length - 1 && (
                    <span
                      onClick={handleOpen}
                      style={{ cursor: "pointer" }}
                      className="ml-16 mt-24 flex justify-end"
                    >
                      <CirclePlus />
                    </span>
                  )}
                </section>
                <section className="mb-6 ml-8 mt-[-16px] flex flex-col">
                  <h3 className="text-base text-default-100">{pick.title}</h3>
                  <p className="text-xs text-default-100">{pick.date}</p>
                  <p className="text-xs text-default-100">
                    {pick.contributors}
                  </p>
                </section>
              </article>
            ))}
        </div>
      </div> */
}
