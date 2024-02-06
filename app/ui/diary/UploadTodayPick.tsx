import { useState } from "react";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";

import BlackPlus from "@/public/diary/BlackPlus";
import AddPhoto from "@/public/diary/AddPhoto";

type UploadTodayPickProps = {
  title: string;
  date: string;
  contributors: string;
};

export default function UploadTodayPick({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [entry, setEntry] = useState<UploadTodayPickProps>({
    title: "",
    date: "",
    contributors: "",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => setImage(null);

  const handleComplete = () => {
    if (onSubmit) {
      onSubmit(entry);
    }
    setOpen(false);
  };

  const handleChange = (name: keyof UploadTodayPickProps) => (e: any) => {
    if (e.target.value.length <= 30) {
      setEntry((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  return (
    <>
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

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
              border: image ? "none" : "1px dashed #EBE3D5", // 이미지가 있으면 border 없앰
              backgroundColor: image ? "transparent" : "", // 이미지가 있으면 배경색 투명 처리
              position: "relative",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 320,
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
              {image ? (
                <img
                  src={image}
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
            {image && (
              <Button
                className="remove-image-button"
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
              value={entry.title}
              onChange={handleChange("title")}
            />
            <Input
              className="mb-4"
              fullWidth
              placeholder="date (30 characters or less)"
              value={entry.date}
              onChange={handleChange("date")}
            />
            <Input
              className="mb-1"
              fullWidth
              placeholder="Contributors (Production Company, Cast, Author, etc)"
              value={entry.contributors}
              onChange={handleChange("contributors")}
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
