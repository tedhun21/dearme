"use client";

import { usePathname } from "next/navigation";
import Footer from "../ui/footer";
import MeNav from "../ui/me/MeNav";
import UserProfile from "../ui/me/UserProfile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        {pathname !== "/me/friends" && pathname !== "/me/edit" ? (
          <UserProfile />
        ) : pathname === "/me/edit" ? (
          <UserProfile route={"edit"} />
        ) : null}
        {pathname !== "/me/friends" && pathname !== "/me/edit" && <MeNav />}
        {children}
        <Footer />
      </div>
    </main>
  );
}
