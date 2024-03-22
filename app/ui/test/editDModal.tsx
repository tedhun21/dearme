import { Modal } from "@mui/material";

export default function EditDModal({
  register,
  editModalOpen,
  setEditModalOpen,
}: any) {
  return (
    <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
      <div>
        <div>
          <label>Title</label>
          <input {...register("title")} />
        </div>
        <div>
          <label>Content</label>
          <input {...register("content")} />
        </div>
      </div>
    </Modal>
  );
}
