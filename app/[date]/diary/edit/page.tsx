"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { set, useForm } from "react-hook-form";
import { Transition } from "react-transition-group";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Box } from "@mui/joy";

import Exit from "@/public/diary/Exit";
import HappyEmoji from "@/public/diary/HappyEmoji";
import JoyfulEmoji from "@/public/diary/JoyfulEmoji";
import NeutralEmoji from "@/public/diary/NeutralEmoji";
import SadEmoji from "@/public/diary/SadEmoji";
import UnhappyEmoji from "@/public/diary/UnhappyEmoji";
import Tags from "@/public/diary/Tags";
import Companions from "@/public/diary/Companions";
import ButtonExit from "@/public/diary/ButtonExit";
import WeatherIcons from "@/app/ui/diary/WeatherIcons";
import CirclePlus from "@/public/diary/CirclePlus";
import PhotoIcon from "@/public/diary/PhotoIcon";
import DearmeLogo from "@/public/login/DearmeLogo";
import BlackPlus from "@/public/diary/BlackPlus";
import AddPhoto from "@/public/diary/AddPhoto";

import { getCookie } from "@/util/tokenCookie";
import { getDiaryDate } from "@/util/date";
import { getDiaryForDay, updateDiary } from "@/store/api";

export default function Edit() {
  const params = useParams<any>();
  const methods = useForm();
  const { register, setValue, watch, reset, handleSubmit } = methods;

  // 통신된 데이터 기본값 정의
  const { isSuccess, data: fetchedDiaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date: params.date }),
  });

  useEffect(() => {
    if (isSuccess) {
      const { setValue } = methods;
      setValue("title", fetchedDiaryData.title ?? "");
      setValue("content", fetchedDiaryData.body ?? "");
      setValue("mood", fetchedDiaryData.mood ?? "");
      setValue("feelings", fetchedDiaryData.feelings ?? []);
      setValue("companions", fetchedDiaryData.companions ?? []);
      setValue("weather", fetchedDiaryData.weather ?? "");
      setValue("weatherId", fetchedDiaryData.weatherId ?? "");
      setValue("photo", fetchedDiaryData.photos ?? []);
      setValue("todayPick.title", fetchedDiaryData.todayPickTitle ?? "");
      setValue(
        "todayPick.contributors",
        fetchedDiaryData.todayPickContributors ?? [],
      );
      setValue("todayPick.date", fetchedDiaryData.todayPickDate ?? "");
      setValue("todayPick.id", fetchedDiaryData.todayPickId ?? "");
      setValue("todayPick.imageFile", fetchedDiaryData.todayPickImage ?? null);
      console.log("기본값 정의한 값들:", fetchedDiaryData);
    }
  }, [isSuccess, fetchedDiaryData, methods]);

  /* 최상단 날짜 표시 */
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (params.date) {
      const newFormat = getDiaryDate(params.date);
      setFormattedDate(newFormat);
    }
  }, [params.date]);

  /* 기분(Mood) Part */
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const watchedMood = watch("mood");

  useEffect(() => {
    register("mood");
    setValue("mood", selectedMood);
  }, [selectedMood, register, setValue]);

  const handleMoodClick = (mood: string) => {
    const newMood = mood === watchedMood ? null : mood;
    setValue("mood", newMood);
    setSelectedMood(newMood);
  };

  /* 감정태그(Emotion Tags) Part */
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const watchedFeelings = watch("feelings", []);

  const tags = [
    "#상쾌한",
    "#피곤한",
    "#행복한",
    "#의욕적인",
    "#짜증나는",
    "#외로운",
    "#신나는",
    "#뿌듯한",
    "#불안한",
    "#우울한",
    "#설레는",
    "#편안한",
    "#화남",
    "#슬픈",
    "#기대되는",
    "#부담되는",
  ];

  useEffect(() => {
    register("feelings");
    if (isSuccess && fetchedDiaryData) {
      const initialTags =
        typeof fetchedDiaryData.feelings === "string"
          ? fetchedDiaryData.feelings
              .split(" ")
              .filter((tag: any) => tag.trim().startsWith("#"))
          : [];

      setValue("feelings", initialTags.join(" "));
      setSelectedTags(initialTags);
    }
  }, [register, setValue, isSuccess, fetchedDiaryData]);

  const handleTagClick = (tag: string) => {
    const currentTags = watchedFeelings
      .split(" ")
      .filter((tag: any) => tag.trim().startsWith("#"));
    const isTagSelected = currentTags.includes(tag);

    const newTags = isTagSelected
      ? currentTags.filter((t: any) => t !== tag)
      : [...currentTags, tag];

    setValue("feelings", newTags.join(" "));
  };

  /* 함께한 사람(Companions) Part */
  const companions = ["가족", "친구", "연인", "지인", "안만남"];
  const selectedCompanions = watch("companions");

  interface CompanionMappings {
    [key: string]: string;
  }

  // 서버에서 받은 값을 클라이언트용으로 변환하는 함수
  const mapCompanionToClientValue = (companionServerValue: string): string => {
    const mapping: CompanionMappings = {
      FAMILY: "가족",
      FRIEND: "친구",
      LOVER: "연인",
      ACQUAINTANCE: "지인",
      ALONE: "안만남",
    };
    return mapping[companionServerValue] || companionServerValue;
  };

  // 클라이언트에서 선택한 값을 서버용으로 변환하는 함수
  const mapCompanionToServerValue = (companion: string): string => {
    const mapping: CompanionMappings = {
      가족: "FAMILY",
      친구: "FRIEND",
      연인: "LOVER",
      지인: "ACQUAINTANCE",
      안만남: "ALONE",
    };
    return mapping[companion] || companion;
  };

  const handleCompanionClick = (companion: string) => {
    const companionServerValue = mapCompanionToServerValue(companion);
    const newValue =
      selectedCompanions === companionServerValue ? "" : companionServerValue;
    setValue("companions", newValue);
  };

  useEffect(() => {
    if (isSuccess && fetchedDiaryData) {
      methods.setValue("companions", fetchedDiaryData.companions ?? []);
    }
  }, [isSuccess, fetchedDiaryData, methods]);

  /* 일기 작성 Part */
  const [open, setOpen] = useState(false);
  const [originalDiaryData, setOriginalDiaryData] = useState({});

  const updatedDiaryData = {
    title: watch("title") as string,
    content: watch("content") as string,
    weather: watch("weather") as string | undefined,
    weatherId: watch("weatherId") as string | undefined,
  };

  const handleLimitTitle = (e: any) => {
    const input = e.target.value;
    if (input.length <= 25) {
      setValue("title", input);
    }
  };

  const openModal = () => {
    setOriginalDiaryData(updatedDiaryData);
    setOpen(true);
  };

  const handleCancel = () => {
    Object.keys(originalDiaryData).forEach((key) => {
      setValue(key, originalDiaryData[key]);
    });
    setOpen(false);
  };

  /* 사진 업로드 Part */
  const selectedFiles = watch("photos");

  useEffect(() => {
    if (isSuccess) {
      const photosUrl = fetchedDiaryData.photos.map((photo: any) => ({
        url: `${process.env.NEXT_PUBLIC_BUCKET_URL}${photo.url}`,
        id: photo.id,
      }));
      setValue("photos", photosUrl);
    }
  }, [isSuccess, fetchedDiaryData, setValue]);

  const handleFileChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const newPhotos = files
      .map((file) => {
        if (file instanceof Blob) {
          return {
            url: URL.createObjectURL(file),
            file,
          };
        } else {
          return null;
        }
      })
      .filter((photo) => photo !== null);

    setValue("photos", [...watch("photos"), ...newPhotos]);
  };

  const handleDeletePhoto = (photoId: number) => {
    const updatedPhotos = watch("photos").filter(
      (photo: any) => photo.id !== photoId,
    );
    setValue("photos", updatedPhotos);
  };

  /* 오늘의 PICK Part */
  type UploadTodayPickProps = {
    id: number;
    title: string;
    date: string;
    contributors: string;
    image: string | null;
  };
  const picksData = watch("todayPick.id");
  const [pickOpen, setPickOpen] = useState(false);
  const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});
  const [newPick, setNewPick] = useState<UploadTodayPickProps>({
    id: Date.now(),
    title: "",
    date: "",
    contributors: "",
    image: null,
  });

  useEffect(() => {
    if (methods.watch("todayPick.id") && isSuccess) {
      const updatedPick = {
        id: fetchedDiaryData.todayPickId,
        title: fetchedDiaryData.todayPickTitle,
        date: fetchedDiaryData.todayPickDate,
        contributors: fetchedDiaryData.todayPickContributors,
        imageFile:
          fetchedDiaryData.todayPickImage &&
          fetchedDiaryData.todayPickImage.length > 0
            ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${fetchedDiaryData.todayPickImage[0].url}`
            : null,
      };

      setValue("todayPick", updatedPick);
    }
  }, [isSuccess, fetchedDiaryData, setValue, methods]);

  const handleOpen = () => setPickOpen(true);
  const handleClose = () => setPickOpen(false);

  // 마우스가 이미지 위로 이동했을 때 호출될 핸들러입니다.
  const handleMouseEnter = (id: number) => {
    setHovered((prev) => ({ ...prev, [id]: true }));
  };
  // 마우스가 이미지에서 벗어났을 때 호출될 핸들러입니다.
  const handleMouseLeave = (id: number) => {
    setHovered((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPick((prev) => ({ ...prev, image: imageUrl }));
      setPickOpen(true);
      console.log("Image URL: ", imageUrl);
    }
  };

  const removeImage = () => {
    setNewPick((prev) => ({ ...prev, image: null }));
  };

  // 생성된 Pick을 삭제
  const handleRemove = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (watch("todayPick.id") === id) {
      setValue("todayPick", {});
      setValue("todayPick.title", "");
      setValue("todayPick.contributors", []);
      setValue("todayPick.date", "");
      setValue("todayPick.id", "");
      setValue("todayPick.imageFile", null);
    }
  };

  // input 글자 수 제한
  const handleLimitString = (
    name: keyof UploadTodayPickProps,
    value: string,
  ) => {
    if (value.length <= 30) {
      setNewPick({ ...newPick, [name]: value });
    }
  };

  // const handleComplete = () => {
  //   const completedPick = {
  //     ...newPick,
  //     imageFile: newPick.image, // File 객체를 저장
  //   };
  //   setValue("todayPick", [...todayPick, completedPick]);
  //   setNewPick({
  //     id: Date.now(),
  //     title: "",
  //     date: "",
  //     contributors: "",
  //     image: null,
  //   });
  //   setValue("todayPickModalOpen", false);
  // };
  const handleComplete = () => {
    setValue("todayPick", newPick.title);
    setValue("todayPick.contributors", newPick.contributors);
    setValue("todayPick.date", newPick.date);
    setValue("todayPick.id", newPick.id);

    setNewPick({
      id: Date.now(),
      title: "",
      date: "",
      contributors: "",
      image: null,
    });

    setPickOpen(false);
  };

  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {/* 최상단 날짜 표시 */}
        <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
          {formattedDate}
          <div>
            <Exit />
          </div>
        </section>

        {/* 기분 항목 */}
        <section className="flex flex-col gap-4 bg-default-200">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            기분
          </h2>
          <div className="transition duration-300 ease-in-out group-hover:bg-blue-500">
            <span className="flex items-center justify-between px-20">
              <JoyfulEmoji
                selected={watchedMood === "JOYFUL"}
                onClick={() => handleMoodClick("JOYFUL")}
              />
              <HappyEmoji
                selected={watchedMood === "HAPPY"}
                onClick={() => handleMoodClick("HAPPY")}
              />
              <NeutralEmoji
                selected={watchedMood === "NEUTRAL"}
                onClick={() => handleMoodClick("NEUTRAL")}
              />
              <UnhappyEmoji
                selected={watchedMood === "UNHAPPY"}
                onClick={() => handleMoodClick("UNHAPPY")}
              />
              <SadEmoji
                selected={watchedMood === "SAD"}
                onClick={() => handleMoodClick("SAD")}
              />
            </span>
          </div>
          <h3 className="flex justify-center text-sm font-medium text-gray-400">
            오늘 하루는 어땠나요?
          </h3>
        </section>

        {/* 감정 태그 항목 */}
        <section className="flex flex-col bg-default-200">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            감정태그
          </h2>
          <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
            {tags.map((tag) => (
              <Tags
                key={tag}
                text={tag}
                selected={watchedFeelings.includes(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </span>
        </section>

        {/* 함께한 사람 항목 */}
        <section className="flex flex-col bg-default-300">
          <h2 className="ml-8 flex pt-4 text-lg font-medium text-gray-400">
            함께한 사람
          </h2>
          <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
            {companions.map((companion) => (
              <Companions
                key={companion}
                text={companion}
                selected={
                  mapCompanionToClientValue(selectedCompanions) === companion
                }
                onClick={() => handleCompanionClick(companion)}
              />
            ))}
          </span>
        </section>

        {/* 일기 작성 항목 */}
        <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
          {updatedDiaryData ? (
            <div className="flex flex-col rounded bg-white p-4 py-8 pl-8 shadow hover:bg-default-400">
              <button
                onClick={openModal}
                className="mr-2 flex items-center justify-end"
              >
                <ButtonExit />
              </button>
              <h3 className="mb-2 text-lg font-bold">{watch("title")}</h3>
              <p className="mb-8">{watch("content")}</p>
              <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
                <span className="mr-2">
                  <WeatherIcons weatherId={watch("weatherId")} />
                </span>
                <h4 className="flex justify-end text-xs font-medium text-default-800">
                  {watch("weather") || "날씨 정보를 가져오는 중입니다."}
                </h4>
              </section>
            </div>
          ) : (
            <>
              <Button
                className="flex flex-col px-8 py-28 text-base text-default-800"
                variant="plain"
                color="primary"
                onClick={() => setOpen(true)}
              >
                <CirclePlus />
                {`당신의 소중한 이야기를 기록해주세요:)`}
              </Button>
              <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
                <span className="mr-2">
                  <WeatherIcons weatherId={watch("weatherId")} />
                </span>
                <h4 className="flex justify-end text-xs font-medium text-default-800">
                  {watch("weather") || "날씨 정보를 가져오는 중입니다."}
                </h4>
              </section>
            </>
          )}
          {/* 모달창 */}
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
                      id="title"
                      {...register("title")}
                      placeholder="최대 25자 내외로 작성해주세요."
                      onChange={handleLimitTitle}
                      sx={{ minHeight: "40px", justifyItems: "center" }}
                    />
                  </DialogContent>
                  <DialogTitle className="text-sm">내용</DialogTitle>
                  <DialogContent>
                    <Textarea
                      className="flex justify-center border-2 border-default-300 bg-default-200"
                      variant="soft"
                      id="content"
                      {...register("content")}
                      sx={{ minHeight: "200px" }}
                    />
                  </DialogContent>
                  <section className="flex justify-center gap-8 px-4 py-2">
                    <Button
                      className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
                      onClick={handleCancel}
                    >
                      취소
                    </Button>
                    <Button
                      className="flex bg-default-800 px-5 text-default-100"
                      onClick={() => setOpen(false)}
                    >
                      작성 완료
                    </Button>
                  </section>
                </ModalDialog>
              </Modal>
            )}
          </Transition>
        </section>

        {/* 사진 업로드 항목 */}
        <section className="flex flex-col bg-default-400">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
            오늘의 사진
          </h2>
          <div className="mb-8 mt-2 flex justify-center gap-2 px-6">
            {selectedFiles?.length > 0 ? (
              <div className="flex w-full flex-wrap justify-center gap-2">
                {selectedFiles.map((file: any, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={file?.url ? file.url : URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="h-32 w-32 rounded-md object-cover"
                    />
                    <button
                      onClick={() => handleDeletePhoto(file.id)}
                      className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
                      style={{ cursor: "pointer" }}
                    >
                      &times; {/* 이 부분은 삭제 아이콘을 나타냅니다. */}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <label className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <span className="mb-2 flex justify-center">
                  <PhotoIcon />
                </span>
                사진을 등록해주세요
                <h3 className="text-xs font-medium text-gray-400">
                  (최대 3장)
                </h3>
              </label>
            )}
          </div>
        </section>

        {/* 오늘의 PICK 항목 */}
        <section className="flex flex-col bg-default-800">
          <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
            오늘의 PICK
          </h2>
          <div className="overflow-x-auto">
            {/* 데이터가 있는경우 */}
            {watch("todayPick.id") ? (
              <div className="flex flex-row items-start">
                <article key={watch("todayPick.id")} className="flex flex-col">
                  <section
                    className="relative flex max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px]"
                    onMouseEnter={() => handleMouseEnter(watch("todayPick.id"))}
                    onMouseLeave={() => handleMouseLeave(watch("todayPick.id"))}
                  >
                    {watch("todayPick.imageFile") ? (
                      <img
                        src={watch("todayPick.imageFile")}
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
                        visibility: hovered[watch("todayPick.id")]
                          ? "visible"
                          : "hidden",
                        opacity: hovered[watch("todayPick.id")] ? 1 : 0,
                        transform: "translateY(-50%)",
                        transition: "visibility 0.3s, opacity 0.3s ease",
                      }}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                      ) => handleRemove(watch("todayPick.id"), event)}
                    >
                      Remove
                    </Button>
                    {/* <span
                      onClick={handleOpen}
                      style={{ cursor: "pointer" }}
                      className="ml-16 mt-24 flex justify-end"
                    >
                      <CirclePlus />
                    </span> */}
                  </section>
                  <section className="mb-6 ml-8 mt-[-16px] flex flex-col">
                    <h3 className="text-base text-default-100">
                      {watch("todayPick.title")}
                    </h3>
                    <p className="text-xs text-default-100">
                      {watch("todayPick.date")}
                    </p>
                    <p className="text-xs text-default-100">
                      {watch("todayPick.contributors")}
                    </p>
                  </section>
                </article>
              </div>
            ) : (
              /* 데이터가 없는경우 */
              <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
                <button
                  onClick={handleOpen}
                  className="w-full rounded-lg border-2 border-dashed border-black bg-default-800 py-24 text-base font-medium text-gray-400 hover:bg-gray-300"
                >
                  <span className="mb-2 flex justify-center">
                    <BlackPlus />
                  </span>
                  오늘의 문화생활을
                  <h3 className="flex justify-center text-base font-medium text-gray-400">
                    기록해봐요!
                  </h3>
                </button>
              </span>
            )}
          </div>
          <Modal keepMounted open={pickOpen} onClose={handleClose}>
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
                  border: newPick.image ? "none" : "1px dashed #EBE3D5", // 이미지가 있으면 border 없앰
                  backgroundColor: newPick.image ? "transparent" : "", // 이미지가 있으면 배경색 투명 처리
                  position: "relative",
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  height: 280,
                  overflow: "hidden", // 이미지가 넘치는 경우 잘라줌.
                  "&:hover .remove-image-button": {
                    // 호버링 시 특정 클래스를 가진 요소의 스타일을 변경
                    display: "flex", // 버튼을 flex로 표시합니다.
                  },
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="raised-button-file"
                  style={{ cursor: "pointer" }}
                >
                  {newPick.image ? (
                    <img
                      src={newPick.image}
                      alt="UploadImage"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <AddPhoto />
                  )}
                </label>
                {newPick.image && (
                  <Button
                    sx={{
                      position: "absolute", // 버튼을 이미지 위에 절대 위치
                      top: "50%", // 상단에서 50%의 위치
                      left: "50%", // 좌측에서 50%의 위치
                      transform: "translate(-50%, -50%)", // 정확히 중앙에 오도록 조정
                      bgcolor: "rgba(76, 92, 242, 0.7)", // 버튼 배경을 약간 투명하게 설정
                      display: "none", // 기본적으로 버튼을 숨김
                      "&:hover": {
                        // bgcolor: "rgba(13, 31, 188, 0.7)", // 호버링 시 더 불투명하게 설정
                        display: "block",
                      },
                    }}
                    onClick={removeImage}
                  >
                    Remove Image
                  </Button>
                )}
              </Box>
              <DialogContent>
                <Input
                  className="mb-4"
                  fullWidth
                  placeholder="Title (30 characters or less)"
                  value={newPick.title || ""}
                  onChange={(e) => handleLimitString("title", e.target.value)}
                />
                <Input
                  className="mb-4"
                  fullWidth
                  placeholder="date (30 characters or less)"
                  value={newPick.date || ""}
                  onChange={(e) => handleLimitString("date", e.target.value)}
                />
                <Input
                  className="mb-1"
                  fullWidth
                  placeholder="Contributors (Production Company, Cast, Author, etc)"
                  value={newPick.contributors || ""}
                  onChange={(e) =>
                    handleLimitString("contributors", e.target.value)
                  }
                />
              </DialogContent>
              <Button
                className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
                onClick={() => handleClose()}
              >
                취소
              </Button>
              <Button
                className="flex bg-default-800 px-5 text-default-100"
                onClick={handleComplete}
              >
                작성 완료
              </Button>
            </ModalDialog>
          </Modal>
        </section>
      </article>
    </main>
  );
}
