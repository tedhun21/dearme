import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";
import axios from "axios";
import { access } from "fs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const access_token = getCookie("access_token");

export const getMe = async () => {
  const { data } = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};

export const getUser = async ({ profileId }: any) => {
  const { data } = await axios.get(`${API_URL}/users/${profileId}`);

  return data;
};

export const getMyTodosWithDate = async ({ date }: any) => {
  if (access_token && date) {
    const { data } = await axios.get(`${API_URL}/todos?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  }
};

export const getUserTodosWithDate = async ({ date }: any) => {
  const { data } = await axios.get(`${API_URL}/todos`);

  return data;
};

export const updateUserPhoto = async ({
  userId,
  selectedFile,
}: {
  userId: number;
  selectedFile: File;
}) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({}));
  formData.append("photo", selectedFile);

  const { data } = await axios.put(`${API_URL}/users/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data;
};
export const updateBackGroundPhoto = async ({
  userId,
  selectedFile,
}: {
  userId: number;
  selectedFile: File;
}) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({}));
  formData.append("background", selectedFile);

  const data = await axios.put(`${API_URL}/users/${userId}`, formData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return data;
};

export const updateMe = async ({ userId, updateData }: any) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(updateData));

  const data = await axios.put(`${API_URL}/users/${userId}`, formData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return data;
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
      const headers = { Authorization: `Bearer ${access_token}` };
      return await axios
        .get(url, { headers })
        .then((response) => response.data.results);
    }
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};

// Create _ post > 목표 조회
export const getGoals = async ({ queryKey }: any) => {
  const date = getToday();
  const headers = { Authorization: `Bearer ${access_token}` };

  return await axios.get(`${API_URL}/goals?date=${date}`, { headers });
};

export const createPost = async (data: any): Promise<any> => {
  const headers = { Authorization: `Bearer ${access_token}` };

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
  const headers = { Authorization: `Bearer ${access_token}` };

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
  const headers = { Authorization: `Bearer ${access_token}` };

  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Put _ like
export const likePost = async (postId: number) => {
  // const access_token = getCookie("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };

  try {
    await axios.put(`${API_URL}/posts/${postId}/like`, {}, { headers });
  } catch (e) {
    console.error(e);
  }
};

// Create _ comment
export const createComment = async ({
  postId,
  comment,
}: {
  postId: number;
  comment: string;
}) => {
  const headers = { Authorization: `Bearer ${access_token}` };

  try {
    await axios.post(
      `${API_URL}/comments?postId=${postId}`,
      { body: comment },
      { headers },
    );
  } catch (e) {
    console.error(e);
  }
};

// Update _ comment
export const updateComment = async ({
  postId,
  commentId,
  comment,
}: {
  postId: number;
  commentId: number | null;
  comment: string;
}) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  console.log(postId, commentId, comment);
  try {
    await axios.put(
      `${API_URL}/comments/${commentId}?postId=${postId}`,
      { body: comment },
      { headers },
    );
  } catch (e) {
    console.error(e);
  }
};

// Delete _ comment
export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: number;
  commentId: number;
}) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    await axios.delete(`${API_URL}/comments/${commentId}?postId=${postId}`, {
      headers,
    });
  } catch (e) {
    console.error(e);
  }
};

// Search _ users
export const getSearchUsers = async (name: string) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(
      `${API_URL}/search-users?searchTerm=${name}`,
      { headers },
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Search _ goals
export const getSearchGoals = async (
  goal: string | string[],
  posts: boolean,
) => {
  console.log("requested");
  console.log(posts);
  const headers = { Authorization: `Bearer ${access_token}` };

  if (posts === true) {
    try {
      const response = await axios.get(
        `${API_URL}/search-goals?searchTerm=${goal}&posts=true`,
        { headers },
      );
      console.log(response);
      return response.data.searchedGoals[0];
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const response = await axios.get(
        `${API_URL}/search-goals?searchTerm=${goal}`,
        { headers },
      );
      console.log(response.data.searchedGoals);
      return response.data.searchedGoals;
    } catch (e) {
      console.error(e);
    }
  }
};
