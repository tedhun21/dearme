"use client";

import { usePathname } from "next/navigation";
import Footer from "../ui/footer";
import MeNav from "../ui/me/MeNav";
import MeProfile from "../ui/me/MeProfile";

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
          <MeProfile />
        ) : pathname === "/me/edit" ? (
          <MeProfile route="edit" />
        ) : null}
        {pathname !== "/me/friends" && pathname !== "/me/edit" && <MeNav />}
        {children}
        <Footer />
      </div>
    </main>
  );
}
