"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Transition } from "react-transition-group";

import Exit from "@/public/diary/Exit";

import { getDiaryDate } from "@/util/date";
import { getDiaryForDay } from "@/store/api";

import ChooseMood from "@/app/ui/diary/ChooseMood";
import ChooseEmotionTags from "@/app/ui/diary/ChooseEmotionTags";
import ChooseCompanions from "@/app/ui/diary/ChooseCompanions";
import DiaryModal from "@/app/ui/diary/DiaryModal";
import UploadPhoto from "@/app/ui/diary/UploadPhoto";
import UploadTodayPick from "@/app/ui/diary/UploadTodayPick";
import { Button, CircularProgress } from "@mui/material";

export default function Edit() {
  const { date } = useParams<any>();
  const [formattedDate, setFormattedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isSuccess, data: diaryData } = useQuery({
    queryKey: ["getDiaryForDay"],
    queryFn: () => getDiaryForDay({ date }),
  });

  const { register, getValues, setValue, watch, reset, handleSubmit } =
    useForm();

  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState<string | null>(
    null,
  );

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [picks, setPicks] = useState([]);
  const [selectedPicks, setSelectedPicks] = useState([]);

  useEffect(() => {
    if (date) {
      setFormattedDate(getDiaryDate(date));
    }
  }, [date]);

  useEffect(() => {
    if (isSuccess && diaryData) {
      setSelectedMood(diaryData.mood);
      setSelectedTags(diaryData.feelings.split(" "));
      setSelectedCompanions(diaryData.companions);
      setPreviewUrls(diaryData.photos ?? []);
      setPicks(diaryData.today_picks);

      setValue("mood", diaryData.mood);
      setValue("feelings", diaryData.feelings);
      setValue("companions", diaryData.companions);
      setValue("title", diaryData.title);
      setValue("body", diaryData.body);
      setValue("weatherId", diaryData.weatherId);
      setValue("weather", diaryData.weather);
    }
  }, [isSuccess, diaryData]);

  // console.log(diaryData);

  // console.log(watch());
  return (
    <main className="flex min-h-screen justify-center">
      <article className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <form className="flex h-full flex-col justify-between">
          <div>
            <section className="flex items-center justify-between bg-default-100 px-8 py-4 text-center text-xl font-medium text-gray-400">
              {formattedDate}
              <div>
                <Exit />
              </div>
            </section>

            <section className="flex flex-col gap-4 bg-default-200">
              <h2 className="flex px-8 py-4 text-lg font-medium text-gray-400">
                Mood
              </h2>
              <ChooseMood
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                onMoodSelect={(mood: any) => setValue("mood", mood)}
              />
              <h3 className="flex justify-center text-sm font-medium text-gray-400">
                How are you today?
              </h3>
            </section>

            <section className="flex flex-col bg-default-200">
              <h2 className="flex px-8 py-4 text-lg font-medium text-gray-400">
                Feelings
              </h2>
              <ChooseEmotionTags
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onTagSelect={(tags: any) => setValue("feelings", tags)}
              />
            </section>

            <section className="flex flex-col bg-default-300 px-8 py-4">
              <h2 className="flex text-lg font-medium text-gray-400">With</h2>
              <ChooseCompanions
                selectedCompanions={selectedCompanions}
                setSelectedCompanions={setSelectedCompanions}
                onSelectCompanion={(companions: any) =>
                  setValue("companions", companions)
                }
              />
            </section>

            <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
              <DiaryModal
                type="edit"
                getValues={getValues}
                setValue={setValue}
              />
            </section>

            <section className="flex flex-col bg-default-400 px-5 py-4">
              <h2 className="flex  text-lg font-medium text-gray-400">
                Today&#39;s PICTURE
              </h2>
              <UploadPhoto
                selectedPhotos={selectedPhotos}
                setSelectedPhotos={setSelectedPhotos}
                previewUrls={previewUrls}
                setPreviewUrls={setPreviewUrls}
              />
            </section>

            <section className="flex flex-col gap-2 bg-default-800 px-5 pb-8 pt-4">
              <h2 className="flex text-lg font-medium text-default-100">
                Today&#39;s PICK
              </h2>
              <UploadTodayPick
                picks={picks}
                setPicks={setPicks}
                selectedPicks={selectedPicks}
                setSelectedPicks={setSelectedPicks}
                getValues={getValues}
                setValue={setValue}
              />
            </section>
          </div>
          <section className="m-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-3xl border-2 border-default-800 px-32 py-2 text-sm font-semibold text-default-800 hover:bg-default-300 active:bg-default-800 active:text-white"
            >
              {isLoading ? <CircularProgress /> : <span>Create Diary</span>}
            </button>
          </section>
        </form>
      </article>
    </main>
  );
}

// {/* 사진 업로드 항목 */}
// <section className="flex flex-col bg-default-400">
// <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-gray-400">
//   오늘의 사진
// </h2>
// <div className="mb-8 mt-2 flex justify-center gap-2 px-6">
//   {selectedFiles?.length > 0 ? (
//     <div className="flex w-full flex-wrap justify-center gap-2">
//       {selectedFiles.map((file: any, index: number) => (
//         <div key={index} className="relative">
//           <img
//             src={file?.url ? file.url : URL.createObjectURL(file)}
//             alt={`Preview ${index}`}
//             className="h-32 w-32 rounded-md object-cover"
//           />
//           <button
//             onClick={() => handleDeletePhoto(file.id)}
//             className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
//             style={{ cursor: "pointer" }}
//           >
//             &times; {/* 이 부분은 삭제 아이콘을 나타냅니다. */}
//           </button>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <label className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
//       <input
//         type="file"
//         multiple
//         accept="image/jpeg, image/png"
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />
//       <span className="mb-2 flex justify-center">
//         <PhotoIcon />
//       </span>
//       사진을 등록해주세요
//       <h3 className="text-xs font-medium text-gray-400">
//         (최대 3장)
//       </h3>
//     </label>
//   )}
// </div>
// </section>

// {/* 오늘의 PICK 항목 */}
// <section className="flex flex-col bg-default-800">
// <h2 className="mb-2 ml-8 flex pt-4 text-lg font-medium text-default-100">
//   오늘의 PICK
// </h2>
// <div className="overflow-x-auto">
//   {/* 데이터가 있는경우 */}
//   {watch("todayPick.id") ? (
//     <div className="flex flex-row items-start">
//       <article key={watch("todayPick.id")} className="flex flex-col">
//         <section
//           className="relative flex max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px]"
//           onMouseEnter={() => handleMouseEnter(watch("todayPick.id"))}
//           onMouseLeave={() => handleMouseLeave(watch("todayPick.id"))}
//         >
//           {watch("todayPick.imageFile") ? (
//             <img
//               src={watch("todayPick.imageFile")}
//               alt="Uploaded"
//               className="ml-8 flex h-44 w-44 object-cover"
//             />
//           ) : (
//             <div className="ml-8 flex h-44 w-44 flex-col items-center justify-center bg-default-600">
//               <DearmeLogo />
//             </div>
//           )}
//           <Button
//             sx={{
//               position: "absolute",
//               top: "50%",
//               right: "20%",
//               visibility: hovered[watch("todayPick.id")]
//                 ? "visible"
//                 : "hidden",
//               opacity: hovered[watch("todayPick.id")] ? 1 : 0,
//               transform: "translateY(-50%)",
//               transition: "visibility 0.3s, opacity 0.3s ease",
//             }}
//             onClick={(
//               event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//             ) => handleRemove(watch("todayPick.id"), event)}
//           >
//             Remove
//           </Button>
//           {/* <span
//             onClick={handleOpen}
//             style={{ cursor: "pointer" }}
//             className="ml-16 mt-24 flex justify-end"
//           >
//             <CirclePlus />
//           </span> */}
//         </section>
//         <section className="mb-6 ml-8 mt-[-16px] flex flex-col">
//           <h3 className="text-base text-default-100">
//             {watch("todayPick.title")}
//           </h3>
//           <p className="text-xs text-default-100">
//             {watch("todayPick.date")}
//           </p>
//           <p className="text-xs text-default-100">
//             {watch("todayPick.contributors")}
//           </p>
//         </section>
//       </article>
//     </div>
//   ) : (
//     /* 데이터가 없는경우 */
//     <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
//       <button
//         onClick={handleOpen}
//         className="w-full rounded-lg border-2 border-dashed border-black bg-default-800 py-24 text-base font-medium text-gray-400 hover:bg-gray-300"
//       >
//         <span className="mb-2 flex justify-center">
//           <BlackPlus />
//         </span>
//         오늘의 문화생활을
//         <h3 className="flex justify-center text-base font-medium text-gray-400">
//           기록해봐요!
//         </h3>
//       </button>
//     </span>
//   )}
// </div>
// <Modal keepMounted open={pickOpen} onClose={handleClose}>
//   <ModalDialog
//     sx={{
//       width: "400px",
//       maxWidth: "400px",
//       bgcolor: "background.paper",
//       borderRadius: 10,
//       boxShadow: 24,
//       p: 4,
//     }}
//   >
//     <DialogTitle id="modal-title" sx={{ justifyContent: "center" }}>
//       {`Add Today's Cultural Activity`}
//     </DialogTitle>
//     <Box
//       sx={{
//         border: newPick.image ? "none" : "1px dashed #EBE3D5", // 이미지가 있으면 border 없앰
//         backgroundColor: newPick.image ? "transparent" : "", // 이미지가 있으면 배경색 투명 처리
//         position: "relative",
//         padding: 2,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         height: 280,
//         overflow: "hidden", // 이미지가 넘치는 경우 잘라줌.
//         "&:hover .remove-image-button": {
//           // 호버링 시 특정 클래스를 가진 요소의 스타일을 변경
//           display: "flex", // 버튼을 flex로 표시합니다.
//         },
//       }}
//     >
//       <input
//         accept="image/*"
//         style={{ display: "none" }}
//         id="raised-button-file"
//         multiple
//         type="file"
//         onChange={handleImageChange}
//       />
//       <label
//         htmlFor="raised-button-file"
//         style={{ cursor: "pointer" }}
//       >
//         {newPick.image ? (
//           <img
//             src={newPick.image}
//             alt="UploadImage"
//             style={{
//               maxWidth: "100%",
//               maxHeight: "100%",
//               objectFit: "contain",
//             }}
//           />
//         ) : (
//           <AddPhoto />
//         )}
//       </label>
//       {newPick.image && (
//         <Button
//           sx={{
//             position: "absolute", // 버튼을 이미지 위에 절대 위치
//             top: "50%", // 상단에서 50%의 위치
//             left: "50%", // 좌측에서 50%의 위치
//             transform: "translate(-50%, -50%)", // 정확히 중앙에 오도록 조정
//             bgcolor: "rgba(76, 92, 242, 0.7)", // 버튼 배경을 약간 투명하게 설정
//             display: "none", // 기본적으로 버튼을 숨김
//             "&:hover": {
//               // bgcolor: "rgba(13, 31, 188, 0.7)", // 호버링 시 더 불투명하게 설정
//               display: "block",
//             },
//           }}
//           onClick={removeImage}
//         >
//           Remove Image
//         </Button>
//       )}
//     </Box>
//     <DialogContent>
//       <Input
//         className="mb-4"
//         fullWidth
//         placeholder="Title (30 characters or less)"
//         value={newPick.title || ""}
//         onChange={(e) => handleLimitString("title", e.target.value)}
//       />
//       <Input
//         className="mb-4"
//         fullWidth
//         placeholder="date (30 characters or less)"
//         value={newPick.date || ""}
//         onChange={(e) => handleLimitString("date", e.target.value)}
//       />
//       <Input
//         className="mb-1"
//         fullWidth
//         placeholder="Contributors (Production Company, Cast, Author, etc)"
//         value={newPick.contributors || ""}
//         onChange={(e) =>
//           handleLimitString("contributors", e.target.value)
//         }
//       />
//     </DialogContent>
//     <Button
//       className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
//       onClick={() => handleClose()}
//     >
//       취소
//     </Button>
//     <Button
//       className="flex bg-default-800 px-5 text-default-100"
//       onClick={handleComplete}
//     >
//       작성 완료
//     </Button>
//   </ModalDialog>
// </Modal>
// </section>

//  {/* 일기 작성 항목 */}
//  <section className="relative my-4 flex flex-col rounded bg-default-100 shadow-xl hover:bg-gray-300">
//  {updatedDiaryData ? (
//    <div className="flex flex-col rounded bg-white p-4 py-8 pl-8 shadow hover:bg-default-400">
//      <button
//        onClick={openModal}
//        className="mr-2 flex items-center justify-end"
//      >
//        <ButtonExit />
//      </button>
//      <h3 className="mb-2 text-lg font-bold">{watch("title")}</h3>
//      <p className="mb-8">{watch("content")}</p>
//      <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
//        <span className="mr-2">
//          <WeatherIcons weatherId={watch("weatherId")} />
//        </span>
//        <h4 className="flex justify-end text-xs font-medium text-default-800">
//          {watch("weather") || "날씨 정보를 가져오는 중입니다."}
//        </h4>
//      </section>
//    </div>
//  ) : (
//    <>
//      <Button
//        className="flex flex-col px-8 py-28 text-base text-default-800"
//        variant="plain"
//        color="primary"
//        onClick={() => setOpen(true)}
//      >
//        <CirclePlus />
//        {`당신의 소중한 이야기를 기록해주세요:)`}
//      </Button>
//      <section className="absolute bottom-2 right-4 mb-4 mr-4 flex items-center">
//        <span className="mr-2">
//          <WeatherIcons weatherId={watch("weatherId")} />
//        </span>
//        <h4 className="flex justify-end text-xs font-medium text-default-800">
//          {watch("weather") || "날씨 정보를 가져오는 중입니다."}
//        </h4>
//      </section>
//    </>
//  )}
//  {/* 모달창 */}
//  <Transition in={open} timeout={400}>
//    {(state: string) => (
//      <Modal
//        keepMounted
//        open={!["exited", "exiting"].includes(state)}
//        onClose={() => setOpen(false)}
//        slotProps={{
//          backdrop: {
//            sx: {
//              opacity: 0,
//              backdropFilter: "none",
//              transition: `opacity 400ms, backdrop-filter 400ms`,
//              ...{
//                entering: { opacity: 1, backdropFilter: "blur(8px)" },
//                entered: { opacity: 1, backdropFilter: "blur(8px)" },
//              }[state],
//            },
//          },
//        }}
//        sx={{
//          visibility: state === "exited" ? "hidden" : "visible",
//        }}
//      >
//        <ModalDialog // 여기서부터는 모달창 안에 들어가는 컴포넌트
//          className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-100"
//          sx={{
//            opacity: 0,
//            transition: `opacity 300ms`,
//            ...{
//              entering: { opacity: 1 },
//              entered: { opacity: 1 },
//            }[state],
//          }}
//        >
//          <DialogTitle className="text-sm">제목</DialogTitle>
//          <DialogContent>
//            <Input
//              className="flex border-2 border-default-300 bg-default-200 text-center"
//              variant="soft"
//              id="title"
//              {...register("title")}
//              placeholder="최대 25자 내외로 작성해주세요."
//              onChange={handleLimitTitle}
//              sx={{ minHeight: "40px", justifyItems: "center" }}
//            />
//          </DialogContent>
//          <DialogTitle className="text-sm">내용</DialogTitle>
//          <DialogContent>
//            <Textarea
//              className="flex justify-center border-2 border-default-300 bg-default-200"
//              variant="soft"
//              id="content"
//              {...register("content")}
//              sx={{ minHeight: "200px" }}
//            />
//          </DialogContent>
//          <section className="flex justify-center gap-8 px-4 py-2">
//            <Button
//              className="flex border-2 border-default-200 bg-default-300 px-8 text-default-800 hover:bg-default-400"
//              onClick={handleCancel}
//            >
//              취소
//            </Button>
//            <Button
//              className="flex bg-default-800 px-5 text-default-100"
//              onClick={() => setOpen(false)}
//            >
//              작성 완료
//            </Button>
//          </section>
//        </ModalDialog>
//      </Modal>
//    )}
//  </Transition>
// </section>
