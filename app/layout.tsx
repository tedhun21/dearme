import type { Metadata } from "next";

import "./globals.css";

import RecoilRootProvider from "./recoilRootProvider";
import ReactQueryProvider from "./reactQueryProvider";

export const metadata: Metadata = {
  title: "Dearme",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRootProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
