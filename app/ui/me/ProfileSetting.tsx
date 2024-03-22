import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRef, useState } from "react";

import ShareIcon from "@/public/me/ShareIcon";

import Link from "next/link";
import EditIcon from "@/public/me/EditIcon";
import { usePathname } from "next/navigation";
import BackGroundIcon from "@/public/me/BackGroundIcon";

export default function ProfileSetting() {
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const fileInput = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              (fileInput.current as any).click();
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
            ref={fileInput}
          />
          {pathname !== "/me/edit" && (
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
