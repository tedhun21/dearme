import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTodosWithDate = async ({ queryKey }: any) => {
  const [_key, { date, isMe }] = queryKey;

  if (isMe && date) {
    return await axios.get(`${API_URL}/todos?date=${date}`, {
      headers: {
        Authorization: `Bearer 
    ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1ODQzNjg5LCJleHAiOjE3MDg0MzU2ODl9.gP6Dr1P5e6iWtWWMVOfMjDCZD4jC6KZEGFmXEwi9ldY"}`,
      },
    });
  }
  return await axios.get(`${API_URL}/todos?date=${date}`);
};
