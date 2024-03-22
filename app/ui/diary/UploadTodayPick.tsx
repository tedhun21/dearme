import { ChangeEvent, useEffect, useRef, useState } from "react";

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
import { deleteImage } from "@/store/api";
import { useMutation } from "@tanstack/react-query";

export default function UploadTodayPick({
  picks,
  setPicks,
  selectedPicks,
  setSelectedPicks,
}: any) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pickTitle, setPickTitle] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [pickContributors, setPickContributors] = useState("");
  const [pickImage, setPickImage] = useState<File | null>(null);

  // const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (e: any) => {
    e.stopPropagation();
    setPickImage(null);
  };

  const handleCancel = () => {
    setPickTitle("");
    setPickDate("");
    setPickContributors("");

    setOpen(false);
  };

  const handleComplete = () => {
    setSelectedPicks((prev: any) => [
      ...prev,
      {
        title: pickTitle,
        date: pickDate,
        contributors: pickContributors,
        image: pickImage,
      },
    ]);
    setPickTitle("");
    setPickDate("");
    setPickContributors("");
    setPickImage(null);

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

  const handlePickImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      setPickImage(selectedFile);
    }
  };

  return (
    <section>
      {(picks?.length ?? 0) > 0 || (selectedPicks?.length ?? 0) > 0 ? (
        <div className="flex w-full items-center gap-4 overflow-x-auto p-3">
          {picks?.map((pick: any) => (
            <PickCard
              key={pick.id}
              type="url"
              pick={pick}
              setPicks={setPicks}
            />
          ))}
          {selectedPicks?.map((selectedPick: any, index: number) => (
            <PickCard
              key={index}
              type="blob"
              pick={selectedPick}
              setSelectedPicks={setSelectedPicks}
            />
          ))}
          <button
            type="button"
            className="group m-10"
            onClick={() => setOpen(true)}
          >
            <CirclePlus className="h-10 w-10 fill-current text-white group-hover:text-default-900" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-2 px-6">
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
        </div>
      )}
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            width: "400px",
            maxWidth: "400px",
            borderRadius: 10,
            boxShadow: 24,
            p: 4,
          }}
        >
          <span className="text-center text-lg font-semibold">
            Add Today&#39;s Cultural Activity
          </span>
          <div className="h-[280px] w-full bg-default-100">
            {!pickImage ? (
              <button
                onClick={openFileInput}
                className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-default-300 hover:bg-default-300"
              >
                <AddPhoto />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePickImageChange}
                  hidden
                />
              </button>
            ) : pickImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={URL.createObjectURL(pickImage)}
                  alt="pick Image"
                  fill
                  className="object-contain"
                />
                <button
                  onClick={(e) => handleRemoveImage(e)}
                  className="absolute right-[-8px] top-[-8px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <span>&times;</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <input
              value={pickTitle}
              onChange={(e) => setPickTitle(e.target.value)}
              placeholder="Title (30 characters or less)"
              className="rounded-md border-2 border-default-300 px-3 py-1 outline-none hover:border-default-400 hover:bg-default-100 focus:border-default-900 focus:bg-default-200"
            />
            <input
              value={pickDate}
              onChange={(e) => setPickDate(e.target.value)}
              placeholder="Date (YYYY-MM-DD)"
              className="rounded-md border-2 border-default-300 px-3 py-1 outline-none hover:border-default-400 hover:bg-default-100 focus:border-default-900 focus:bg-default-200"
            />
            <input
              value={pickContributors}
              onChange={(e) => setPickContributors(e.target.value)}
              placeholder="Contributors (Production Company, Cast, Author, etc)"
              className="rounded-md border-2 border-default-300 px-3 py-1 outline-none hover:border-default-400 hover:bg-default-100 focus:border-default-900 focus:bg-default-200"
            />
          </div>
          <button
            type="button"
            onClick={() => handleCancel()}
            className="rounded-md bg-default-300 px-3 py-1.5 text-default-800 hover:bg-default-400 active:bg-default-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleComplete()}
            className="rounded-md bg-default-800 px-3 py-1.5 text-default-100 hover:bg-default-900"
          >
            Submit
          </button>
        </ModalDialog>
      </Modal>
    </section>
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
