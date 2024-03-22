// import { useState } from "react";

// import TextField from "@mui/material/TextField";
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Box from "@mui/material/Box";

// export default function SleepRecord({
//   onSleepTimeChange,
//   onWakeTimeChange,
// }: any) {
//   const [openSleepPicker, setOpenSleepPicker] = useState(false);
//   const [openWakePicker, setOpenWakePicker] = useState(false);
//   const [sleepTime, setSleepTime] = useState(null);
//   const [wakeTime, setWakeTime] = useState(null);

//   const handleSleepTimeChange = (newSleepTime: any) => {
//     setSleepTime(newSleepTime);
//     onSleepTimeChange(newSleepTime); // 외부에서 전달받은 콜백을 호출
//     setOpenSleepPicker(false); // TimePicker를 닫습니다.
//   };

//   const handleWakeTimeChange = (newWakeTime: any) => {
//     setWakeTime(newWakeTime);
//     onWakeTimeChange(newWakeTime); // 외부에서 전달받은 콜백을 호출
//     setOpenWakePicker(false); // TimePicker를 닫습니다.
//   };

//   return (
//     <>
//       <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <MobileTimePicker
//             label="수면 시간"
//             value={sleepTime}
//             onChange={handleSleepTimeChange}
//             onClose={() => setOpenSleepPicker(false)}
//             open={openSleepPicker}
//             onOpen={() => setOpenSleepPicker(true)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//           <MobileTimePicker
//             label="기상 시간"
//             value={wakeTime}
//             onChange={handleWakeTimeChange}
//             onClose={() => setOpenWakePicker(false)}
//             open={openWakePicker}
//             onOpen={() => setOpenWakePicker(true)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </LocalizationProvider>
//       </Box>
//     </>
//   );
// }
