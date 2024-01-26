import React from "react";
import Image from "next/image";
import Link from "next/link";
import UploadPostImg from "./UploadPostImg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import MenuItem from "@mui/material/MenuItem";
import Close from "@/public/social/Close";

interface PostFormProps {
  isOpen: boolean;
  onClose: () => void;
  goals: any[]; // Goal[]
  handleGoalChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  handlePrivacyToggle: () => void;
  handleImageFileChange: (file: File) => void;
  formattedDate: string;
  postText: string;
  handlePostTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGoal: string;
  isPrivate: boolean;
  imageFile: File | null;
  selectedOption: string;
  handleOptionChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  buttonLabel: string;
  handleAction: () => void;
}

// interface Goal {
//   id: number;
//   body: string;
// }

// 사용
{
  /* <PostForm
isOpen={open}
onClose={handleClose}
goals={goals}
handleGoalChange={handleGoalChange}
handlePrivacyToggle={handlePrivacyToggle}
handleImageFileChange={handleImageFileChange}
formattedDate={formattedDate}
postText={postText}
handlePostTextChange={handlePostTextChange}
selectedGoal={selectedGoal}
isPrivate={isPrivate}
imageFile={imageFile}
selectedOption={selectedOption}
handleOptionChange={handleOptionChange}
buttonLabel="Post"
handleAction={handlePost}
/> */
}

const PostForm: React.FC<PostFormProps> = ({
  isOpen,
  onClose,
  goals,
  handleGoalChange,
  handlePrivacyToggle,
  handleImageFileChange,
  formattedDate,
  postText,
  handlePostTextChange,
  selectedGoal,
  isPrivate,
  imageFile,
  selectedOption,
  handleOptionChange,
  buttonLabel,
  handleAction,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#F5F3EB",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <Link href="/">
              <Image
                src="/header/logo.png"
                width={77}
                height={20}
                alt="logo"
                quality={80}
                priority
              />
            </Link>
            <button className="border-none" onClick={onClose}>
              <Close className="h-3 w-3 cursor-pointer fill-current text-default-600" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-base font-semibold text-default-500">In</div>
              <Select
                sx={{
                  marginLeft: 1,
                  "&.MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    width: "160px",
                    height: "25px",
                    fontSize: "14px",
                    color: "black",
                    "& fieldset": {
                      borderColor: "#DED0B6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#DED0B6",
                    },
                  },
                }}
                IconComponent={({ ...rest }) => (
                  <MoreHorizIcon
                    {...rest}
                    sx={{ color: "#2D2422", marginLeft: 1, fontSize: "medium" }}
                  />
                )}
                value={selectedGoal as string}
                onChange={(e) =>
                  handleGoalChange(e as React.ChangeEvent<{ value: unknown }>)
                }
              >
                {Array.isArray(goals) &&
                  goals.map((goal) => (
                    <MenuItem
                      key={goal.id}
                      sx={{ fontSize: "14px" }}
                      value={goal.id}
                    >
                      {`# ${goal.body}`}
                    </MenuItem>
                  ))}
              </Select>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-default-700">
                Private
              </span>
              <Switch
                sx={{
                  marginLeft: 1,
                  padding: 0,
                  width: "32px",
                  height: "20px",
                  "& .MuiSwitch-switchBase": {
                    padding: 0,
                    margin: "2px",
                    transitionDuration: "300ms",
                    "&.Mui-checked": {
                      transform: "translateX(12px)",
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#143422",
                        opacity: 1,
                        border: 0,
                      },
                      "&.Mui-disabled + .MuiSwitch-track": {
                        opacity: 0.5,
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    boxSizing: "border-box",
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    backgroundColor: "#b6b6c0",
                    opacity: 1,
                  },
                }}
                onChange={handlePrivacyToggle}
              />
            </div>
          </div>

          <UploadPostImg setImageFile={handleImageFileChange} />

          <div className="my-2 flex items-center">
            <span className="text-sm font-medium text-default-700">
              {formattedDate}
            </span>
            <ArrowDropDownRoundedIcon sx={{ color: "#EDA323" }} />
          </div>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Please write a caption."
            sx={{
              backgroundColor: "#F5F3EB",
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                py: "4px",
                px: "8px",
                "& fieldset": {
                  borderColor: "#EBE3D5",
                },
                "&:hover fieldset": {
                  borderColor: "#EBE3D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#EBE3D5",
                },
              },
              marginBottom: 3,
            }}
            value={postText}
            onChange={handlePostTextChange}
          />

          <div className="mb-4 flex items-center">
            <span className="mr-2 text-sm font-medium text-default-700">
              Comments
            </span>
            <Select
              sx={{
                marginLeft: 1,
                "&.MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  width: "100px",
                  height: "25px",
                  fontSize: "14px",
                  color: "black",
                  "& fieldset": {
                    borderColor: "#DED0B6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#DED0B6",
                  },
                },
              }}
              IconComponent={({ ...rest }) => (
                <ArrowDropDownRoundedIcon {...rest} sx={{ fill: "#EDA323" }} />
              )}
              value={selectedOption as string}
              onChange={(e) =>
                handleOptionChange(e as React.ChangeEvent<{ value: unknown }>)
              }
            >
              <MenuItem sx={{ fontSize: "14px" }} value="PUBLIC">
                All
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="FRIENDS">
                Friends
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="OFF">
                Turn off
              </MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="w-20 rounded bg-default-800 p-1 text-sm font-medium text-white"
              onClick={handleAction}
            >
              {buttonLabel}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostForm;
