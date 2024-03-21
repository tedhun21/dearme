import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChangeEvent, useRef, useState } from "react";
import ShareIcon from "@/public/me/ShareIcon";
import BackGroundIcon from "@/public/me/BackGroundIcon";
import EditIcon from "@/public/me/EditIcon";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage, updateBackGroundPhoto } from "@/store/api";

export default function MeProfileHeaderMeatball({ me, route }: any) {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const BackGroundfileInput = useRef(null);

  // 유저 백그라운드 사진 바꾸기
  const { mutate: updateBackGroundMutate } = useMutation({
    mutationKey: ["updateBackGroundPhoto"],
    mutationFn: updateBackGroundPhoto,
    onSuccess: ({ data }: any) => {
      window.alert(data.message);
      setAnchorEl(null);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 백그라운드 이미지 삭제
  const { mutate: deleteBackGroundMutate } = useMutation({
    mutationKey: ["deleteBackGroundImage"],
    mutationFn: deleteImage,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["getMe"] });

      const prevMe = queryClient.getQueryData(["getMe"]);

      queryClient.setQueryData(["getMe"], (old: any) => ({
        ...old,
        background: null,
      }));

      return { prevMe };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getMe"], context?.prevMe);
    },
  });

  // 백그라운드 사진 바꾸면서 업데이트 통신을 같이
  const handleUserBackGroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      if (me) {
        // setBackGroundPhoto(selectedFile);

        // 유저 백그라운드 사진 업데이트
        updateBackGroundMutate({ userId: me.id, selectedFile });
      }
    }
  };

  // 백그라운드 이미지 삭제 핸들러
  const handleBackGroundDelete = () => {
    deleteBackGroundMutate(me.background.id);
  };

  return (
    <div className="rounded-full bg-default-200 bg-opacity-50">
      <IconButton onClick={handleClick}>
        <MoreHorizIcon sx={{ opacity: 1, color: "#143422" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          opacity: "0.6",
          "& .MuiMenu-paper": {
            backgroundColor: "#F5F3EB",
            boxShadow: "none",
          },
        }}
      >
        <div className="flex flex-col items-end gap-4 p-2 pr-1">
          {/* share 버튼 */}
          <button className="group flex items-center gap-2">
            <span className="font-semibold text-default-800 group-hover:text-black group-active:text-default-900">
              Share
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-300 shadow-xl group-hover:bg-default-400 group-active:bg-default-600">
              <ShareIcon className="h-5 w-5" />
            </div>
          </button>
          {/* edit  버튼 */}
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
          {/* background 버튼 */}
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
          {/* background 삭제 버튼 */}
          {me?.background?.url ? (
            <button onClick={() => handleBackGroundDelete()}>
              <span className="font-semibold text-default-800 hover:text-black active:text-default-900">
                Background Delete
              </span>
            </button>
          ) : null}
        </div>
      </Menu>
    </div>
  );
}
