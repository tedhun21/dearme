import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTodos = async () => {
  return await axios.get(`${API_URL}/todos?date=2024-01-02`);
};
