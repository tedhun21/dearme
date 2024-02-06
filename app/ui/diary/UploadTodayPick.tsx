import { useState } from "react";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Input from "@mui/joy/Input";

import BlackPlus from "@/public/diary/BlackPlus";

type UploadTodayPickProps = {
  title: string;
  date: string;
  contributors: string;
};

export default function UploadTodayPick({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState<UploadTodayPickProps>({
    title: "",
    date: "",
    contributors: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComplete = () => {
    onsubmit(entry);
    setOpen(false);
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
        <ModalDialog>
          <DialogTitle id="modal-title">
            Add Today's Cultural Activity
          </DialogTitle>
          <DialogContent>
            <Input
              className="mb-4"
              fullWidth
              placeholder="Title (25 characters or less)"
              value={entry.title}
              onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            />
            <Input
              className="mb-4"
              fullWidth
              placeholder="date (25 characters or less)"
              value={entry.date}
              onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            />
            <Input
              fullWidth
              placeholder="Contributors (Production Company, Cast, Author, etc)"
              value={entry.contributors}
              onChange={(e) =>
                setEntry({ ...entry, contributors: e.target.value })
              }
            />
          </DialogContent>
          <div className="flex justify-end gap-4 p-4">
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleComplete}>Done</button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
}
