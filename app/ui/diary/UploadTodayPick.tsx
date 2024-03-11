import { useEffect, useState } from "react";

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

type UploadTodayPickProps = {
  id: number;
  title: string;
  date: string;
  contributors: string;
  image: string | null;
};

export default function UploadTodayPick({
  updatedTodayPick,
  onSubmit,
}: {
  onSubmit: (data: UploadTodayPickProps) => void;
  updatedTodayPick: any;
}) {
  const [open, setOpen] = useState(false);
  const [picks, setPicks] = useState<UploadTodayPickProps[]>([]);
  const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newPick, setNewPick] = useState<UploadTodayPickProps>({
    id: Date.now(),
    title: "",
    date: "",
    contributors: "",
    image: null,
  });

  /* 업데이트된 TodayPick이 있을경우 picks 상태 업데이트 */
  useEffect(() => {
    if (updatedTodayPick) {
      const imageUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}${updatedTodayPick.imageFile?.[0]?.url}`;

      const updatedPick = {
        id: updatedTodayPick.id,
        title: updatedTodayPick.title,
        date: updatedTodayPick.date,
        contributors: updatedTodayPick.contributors,
        image: imageUrl,
      };
      setPicks([updatedPick]);
    }
  }, [updatedTodayPick]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const image = URL.createObjectURL(file);
      setNewPick((prev) => ({ ...prev, image: image }));
      console.log(image);
    }
  };

  const removeImage = () => {
    setNewPick((prev) => ({ ...prev, image: null }));
  };

  const handleComplete = () => {
    const completedPick = {
      ...newPick,
      // image: imageFile ? URL.createObjectURL(imageFile) : null,
      imageFile: imageFile, // File 객체를 저장
    };

    onSubmit(completedPick);

    // 상위 컴포넌트에서 처리할 수 있도록 picks 상태 업데이트
    setPicks((prevPicks) => [...prevPicks, completedPick]);

    setNewPick({
      id: Date.now(),
      title: "",
      date: "",
      contributors: "",
      image: null,
    });
    setOpen(false);
  };

  // 생성된 Pick을 삭제
  const handleRemove = (id: number) => {
    setPicks(picks.filter((pick) => pick.id !== id));
  };

  // input 글자 수 제한
  const handleChange = (name: keyof UploadTodayPickProps, value: string) => {
    if (value.length <= 30) {
      setNewPick({ ...newPick, [name]: value });
    }
  };

  // 마우스가 이미지 위로 이동했을 때 호출될 핸들러입니다.
  const handleMouseEnter = (id: number) => {
    setHovered((prev) => ({ ...prev, [id]: true }));
  };

  // 마우스가 이미지에서 벗어났을 때 호출될 핸들러입니다.
  const handleMouseLeave = (id: number) => {
    setHovered((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <div className="overflow-x-auto">
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
      </div>
      {picks.length === 0 && (
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
      <Modal keepMounted open={open} onClose={handleClose}>
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
            <label htmlFor="raised-button-file" style={{ cursor: "pointer" }}>
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
              value={newPick.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              className="mb-4"
              fullWidth
              placeholder="date (30 characters or less)"
              value={newPick.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
            <Input
              className="mb-1"
              fullWidth
              placeholder="Contributors (Production Company, Cast, Author, etc)"
              value={newPick.contributors}
              onChange={(e) => handleChange("contributors", e.target.value)}
            />
          </DialogContent>
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
        </ModalDialog>
      </Modal>
    </>
  );
}
