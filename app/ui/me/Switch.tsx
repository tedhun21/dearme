import { Switch } from "@mui/material";

export default function PillSwitch({ defaultChecked }: any) {
  return (
    <Switch
      defaultChecked={defaultChecked}
      sx={{
        /// switch 기본 박스 크기
        padding: 0,
        width: "32px",
        height: "20px",
        "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: "2px",
          transitionDuration: "300ms",
          /// 체크될때
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
    />
  );
}
