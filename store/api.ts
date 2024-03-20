import axios from "axios";
import { getToday } from "@/util/date";
import { getCookie } from "@/util/tokenCookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return null;
  }
};

// 내 정보 수정하기 (사진 제외)
export const updateMe = async ({ userId, updateData }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(updateData));

    const data = await axios.put(`${API_URL}/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return data;
  }
};

/// 유저 정보 가져오기
export const getUser = async ({ userId }: any) => {
  if (userId) {
    const { data } = await axios.get(`${API_URL}/users/${userId}`);

    return data;
  }
};

/// 유저 사진만 수정
export const updateUserPhoto = async ({
  userId,
  selectedFile,
}: {
  userId: number;
  selectedFile: File;
}) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({}));
    formData.append("photo", selectedFile);
    const { data } = await axios.put(`${API_URL}/users/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  }
};

/// 유저 백그라운드 사진만 수정
export const updateBackGroundPhoto = async ({
  userId,
  selectedFile,
}: {
  userId: number;
  selectedFile: File;
}) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({}));
    formData.append("background", selectedFile);

    const data = await axios.put(`${API_URL}/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return data;
  }
};

/// 유저 삭제하기
export const deleteMe = async ({ userId }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const data = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return data;
  }
};

// todo
export const getMyTodosWithDate = async ({ date }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
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

export const getUserTodosWithDate = async ({ userId, date }: any) => {
  const { data } = await axios.get(
    `${API_URL}/todos?userId=${userId}&date=${date}`,
  );

  return data;
};

export const createMyTodo = async ({ createData }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.post(`${API_URL}/todos`, createData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

export const updateMyTodo = async ({ todoId, updateData }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(`${API_URL}/todos/${todoId}`, updateData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

/// todo 우선순위 업데이트
export const updateMyTodoPriority = async ({
  date,
  source,
  destination,
}: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/todos/${date}/updatePriority`,
      { data: { source, destination } },
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

export const updateMyTodoDone = async ({ todoId, done }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/todos/${todoId}`,
      { done },
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

export const deleteMyTodo = async ({ todoId }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const data = await axios.delete(`${API_URL}/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

export const getMyGoals = async ({ date }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.get(`${API_URL}/goals?date=${date}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  } else {
    return [];
  }
};

export const getUserGoalsWithDate = async ({ userId, date }: any) => {
  const { data } = await axios.get(
    `${API_URL}/goals?userId=${userId}&date=${date}`,
  );
  return data;
};

export const createMyGoal = async (createData: any) => {
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(`${API_URL}/goals/${goalId}`, updateData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

// preview: /diary/:month 쿼리
export const getDiariesForMonth = async ({
  date,
  preview,
}: {
  date: any;
  preview?: boolean;
}) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const { data } = await axios.get(
      preview
        ? `${API_URL}/diaries?date=${date.slice(0, 7)}&preview=true`
        : `${API_URL}/diaries?date=${date.slice(0, 7)}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    return data;
  }
  return [];
};

export const getDiaryForDay = async ({ date }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.get(`${API_URL}/diaries?date=${date}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

export const createDiary = async ({ date, createData, photos }: any) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const formData = new FormData();

    if (createData) {
      formData.append("data", JSON.stringify(createData));

      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }
      }
    }
    const { data } = await axios.post(
      `${API_URL}/diaries?date=${date}`,
      formData,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

export const createTodayPick = async ({ createData, photos, diaryId }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    if (createData && diaryId) {
      const formData = new FormData();
      const { title, date, contributors } = createData;
      formData.append(
        "data",
        JSON.stringify({ title, date, contributors, diaryId }),
      );
      if (photos) {
        formData.append("photos", photos);
      }
      const { data } = await axios.post(`${API_URL}/today-picks`, formData, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return data;
    }
  }
};

export const updateDiary = async ({ updateData, photos, diaryId }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(updateData));
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
    }

    const { data } = await axios.put(
      `${API_URL}/diaries/${diaryId}`,
      formData,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

export const updateDiaryRemember = async ({ diaryId, remember }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({}));

    const { data } = await axios.put(
      `${API_URL}/diaries/${diaryId}?remember=${remember}`,
      formData,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

export const deleteDiary = async (diaryId: string) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.delete(`${API_URL}/diaries/${diaryId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(data);
    return data;
  } else {
    return [];
  }
};

// Read _ Remember
export const getRemembersForMonth = async (month: any) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const headers = { Authorization: `Bearer ${access_token}` };
    const { data } = await axios.get(
      `${API_URL}/diaries?date=2024-${month}&remember=true`,
      { headers },
    );

    return data;
  } else {
    return [];
  }
};

export const deleteMyGoal = async ({ deleteId }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.delete(`${API_URL}/goals/${deleteId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return data;
  }
};

export const getMyPostsWithPage = async ({ pageParam }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const {
      data: { results },
    } = await axios.get(
      `${API_URL}/posts?friend=false&page=${pageParam}&size=20`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return { results };
  }
};

export const getMyRequestsWithPage = async ({ pageParam }: any) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const {
      data: { users, pagination },
    } = await axios.get(
      `${API_URL}/friendships/request?page=${pageParam}&size=5`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return users;
  }
};

export const getMyFriendsWithPage = async ({ pageParam, size }: any) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const {
      data: { results, pagination },
    } = await axios.get(
      `${API_URL}/friendships/friend?page=${pageParam}&size=${size}`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return results;
  }
};

export const getMyFriendsAndBlock = async ({
  pageParam,
  searchParam,
  size,
}: any) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    let q = "";
    if (searchParam) {
      q = `&q=${searchParam}`;
    }

    const {
      data: { results },
    } = await axios.get(
      `${API_URL}/friendships/friendandblock?page=${pageParam}&size=${size}${q}`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return results;
  }
};

// 유저와 나와의 관계 확인
export const findFriendship = async (userId: string) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.get(
      `${API_URL}/friendships?friendId=${userId}`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

//  팔로우 요청
export const followUser = async (userId: number) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.post(
      `${API_URL}/friendships?friendId=${userId}`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

// 팔로우 취소
export const followCancelFriedship = async (userId: number) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/friendships?friendId=${userId}&status=requestCancel`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

// 팔로우 요청 수락 (pending -> accept)
export const acceptRequest = async (userId: number) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/friendships?friendId=${userId}&status=friend`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

// 친구 블락
export const blockFriend = async (friendId: number) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/friendships?friendId=${friendId}&status=block`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

// 블락 풀기
export const unblockFriend = async (friendId: number) => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const { data } = await axios.put(
      `${API_URL}/friendships?friendId=${friendId}&status=unblock`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    return data;
  }
};

// 이미지 삭제
export const deleteImage = async (id: number) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.delete(`${API_URL}/upload/files/${id}`);
    return data;
  }
};

// today-pick 삭제
export const deleteTodayPick = async (id: number) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    const { data } = await axios.delete(`${API_URL}/today-picks/${id}`);
    return data;
  }
};

// Read _ post
export const getPostWithPage = async ({ tab, pageParam }: any) => {
  try {
    let url = `${API_URL}/posts?page=${pageParam}&size=6`;
    if (tab === "all") {
      url += "&public=true";
      const response = await axios.get(url);
      return response.data.results;
    } else if (tab === "friends") {
      const access_token = getCookie("access_token");
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(url, { headers });
      return response.data.results;
    }
  } catch (e) {
    console.error(e);
  }
};

// Create _ post
export const getGoals = async () => {
  const date = getToday();
  const access_token = getCookie("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };

  return await axios.get(`${API_URL}/goals?date=${date}`, { headers });
};

export const createPost = async (data: any): Promise<any> => {
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`, { headers });
    return response.data.results;
  } catch (e) {
    console.error(e);
  }
};

// Search _ diaries
export const getSearchDiaries = async ({
  search,
  date,
}: {
  search: string;
  date: any;
}) => {
  const access_token = getCookie("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(
      `${API_URL}/search-diaries?searchTerm=${search}&date=${date}`,
      { headers },
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Read _ likeship
export const getLikeship = async (postId: number) => {
  const access_token = getCookie("access_token");
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
  const access_token = getCookie("access_token");
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
