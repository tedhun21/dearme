import { cookies } from "next/headers";
import axios from "axios";

import Footer from "../ui/footer";
import MeNav from "../ui/me/MeNav";
import MeProfile from "../ui/me/profile/me/MeProfile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <MeProfile me={meData} />
        <MeNav />
        {children}
        <Footer me={meData} />
      </div>
    </main>
  );
}
