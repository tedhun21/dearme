import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async ({ queryKey }: any) => {
  const [_key, { access_token }] = queryKey;
  if (access_token) {
    const {
      data: { data },
    } = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return { data };
  }
};

export const getMyTodosWithDate = async ({ queryKey }: any) => {
  const [_key, { date, access_token }] = queryKey;

  if (access_token && date) {
    const {
      data: { data },
    } = await axios.get(`${API_URL}/todos?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return { data };
  }
};

export const updateUserPhoto = async ({
  userId,
  selectedFile,
  access_token,
}: {
  userId: number;
  selectedFile: File;
  access_token: string | null | undefined;
}) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({}));
  formData.append("photo", selectedFile);

  try {
    const { data } = await axios.put(`${API_URL}/users/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  } catch (e) {
    window.alert(e);
  }
};

export const getMyGoals = async ({ queryKey }: any) => {
  const [_key, { date, access_token }] = queryKey;

  const {
    data: { data },
  } = await axios.get(`${API_URL}/goals?date=${date}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return { data };
};

export const getMyPostsWithPage = async ({ pageParam, access_token }: any) => {
  const { data, status } = await axios.get(
    `${API_URL}/posts?friend=false&page=${pageParam}&size=12`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return { data: data.results };
};

// Read _ post
export const getPostWithPage = async ({ tab, pageParam }: any) => {
  try {
    let url = `${API_URL}/posts?page=${pageParam}&size=6`;

    if (tab === "all") {
      url += "&public=true";
    } else if (tab === "friends") {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MTQ1MDQwLCJleHAiOjE3MDg3MzcwNDB9.z9OHjlF2fhwJMm-bTaYd_EcTc_0wWYABrOSRx8L7_N0";
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MTQ4ODAxLCJleHAiOjE3MDg3NDA4MDF9.9EdkDllEionOaPz4ac2nsMw0nd7Yx-uoHcF058p0OJY";
  const headers = { Authorization: `Bearer ${token}` };

  // TODO 쿼리 userId
  return await axios.get(`${API_URL}/goals?userId=2`, { headers });
};

// TODO goalId로 변경
export const createPost = async (data: any): Promise<any> => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MTQ4ODAxLCJleHAiOjE3MDg3NDA4MDF9.9EdkDllEionOaPz4ac2nsMw0nd7Yx-uoHcF058p0OJY";
  const headers = { Authorization: `Bearer ${token}` };

  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      goal: data.selectedGoal,
      body: data.postText,
      isPublic: !data.isPrivate,
      commentSettings: data.selectedOption,
    }),
  );

  if (data.imageFile) {
    formData.append("file", data.imageFile);
  }
  formData.append("file", data.imageFile);

  return await axios.post(`${API_URL}/posts`, formData, { headers });
};

// Update _ post
export const updatePost = async ({
  postId,
  selectedGoal,
  isPrivate,
  postText,
  selectedOption,
}: {
  postId: number;
  selectedGoal: any;
  isPrivate: boolean;
  postText: string;
  selectedOption: string;
}): Promise<any> => {
  console.log("isPrivate:", isPrivate);
  console.log("!isPrivate:", !isPrivate);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MDU4OTU1LCJleHAiOjE3MDg2NTA5NTV9.G-enZ8N2k05kFT36rGd-AFer9BFB9jEgFPOPP0oI7uM";
  const headers = { Authorization: `Bearer ${token}` };

  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      goal: selectedGoal,
      body: postText,
      isPublic: !isPrivate,
      commentSettings: selectedOption,
    }),
  );

  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, formData, {
      headers,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Delete _ post
export const deletePost = async (postId: number) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MTQ4ODAxLCJleHAiOjE3MDg3NDA4MDF9.9EdkDllEionOaPz4ac2nsMw0nd7Yx-uoHcF058p0OJY";
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
