import axios, { AxiosResponse } from "axios";

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

// Read _ post
export const getPostWithPage = async ({ tab, pageParam }: any) => {
  try {
    console.log(tab);
    let url = `${API_URL}/posts?page=${pageParam}&size=6`;

    if (tab === "all") {
      url += "&public=true";
    } else if (tab === "friends") {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MDEzNDQ0LCJleHAiOjE3MDg2MDU0NDR9.cyrPJ-MpzsVq3P1ln3ybLpxWATngk4UtKwgCd0tb_Hk";
      const headers = { Authorization: `Bearer ${token}` };
      return await axios
        .get(url, { headers })
        .then((response) => response.data.posts);
      console.log(url);
    }

    const response = await axios.get(url);
    return response.data.posts;
    console.log(url);
  } catch (e) {}
};

// Create _ post > 목표 조회
export const getGoals = async ({ queryKey }: any) => {
  // const [_key, { isMe }] = queryKey;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1OTEyODczLCJleHAiOjE3MDg1MDQ4NzN9.ehBXFQE2fcHMy32Ew5ol78cQR6UKvkIcF8gE_-fhakQ";
  const headers = { Authorization: `Bearer ${token}` };

  // if (isMe) {
  //   return await axios.get(`${API_URL}/goals`, { headers });
  // }
  // TODO 쿼리 userId
  return await axios.get(`${API_URL}/goals?userId=1`, { headers });
};

export const createPost = async (data: any): Promise<any> => {
  console.log(data);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1OTEyODczLCJleHAiOjE3MDg1MDQ4NzN9.ehBXFQE2fcHMy32Ew5ol78cQR6UKvkIcF8gE_-fhakQ";
  const headers = { Authorization: `Bearer ${token}` };

  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      goal: data.selectedGoal,
      body: data.postText,
      public: data.isPrivate,
      commentSettings: data.selectedOption,
    }),
  );

  if (data.imageFile) {
    formData.append("file", data.imageFile);
  }
  formData.append("file", data.imageFile);

  return await axios.post(`${API_URL}/posts`, formData, { headers });
};
