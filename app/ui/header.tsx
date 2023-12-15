import NotificationIcon from "@/public/header/NotificationIcon";
import SettingIcon from "@/public/header/SettingIcon";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full flex-row justify-between p-5">
      <Link href="/">
        <Image
          src="/header/logo.png"
          width={77}
          height={20}
          alt="logo"
          quality={80}
          priority
        />
      </Link>
      <div className="flex flex-row gap-2 p-1">
        <NotificationIcon className="h-4 w-4" />
        <SettingIcon className="h-4 w-4" />
      </div>
    </header>
  );
}
