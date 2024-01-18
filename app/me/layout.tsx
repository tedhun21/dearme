import Footer from "../ui/footer";
import MeNav from "../ui/me/MeNav";
import UserProfile from "../ui/me/UserProfile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <UserProfile />
        <MeNav />
        {children}
        <Footer />
      </div>
    </main>
  );
}
