import { getToday } from "@/util/date";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async ({ queryKey }: any) => {
  const [_key, { access_token }] = queryKey;
  if (access_token) {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

export const getUser = async ({ profileId }: any) => {
  const { data } = await axios.get(`${API_URL}/users/${profileId}`);

  return data;
};

export const getMyTodosWithDate = async ({ queryKey }: any) => {
  const [_key, { date, access_token }] = queryKey;

  if (access_token && date) {
    const {
      data: { results, pagination },
    } = await axios.get(`${API_URL}/todos?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return { results, pagination };
  }
};

export const getUserTodosWithDate = async ({ date }: any) => {
  const { data } = await axios.get(`${API_URL}/todos`);
  console.log(data);
  return data;
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
    data: { goals },
  } = await axios.get(`${API_URL}/goals?date=${date}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return goals;
};

export const getMyPostsWithPage = async ({ pageParam, access_token }: any) => {
  const {
    data: { results, pagination },
  } = await axios.get(
    `${API_URL}/posts?friend=false&page=${pageParam}&size=12`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return { results, pagination };
};

export const getMyRequestsWithPage = async ({
  pageParam,
  access_token,
}: any) => {
  const {
    data: { users, pagination },
  } = await axios.get(
    `${API_URL}/friendships/request?page=${pageParam}&size=5`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return users;
};

export const getMyFriendsWithPageAndSearch = async ({
  pageParam,
  searchParam,
  size,
  access_token,
}: any) => {
  let q = "";
  if (pageParam && size && searchParam) {
    q = `&q=${searchParam}`;
  } else if (!pageParam && !size && searchParam) {
    q = `?q=${searchParam}`;
  }
  const {
    data: { users, pagination },
  } = await axios.get(
    `${API_URL}/friendships/friend?page=${pageParam}&size=${size}${q}`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return { users, pagination };
};

// Read _ post
export const getPostWithPage = async ({ tab, pageParam }: any) => {
  try {
    let url = `${API_URL}/posts?page=${pageParam}&size=6`;

    if (tab === "all") {
      url += "&public=true";
    } else if (tab === "friends") {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MjMxOTYyLCJleHAiOjE3MDg4MjM5NjJ9.zkljmePR93lqAEHFA05QfKvxLXEXLILztviOR_j5Wds";

      const headers = { Authorization: `Bearer ${token}` };
      return await axios
        .get(url, { headers })
        .then((response) => response.data.data.results);
    }

    const response = await axios.get(url);
    return response.data.data.results;
  } catch (e) {}
};

// Create _ post > 목표 조회
export const getGoals = async ({ queryKey }: any) => {
  const date = getToday();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MjMxOTYyLCJleHAiOjE3MDg4MjM5NjJ9.zkljmePR93lqAEHFA05QfKvxLXEXLILztviOR_j5Wds";
  const headers = { Authorization: `Bearer ${token}` };

  return await axios.get(`${API_URL}/goals?date=${date}`, { headers });
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
      goalId: data.selectedGoal,
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

// Create _ like
export const likePost = async (postId: number) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA2MTQ4ODAxLCJleHAiOjE3MDg3NDA4MDF9.9EdkDllEionOaPz4ac2nsMw0nd7Yx-uoHcF058p0OJY";
  const headers = { Authorization: `Bearer ${token}` };

  try {
    await axios.put(`${API_URL}/posts/${postId}/like`, {}, { headers });
  } catch (e) {
    console.error(e);
  }
};
