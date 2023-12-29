import { useState } from "react";

import TextField from "@mui/material/TextField";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";

export default function SleepRecord() {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sleepTime, setSleepTime] = useState(null);
  const [wakeTime, setWakeTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    handleClose(); // TimePicker를 닫습니다.
  };

  return (
    <>
      <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
        <button
          className="w-full rounded-lg bg-default-100 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300"
          onClick={handleOpen}
        >
          수면을 기록해주세요
        </button>
      </span>
      {open && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            value={selectedTime}
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    </>
  );
}
