import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChangeEvent, useRef, useState } from "react";
import ShareIcon from "@/public/me/ShareIcon";
import BackGroundIcon from "@/public/me/BackGroundIcon";
import EditIcon from "@/public/me/EditIcon";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { updateBackGroundPhoto } from "@/store/api";

export default function MeProfileHeaderMeatball({
  me,
  route,
  setBackGroundPhoto,
}: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const BackGroundfileInput = useRef(null);

  // 유저 백그라운드 사진 바꾸기
  const { mutate: updateBackGroundMutate } = useMutation({
    mutationKey: ["updateBackGroundPhoto"],
    mutationFn: ({
      userId,
      selectedFile,
    }: {
      userId: number;
      selectedFile: File;
    }) => updateBackGroundPhoto({ userId, selectedFile }),
    onSuccess: ({ data }: any) => {
      window.alert(data.message);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 백그라운드 사진 바꾸면서 업데이트 통신을 같이
  const handleUserBackGroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me) {
        setBackGroundPhoto(selectedFile);

        // 유저 백그라운드 사진 업데이트
        updateBackGroundMutate({ userId: me.id, selectedFile });
      }
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "#2D2422" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div className="flex flex-col items-end gap-4 pr-1">
          <button className="group flex items-center gap-2">
            <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
              Share
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
              <ShareIcon className="h-5 w-5" />
            </div>
          </button>
          <button
            onClick={() => {
              (BackGroundfileInput.current as any).click();
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
              BackGround
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl hover:drop-shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
              <BackGroundIcon className="h-5 w-5" />
            </div>
          </button>
          <input
            hidden
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={BackGroundfileInput}
            onChange={handleUserBackGroundChange}
          />
          {route !== "edit" && (
            <Link
              href="/me/edit"
              onClick={handleClose}
              className="group flex items-center gap-2"
            >
              <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
                Edit
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl hover:drop-shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
                <EditIcon className="h-5 w-5" />
              </div>
            </Link>
          )}
        </div>
      </Menu>
    </div>
  );
}
