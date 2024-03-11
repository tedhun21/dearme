import Footer from "@/app/ui/footer";
import UserInfo from "@/app/ui/me/profile/user/UserInfo";

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Profile() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("access_token");

  if (!cookie) {
    return <a href="/">Go to Home</a>;
  }

  const { value: access_token } = cookie || {};

  const { data: meData } = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <UserInfo me={meData} />
        <Footer me={meData} />
      </div>
    </main>
  );
}
