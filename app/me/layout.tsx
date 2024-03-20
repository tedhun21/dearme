"use client";

import { cookies } from "next/headers";
import axios from "axios";

import Footer from "../ui/footer";
import MeNav from "../ui/me/MeNav";
import MeProfile from "../ui/me/profile/me/MeProfile";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/store/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버 사이드 렌더링
  // const cookieStore = cookies();
  // const cookie = cookieStore.get("access_token");

  // if (!cookie) {
  //   return <a href="/">Go to Home</a>;
  // }

  // const { value: access_token } = cookie || {};

  // const { data: meData } = await axios.get(`${API_URL}/users/me`, {
  //   headers: { Authorization: `Bearer ${access_token}` },
  // });

  const { data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
  });

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <MeProfile me={meData} />
        <MeNav />
        {children}
        <Footer me={meData} />
      </div>
    </main>
  );
}
