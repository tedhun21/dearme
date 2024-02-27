import axios from "axios";
import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const access_token = getCookie("access_token");

// 유저
/// 로그인
export const signIn = async ({ email, password }: any) => {
  const { data } = await axios.post(`${API_URL}/auth/local`, {
    identifier: email,
    password,
  });

  return data;
};

/// 내 정보 가져오기
export const getMe = async () => {
  if (access_token !== null) {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return {};
  }
};

// 내 정보 수정하기 (사진 제외)
export const updateMe = async ({ userId, updateData }: any) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(updateData));

  const data = await axios.put(`${API_URL}/users/${userId}`, formData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return data;
};

/// 유저 정보 가져오기
export const getUser = async ({ profileId }: any) => {
  const { data } = await axios.get(`${API_URL}/users/${profileId}`);

  return data;
};

/// 유저 사진만 수정
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

/// 유저 백그라운드 사진만 수정
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

// todo
export const getMyTodosWithDate = async ({ date }: any) => {
  if (access_token !== null) {
    const { data } = await axios.get(`${API_URL}/todos?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  } else {
    return [];
  }
};

export const getUserTodosWithDate = async ({ date }: any) => {
  const { data } = await axios.get(`${API_URL}/todos/${date}`);

  return data;
};

export const createMyTodo = async ({ createData }: any) => {
  const { data } = await axios.post(`${API_URL}/todos`, createData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};

export const updateMyTodo = async ({ todoId, updateData }: any) => {
  const { data } = await axios.put(`${API_URL}/todos/${todoId}`, updateData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};

/// todo 우선순위 업데이트
export const updateMyTodoPriority = async ({
  date,
  source,
  destination,
}: any) => {
  const { data } = await axios.put(
    `${API_URL}/todos/${date}/updatePriority`,
    { data: { source, destination } },
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return data;
};

export const updateMyTodoDone = async ({ todoId, done }: any) => {
  const { data } = await axios.put(
    `${API_URL}/todos/${todoId}`,
    { done },
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  return data;
};

export const deleteMyTodo = async ({ todoId }: any) => {
  const data = await axios.delete(`${API_URL}/todos/${todoId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};

export const getMyGoals = async ({ date }: any) => {
  if (access_token !== null) {
    const { data } = await axios.get(`${API_URL}/goals?date=${date}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return {};
  }
};

export const createMyGoal = async (createData: any) => {
  if (access_token) {
    const { data } = await axios.post(`${API_URL}/goals`, createData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return {};
  }
};

export const updateMyGoal = async ({ updateData, goalId }: any) => {
  const { data } = await axios.put(`${API_URL}/goals/${goalId}`, updateData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};

export const getDiariesForMonth = async ({ date }: any) => {
  if (access_token) {
    const { data } = await axios.get(`${API_URL}/diaries?date=${date}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return [];
  }
};

// Redad _ Diary(특정 날짜)
export const getDiaryForDay = async (date: any) => {
  if (access_token) {
    const response = await axios.get(`${API_URL}/diaries?date=${date}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(response.data);
    return response.data;
  }
};

// Read _ Remember
export const getRemembersForMonth = async (month: any) => {
  try {
    const headers = { Authorization: `Bearer ${access_token}` };
    const response = await axios.get(
      `${API_URL}/diaries?date=2024-${month}&remember=true`,
      { headers },
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteMyGoal = async ({ deleteId }: any) => {
  if (access_token) {
    const { data } = await axios.delete(`${API_URL}/goals/${deleteId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
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

// Create _ post
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

// Read _ comment
export const readCommentsWithPage = async ({ postId, pageParam }: any) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(
      `${API_URL}/comments?page=${pageParam}&size=5&postId=${postId}`,
      { headers },
    );
    return response.data.results;
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
  const headers = { Authorization: `Bearer ${access_token}` };

  if (posts === true) {
    try {
      const response = await axios.get(
        `${API_URL}/search-goals?searchTerm=${goal}&posts=true`,
        { headers },
      );
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
      return response.data.searchedGoals;
    } catch (e) {
      console.error(e);
    }
  }
};

// Search > Read _ post
export const getPost = async (postId: number) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`, { headers });
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};

// Read _ likeship
export const getLikeship = async (postId: number) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/likeship`, {
      headers,
    });
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};

// Update _ friendship
export const updateFriendship = async ({
  friendId,
  status,
}: {
  friendId: number;
  status: null | string;
}) => {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.put(
      `${API_URL}/friendships?friendId=${friendId}&status=${status}`,
      null,
      { headers },
    );
  } catch (e) {
    console.error(e);
  }
};
